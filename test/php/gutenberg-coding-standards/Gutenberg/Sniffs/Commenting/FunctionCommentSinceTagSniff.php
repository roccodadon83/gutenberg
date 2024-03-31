<?php
/**
 * Gutenberg Coding Standards.
 *
 * @package gutenberg/gutenberg-coding-standards
 * @link    https://github.com/WordPress/gutenberg
 * @license https://opensource.org/licenses/MIT MIT
 */

namespace GutenbergCS\Gutenberg\Sniffs\Commenting;

use PHP_CodeSniffer\Files\File;
use PHP_CodeSniffer\Sniffs\Sniff;
use PHP_CodeSniffer\Util\Tokens;
use PHPCSUtils\Tokens\Collections;
use PHPCSUtils\Utils\FunctionDeclarations;
use PHPCSUtils\Utils\GetTokensAsString;
use PHPCSUtils\Utils\ObjectDeclarations;
use PHPCSUtils\Utils\Scopes;
use PHPCSUtils\Utils\Variables;

/**
 * This sniff ensures that PHP functions have a valid `@since` tag in the docblock.
 * The sniff skips checking files in __experimental block-library blocks.
 */
class FunctionCommentSinceTagSniff implements Sniff {

	/**
	 * Disable the check for functions with a lower visibility than the value given.
	 *
	 * Allowed values are public, protected, and private.
	 *
	 * @var string
	 */
	public $minimumVisibility = 'private';

	/**
	 * A map of tokens representing an object-oriented programming structure to their human-readable names.
	 * This map helps in identifying different OO structures such as classes, interfaces, traits, and enums.
	 *
	 * @var array
	 */
	protected static $oo_tokens = array(
		T_CLASS     => array(
			'name' => 'class',
		),
		T_INTERFACE => array(
			'name' => 'interface',
		),
		T_TRAIT     => array(
			'name' => 'trait',
		),
		T_ENUM      => array(
			'name' => 'enum',
		),
	);

	/**
	 * This property is used to store results returned
	 * by the static::is_experimental_block() method.
	 *
	 * @var array
	 */
	protected static $cache = array();

	/**
	 * Returns an array of tokens this test wants to listen for.
	 *
	 * @return array<int|string>
	 */
	public function register() {
		return array_merge(
			array(
				T_FUNCTION,
				T_VARIABLE,
				T_STRING,
			),
			array_keys( static::$oo_tokens )
		);
	}

	/**
	 * Processes the tokens that this sniff is interested in.
	 *
	 * @param File $phpcsFile The file being scanned.
	 * @param int  $stackPtr  The position of the current token in the stack passed in $tokens.
	 */
	public function process( File $phpcsFile, $stackPtr ) {
		if ( static::is_experimental_block( $phpcsFile ) ) {
			// The "@since" tag is not required for experimental blocks since they are not yet included in WordPress Core.
			return;
		}

		$tokens = $phpcsFile->getTokens();
		$token  = $tokens[ $stackPtr ];

		if ( 'T_FUNCTION' === $token['type'] ) {
			$this->process_function_token( $phpcsFile, $stackPtr );
			return;
		}

		if ( isset( static::$oo_tokens[ $token['code'] ] ) ) {
			$this->process_oo_token( $phpcsFile, $stackPtr );
			return;
		}

		if ( 'T_STRING' === $token['type'] ) {
			$this->process_hook( $phpcsFile, $stackPtr );
			return;
		}

		if ( 'T_VARIABLE' === $token['type'] && Scopes::isOOProperty( $phpcsFile, $stackPtr ) ) {
			$this->process_property_token( $phpcsFile, $stackPtr );
		}
	}

	/**
	 * Processes a token representing a function call that invokes a WordPress hook,
	 * checking for a missing `@since` tag in its docblock.
	 *
	 * @param File $phpcs_file    The file being scanned.
	 * @param int  $stack_pointer The position of the hook token in the stack.
	 */
	protected function process_hook( File $phpcs_file, $stack_pointer ) {
		$tokens = $phpcs_file->getTokens();

		// The content of the current token.
		$hook_function = $tokens[ $stack_pointer ]['content'];

		$hook_invoking_functions = array(
			'do_action',
			'do_action_ref_array',
			'apply_filters',
			'apply_filters_ref_array',
		);

		// Check if the current token content is one of the filter functions.
		if ( ! in_array( $hook_function, $hook_invoking_functions, true ) ) {
			// Not a hook.
			return;
		}

		$missing_since_tag_error_message = sprintf(
			'@since tag is missing for the "%s" hook.',
			$hook_function
		);

		$violation_code = 'MissingHookSinceTag';

		$docblock = static::find_hook_docblock( $phpcs_file, $stack_pointer );
		if ( false === $docblock ) {
			$phpcs_file->addError( $missing_since_tag_error_message, $stack_pointer, $violation_code );
			return;
		}

		list( $doc_block_start_token, $doc_block_end_token ) = $docblock;

		$version_token = static::find_version_tag_token( $phpcs_file, $doc_block_start_token, $doc_block_end_token );
		if ( false === $version_token ) {
			$docblock_content = GetTokensAsString::compact( $phpcs_file, $doc_block_start_token, $doc_block_end_token, false );
			if ( false !== stripos( $docblock_content, 'This filter is documented in ' ) ) {
				// The hook is documented elsewhere.
				return;
			}

			$phpcs_file->addError( $missing_since_tag_error_message, $doc_block_start_token, $violation_code );
			return;
		}

		$version_value = $tokens[ $version_token ]['content'];

		if ( version_compare( $version_value, '0.0.1', '>=' ) ) {
			// Validate the version value.
			return;
		}

		$phpcs_file->addError(
			'Invalid @since version value for the "%s()" hook: "%s". Version value must be greater than or equal to 0.0.1.',
			$version_token,
			'InvalidHookSinceTagVersionValue',
			array(
				$hook_function,
				$version_value,
			)
		);
	}

	/**
	 * Processes a token representing an object-oriented programming structure
	 * like a class, interface, trait, or enum to check for a missing `@since` tag in its docblock.
	 *
	 * @param File $phpcs_file    The file being scanned.
	 * @param int  $stack_pointer The position of the OO token in the stack.
	 */
	protected function process_oo_token( File $phpcs_file, $stack_pointer ) {
		$tokens     = $phpcs_file->getTokens();
		$token_type = static::$oo_tokens[ $tokens[ $stack_pointer ]['code'] ]['name'];

		$token_name                      = ObjectDeclarations::getName( $phpcs_file, $stack_pointer );
		$missing_since_tag_error_message = sprintf(
			'@since tag is missing for the "%s" %s.',
			$token_name,
			$token_type
		);

		$violation_code = 'Missing' . ucfirst( $token_type ) . 'SinceTag';

		$docblock = static::find_docblock( $phpcs_file, $stack_pointer );
		if ( false === $docblock ) {
			$phpcs_file->addError( $missing_since_tag_error_message, $stack_pointer, $violation_code );
			return;
		}

		list( $doc_block_start_token, $doc_block_end_token ) = $docblock;

		$version_token = static::find_version_tag_token( $phpcs_file, $doc_block_start_token, $doc_block_end_token );
		if ( false === $version_token ) {
			$phpcs_file->addError( $missing_since_tag_error_message, $doc_block_start_token, $violation_code );
			return;
		}

		$version_value = $tokens[ $version_token ]['content'];

		if ( version_compare( $version_value, '0.0.1', '>=' ) ) {
			// Validate the version value.
			return;
		}

		$phpcs_file->addError(
			'Invalid @since version value for the "%s()" hook: "%s". Version value must be greater than or equal to 0.0.1.',
			$version_token,
			'Invalid' . ucfirst( $token_type ) . 'SinceTagVersionValue',
			array(
				$token_name,
				$version_value,
			)
		);
	}

	/**
	 * Processes a token representing an object-oriented property to check for a missing @since tag in its docblock.
	 *
	 * @param File $phpcs_file    The file being scanned.
	 * @param int  $stack_pointer The position of the object-oriented property token in the stack.
	 */
	protected function process_property_token( File $phpcs_file, $stack_pointer ) {
		$tokens = $phpcs_file->getTokens();

		$property_name                   = $tokens[ $stack_pointer ]['content'];
		$oo_token                        = Scopes::validDirectScope( $phpcs_file, $stack_pointer, Collections::ooPropertyScopes() );
		$class_name                      = ObjectDeclarations::getName( $phpcs_file, $oo_token );
		$missing_since_tag_error_message = sprintf(
			'@since tag is missing for the "%s::%s" property.',
			$class_name,
			$property_name
		);

		$violation_code = 'MissingPropertySinceTag';

		$scope_modifier = Variables::getMemberProperties( $phpcs_file, $stack_pointer )['scope'];
		if ( ( $scope_modifier === 'protected'
				&& $this->minimumVisibility === 'public' )
			|| ( $scope_modifier === 'private'
					&& ( $this->minimumVisibility === 'public' || $this->minimumVisibility === 'protected' ) )
		) {
			return;
		}

		$docblock = static::find_docblock( $phpcs_file, $stack_pointer );
		if ( false === $docblock ) {
			$phpcs_file->addError( $missing_since_tag_error_message, $stack_pointer, $violation_code );
			return;
		}

		list( $doc_block_start_token, $doc_block_end_token ) = $docblock;

		$version_token = static::find_version_tag_token( $phpcs_file, $doc_block_start_token, $doc_block_end_token );
		if ( false === $version_token ) {
			$phpcs_file->addError( $missing_since_tag_error_message, $doc_block_start_token, $violation_code );
			return;
		}

		$version_value = $tokens[ $version_token ]['content'];

		if ( version_compare( $version_value, '0.0.1', '>=' ) ) {
			// Validate the version value.
			return;
		}

		$phpcs_file->addError(
			'Invalid @since version value for the "%s::%s" property: "%s". Version value must be greater than or equal to 0.0.1.',
			$version_token,
			'InvalidPropertySinceTagVersionValue',
			array(
				$class_name,
				$property_name,
				$version_value,
			)
		);
	}

	/**
	 * Processes a T_FUNCTION token to check for a missing @since tag in its docblock.
	 *
	 * @param File $phpcs_file    The file being scanned.
	 * @param int  $stack_pointer The position of the T_FUNCTION token in the stack.
	 */
	protected function process_function_token( File $phpcs_file, $stack_pointer ) {
		$tokens = $phpcs_file->getTokens();

		$oo_token      = Scopes::validDirectScope( $phpcs_file, $stack_pointer, Tokens::$ooScopeTokens );
		$is_oo_method  = Scopes::isOOMethod( $phpcs_file, $stack_pointer );
		$function_name = ObjectDeclarations::getName( $phpcs_file, $stack_pointer );

		$violation_code = 'MissingFunctionSinceTag';

		if ( $is_oo_method ) {
			$scope_modifier = FunctionDeclarations::getProperties( $phpcs_file, $stack_pointer )['scope'];
			if ( ( $scope_modifier === 'protected'
					&& $this->minimumVisibility === 'public' )
				|| ( $scope_modifier === 'private'
						&& ( $this->minimumVisibility === 'public' || $this->minimumVisibility === 'protected' ) )
			) {
				return;
			}

			$violation_code = 'MissingMethodSinceTag';
			$function_name  = ObjectDeclarations::getName( $phpcs_file, $oo_token ) . '::' . $function_name;
		}

		$missing_since_tag_error_message = sprintf(
			'@since tag is missing for the "%s()" %s.',
			$function_name,
			$is_oo_method ? 'method' : 'function'
		);

		$docblock = static::find_docblock( $phpcs_file, $stack_pointer );
		if ( false === $docblock ) {
			$phpcs_file->addError( $missing_since_tag_error_message, $stack_pointer, $violation_code );
			return;
		}

		list( $doc_block_start_token, $doc_block_end_token ) = $docblock;

		$version_token = static::find_version_tag_token( $phpcs_file, $doc_block_start_token, $doc_block_end_token );
		if ( false === $version_token ) {
			$phpcs_file->addError( $missing_since_tag_error_message, $doc_block_start_token, $violation_code );
			return;
		}

		$version_value = $tokens[ $version_token ]['content'];

		if ( version_compare( $version_value, '0.0.1', '>=' ) ) {
			// Validate the version value.
			return;
		}

		$phpcs_file->addError(
			'Invalid @since version value for the "%s()" %s: "%s". Version value must be greater than or equal to 0.0.1.',
			$version_token,
			$violation_code,
			array(
				$function_name,
				$is_oo_method ? 'method' : 'function',
				$version_value,
			)
		);
	}

	/**
	 * Finds the docblock associated with a hook, starting from a specified position in the token stack.
	 * Since a line containing a hook can include any type of tokens, this method backtracks through the tokens
	 * to locate the first token on the current line. This token is then used as the starting point for searching the docblock.
	 *
	 * @param File $phpcs_file    The file being scanned.
	 * @param int  $stack_pointer The position to start looking for the docblock.
	 * @return array|false The start and end tokens of the docblock, or false if not found.
	 */
	protected static function find_hook_docblock( File $phpcs_file, $stack_pointer ) {
		$tokens       = $phpcs_file->getTokens();
		$current_line = $tokens[ $stack_pointer ]['line'];

		for ( $i = $stack_pointer; $i >= 0; $i-- ) {
			if ( $tokens[ $i ]['line'] < $current_line ) {
				// The previous token is on the previous line, so the current token is the first on the line.
				return static::find_docblock( $phpcs_file, $i + 1 );
			}
		}

		return static::find_docblock( $phpcs_file, 0 );
	}

	/**
	 * Finds the docblock preceding a specified position (stack pointer) in a given PHP file.
	 * The implementation was copied from FunctionCommentSniff::process().
	 *
	 * @param File $phpcs_file    The file being scanned.
	 * @param int  $stack_pointer The position (stack pointer) in the token stack from which to start searching backwards.
	 * @return array|false An array with the starting and ending token positions of the found docblock, or false if no docblock is found.
	 */
	protected static function find_docblock( File $phpcs_file, $stack_pointer ) {
		$tokens                 = $phpcs_file->getTokens();
		$ignore                 = Tokens::$methodPrefixes;
		$ignore[ T_WHITESPACE ] = T_WHITESPACE;

		for ( $comment_end = ( $stack_pointer - 1 ); $comment_end >= 0; $comment_end-- ) {
			if ( isset( $ignore[ $tokens[ $comment_end ]['code'] ] ) ) {
				continue;
			}

			if ( T_ATTRIBUTE_END === $tokens[ $comment_end ]['code']
				&& isset( $tokens[ $comment_end ]['attribute_opener'] )
			) {
				$comment_end = $tokens[ $comment_end ]['attribute_opener'];
				continue;
			}

			break;
		}

		if ( $tokens[ $comment_end ]['code'] === T_COMMENT ) {
			// Inline comments might just be closing comments for
			// control structures or functions instead of function comments
			// using the wrong comment type. If there is other code on the line,
			// assume they relate to that code.
			$previous = $phpcs_file->findPrevious( $ignore, ( $comment_end - 1 ), null, true );
			if ( false !== $previous && $tokens[ $previous ]['line'] === $tokens[ $comment_end ]['line'] ) {
				$comment_end = $previous;
			}
		}

		$docblock_end_tags = array(
			T_DOC_COMMENT_CLOSE_TAG,
			T_COMMENT,
		);

		if ( ! in_array( $tokens[ $comment_end ]['code'], $docblock_end_tags, true ) ) {
			return false;
		}

		return array(
			$tokens[ $comment_end ]['comment_opener'],
			$comment_end,
		);
	}

	/**
	 * Searches for a version tag within a docblock.
	 *
	 * @param File $phpcs_file            The file being scanned.
	 * @param int  $doc_block_start_token The token index where the docblock starts.
	 * @param int  $doc_block_end_token   The token index where the docblock ends.
	 * @return false|int The token index of the version tag within the docblock if found, false otherwise.
	 */
	protected static function find_version_tag_token( File $phpcs_file, $doc_block_start_token, $doc_block_end_token ) {
		$tokens          = $phpcs_file->getTokens();
		$since_tag_token = $phpcs_file->findNext( T_DOC_COMMENT_TAG, $doc_block_start_token, $doc_block_end_token, false, '@since', true );
		if ( false === $since_tag_token ) {
			return false;
		}

		$version_token = $phpcs_file->findNext( T_DOC_COMMENT_WHITESPACE, $since_tag_token + 1, null, true, null, true );
		if ( ( false === $version_token ) || ( T_DOC_COMMENT_STRING !== $tokens[ $version_token ]['code'] ) ) {
			return false;
		}

		return $version_token;
	}

	/**
	 * Checks if the current block is experimental.
	 *
	 * @param File $phpcs_file The file being scanned.
	 * @return bool Returns true if the current block is experimental.
	 */
	protected static function is_experimental_block( File $phpcs_file ) {
		$block_json_filepath = dirname( $phpcs_file->getFilename() ) . DIRECTORY_SEPARATOR . 'block.json';

		if ( isset( static::$cache[ $block_json_filepath ] ) ) {
			return static::$cache[ $block_json_filepath ];
		}

		if ( ! is_file( $block_json_filepath ) || ! is_readable( $block_json_filepath ) ) {
			static::$cache[ $block_json_filepath ] = false;
			return static::$cache[ $block_json_filepath ];
		}

		// phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents -- this Composer package doesn't depend on WordPress.
		$block_metadata = file_get_contents( $block_json_filepath );
		if ( false === $block_metadata ) {
			static::$cache[ $block_json_filepath ] = false;
			return static::$cache[ $block_json_filepath ];
		}

		$block_metadata = json_decode( $block_metadata, true );
		if ( ! is_array( $block_metadata ) ) {
			static::$cache[ $block_json_filepath ] = false;
			return static::$cache[ $block_json_filepath ];
		}

		$experimental_flag                     = '__experimental';
		static::$cache[ $block_json_filepath ] = array_key_exists( $experimental_flag, $block_metadata ) && ( false !== $block_metadata[ $experimental_flag ] );
		return static::$cache[ $block_json_filepath ];
	}
}
