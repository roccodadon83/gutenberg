<?php
/**
 * Unit test class for Gutenberg Coding Standard.
 *
 * @package gutenberg-coding-standards/gbc
 * @link    https://github.com/WordPress/gutenberg
 * @license https://opensource.org/licenses/MIT MIT
 */

namespace GutenbergCS\Gutenberg\Tests\Commenting;

use GutenbergCS\Gutenberg\Sniffs\Commenting\FunctionCommentSinceTagSniff;
use GutenbergCS\Gutenberg\Tests\AbstractSniffUnitTest;
use PHP_CodeSniffer\Ruleset;

/**
 * Unit test class for the FunctionCommentSinceTagSniff sniff.
 */
final class FunctionCommentSinceTagUnitTest extends AbstractSniffUnitTest {

	/**
	 * Returns the lines where errors should occur.
	 *
	 * @return array <int line number> => <int number of errors>
	 */
	public function getErrorList() {
		// The sniff only supports PHP functions for now; it ignores class, trait, and interface methods.
		return array();
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
	protected function setSniffParameters( Ruleset $current_ruleset ) {
		if ( ! isset( $current_ruleset->sniffs[ FunctionCommentSinceTagSniff::class ] )
		     || ( ! $current_ruleset->sniffs[ FunctionCommentSinceTagSniff::class ] instanceof FunctionCommentSinceTagSniff )
		) {
			throw new \RuntimeException( 'Cannot set ruleset parameters required for this test.' );
		}

		$sniff           = $current_ruleset->sniffs[ FunctionCommentSinceTagSniff::class ];
		$sniff->minimumVisibility = 'protected';
	}
}
