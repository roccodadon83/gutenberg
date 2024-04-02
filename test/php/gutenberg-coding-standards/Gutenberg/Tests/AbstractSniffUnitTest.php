<?php
/**
 * An abstract class that all sniff unit tests must extend.
 *
 * @package gutenberg-coding-standards/gbc
 * @link    https://github.com/WordPress/gutenberg
 * @license https://opensource.org/licenses/MIT MIT
 */

namespace GutenbergCS\Gutenberg\Tests;

use PHP_CodeSniffer\Config;
use PHP_CodeSniffer\Tests\Standards\AbstractSniffUnitTest as BaseAbstractSniffUnitTest;
use PHP_CodeSniffer\Ruleset;

/**
 * Unit test class for the GuardedFunctionAndClassNames sniff.
 */
abstract class AbstractSniffUnitTest extends BaseAbstractSniffUnitTest {

	/**
	 * Holds the original Ruleset instance.
	 *
	 * @var Ruleset
	 */
	protected static $original_ruleset;

	/**
	 * This method resets the 'Gutenberg' ruleset in the $GLOBALS['PHP_CODESNIFFER_RULESETS']
	 * to its original state.
	 */
	public static function tearDownAfterClass() {
		parent::tearDownAfterClass();

		$GLOBALS['PHP_CODESNIFFER_RULESETS']['Gutenberg'] = static::$original_ruleset;
		static::$original_ruleset                         = null;
	}

	/**
	 * Sets the parameters for the sniff.
	 *
	 * @throws RuntimeException If unable to set the ruleset parameters required for the test.
	 * @param Ruleset $current_ruleset The current ruleset being tested.
	 */
	abstract protected function setSniffParameters( Ruleset $current_ruleset );

	/**
	 * Prepares the environment before executing tests. Specifically, sets prefixes for the
	 * GuardedFunctionAndClassNames sniff.This is needed since AbstractSniffUnitTest class
	 * doesn't apply sniff properties from the Gutenberg/ruleset.xml file.
	 *
	 * @param string $filename The name of the file being tested.
	 * @param Config $config   The config data for the run.
	 *
	 * @return void
	 */
	public function setCliValues( $filename, $config ) {
		parent::setCliValues( $filename, $config );

		if ( ! isset( $GLOBALS['PHP_CODESNIFFER_RULESETS']['Gutenberg'] )
		     || ( ! $GLOBALS['PHP_CODESNIFFER_RULESETS']['Gutenberg'] instanceof Ruleset )
		) {
			throw new \RuntimeException( 'Cannot set ruleset parameters required for this test.' );
		}

		// Backup the original Ruleset instance.
		static::$original_ruleset = $GLOBALS['PHP_CODESNIFFER_RULESETS']['Gutenberg'];

		$current_ruleset                                  = clone static::$original_ruleset;
		$GLOBALS['PHP_CODESNIFFER_RULESETS']['Gutenberg'] = $current_ruleset;

		$this->setSniffParameters( $current_ruleset );
	}
}
