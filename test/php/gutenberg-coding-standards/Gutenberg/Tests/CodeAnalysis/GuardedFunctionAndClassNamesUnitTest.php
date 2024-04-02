<?php
/**
 * Unit test class for Gutenberg Coding Standard.
 *
 * @package gutenberg-coding-standards/gbc
 * @link    https://github.com/WordPress/gutenberg
 * @license https://opensource.org/licenses/MIT MIT
 */

namespace GutenbergCS\Gutenberg\Tests\CodeAnalysis;

use GutenbergCS\Gutenberg\Sniffs\CodeAnalysis\GuardedFunctionAndClassNamesSniff;
use GutenbergCS\Gutenberg\Tests\AbstractSniffUnitTest;
use PHP_CodeSniffer\Ruleset;

/**
 * Unit test class for the GuardedFunctionAndClassNames sniff.
 */
final class GuardedFunctionAndClassNamesUnitTest extends AbstractSniffUnitTest {

	/**
	 * Returns the lines where errors should occur.
	 *
	 * @return array <int line number> => <int number of errors>
	 */
	public function getErrorList() {
		return array(
			7  => 1,
			17 => 1,
			25 => 1,
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
		if ( ! isset( $current_ruleset->sniffs[ GuardedFunctionAndClassNamesSniff::class ] )
			|| ( ! $current_ruleset->sniffs[ GuardedFunctionAndClassNamesSniff::class ] instanceof GuardedFunctionAndClassNamesSniff )
		) {
			throw new \RuntimeException( 'Cannot set ruleset parameters required for this test.' );
		}

		$sniff                     = $current_ruleset->sniffs[ GuardedFunctionAndClassNamesSniff::class ];
		$sniff->functionsWhiteList = array(
			'/^_?gutenberg.+/',
		);

		$sniff->classesWhiteList = array(
			'/^Gutenberg.+/',
			'/^.+_Gutenberg$/',
		);
	}
}
