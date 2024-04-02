<?php
/**
 * Unit test class for Gutenberg Coding Standard.
 *
 * @package gutenberg-coding-standards/gbc
 * @link    https://github.com/WordPress/gutenberg
 * @license https://opensource.org/licenses/MIT MIT
 */

namespace GutenbergCS\Gutenberg\Tests\NamingConventions;

use GutenbergCS\Gutenberg\Sniffs\NamingConventions\ValidBlockLibraryFunctionNameSniff;
use GutenbergCS\Gutenberg\Tests\AbstractSniffUnitTest;
use PHP_CodeSniffer\Ruleset;

/**
 * Unit test class for the ValidBlockLibraryFunctionNameSniff sniff.
 */
final class ValidBlockLibraryFunctionNameUnitTest extends AbstractSniffUnitTest {

	/**
	 * Returns the lines where errors should occur.
	 *
	 * @return array <int line number> => <int number of errors>
	 */
	public function getErrorList() {
		return array(
			8  => 1,
			17 => 1,
			26 => 1,
			35 => 1,
		);
	}

	/**
	 * Returns the lines where warnings should occur.
	 *
	 * @return array <int line number> => <int number of warnings>
	 */
	public function getWarningList() {
		return array();
	}

	/**
	 * Sets the parameters for the sniff.
	 *
	 * @throws RuntimeException If unable to set the ruleset parameters required for the test.
	 * @param Ruleset $current_ruleset The current ruleset being tested.
	 */
	public function setSniffParameters( Ruleset $current_ruleset ) {
		if ( ! isset( $current_ruleset->sniffs[ ValidBlockLibraryFunctionNameSniff::class ] )
			|| ( ! $current_ruleset->sniffs[ ValidBlockLibraryFunctionNameSniff::class ] instanceof ValidBlockLibraryFunctionNameSniff )
		) {
			throw new \RuntimeException( 'Cannot set ruleset parameters required for this test.' );
		}

		$sniff           = $current_ruleset->sniffs[ ValidBlockLibraryFunctionNameSniff::class ];
		$sniff->prefixes = array(
			'block_core_',
			'render_block_core_',
			'register_block_core_',
		);
	}

	/**
	 * Get a list of all test files to check.
	 *
	 * @param string $testFileBase The base path that the unit tests files will have.
	 *
	 * @return string[]
	 */
	protected function getTestFiles( $testFileBase ) {
		return array(
			__DIR__ . '/../fixtures/block-library/src/my-block/index.inc',
		);
	}
}
