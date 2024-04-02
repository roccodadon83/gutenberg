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
use PHP_CodeSniffer\Sniffs\Sniff;

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
		return array(
			2   => 1,
			3   => 1,
			4   => 1,
			5   => 1,
			6   => 1,
			12  => 1,
			15  => 1,
			26  => 1,
			36  => 1,
			40  => 1,
			53  => 1,
			60  => 1,
			66  => 1,
			69  => 1,
			78  => 1,
			80  => 1,
			84  => 1,
			85  => 1,
			86  => 1,
			87  => 1,
			88  => 1,
			94  => 1,
			97  => 1,
			108 => 1,
			114 => 1,
			120 => 1,
			124 => 1,
			137 => 1,
			146 => 1,
			153 => 1,
			157 => 1,
			170 => 1,
			173 => 1,
			179 => 1,
			182 => 1,
			191 => 1,
			193 => 1,
			197 => 1,
			198 => 1,
			199 => 1,
			200 => 1,
			201 => 1,
			207 => 1,
			210 => 1,
			221 => 1,
			227 => 1,
			233 => 1,
			237 => 1,
			250 => 1,
			259 => 1,
			266 => 1,
			270 => 1,
			283 => 1,
			286 => 1,
			292 => 1,
			295 => 1,
			304 => 1,
			306 => 1,
			310 => 1,
			311 => 1,
			312 => 1,
			313 => 1,
			314 => 1,
			320 => 1,
			323 => 1,
			334 => 1,
			344 => 1,
			348 => 1,
			361 => 1,
			370 => 1,
			377 => 1,
			381 => 1,
			394 => 1,
			397 => 1,
			398 => 1,
			404 => 1,
			407 => 1,
			418 => 1,
			425 => 1,
			429 => 1,
			442 => 1,
			445 => 1,
			446 => 1,
			447 => 1,
			448 => 1,
			454 => 1,
			457 => 1,
			468 => 1,
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
	 * Returns the fully qualified class name (FQCN) of the sniff.
	 *
	 * @return string The fully qualified class name of the sniff.
	 */
	protected function get_sniff_fqcn() {
		return FunctionCommentSinceTagSniff::class;
	}

	/**
	 * Sets the parameters for the sniff.
	 *
	 * @throws RuntimeException If unable to set the ruleset parameters required for the test.
	 *
	 * @param Sniff $sniff The sniff being tested.
	 */
	public function set_sniff_parameters( Sniff $sniff ) {
		$sniff->minimumVisibility = 'protected';
	}
}
