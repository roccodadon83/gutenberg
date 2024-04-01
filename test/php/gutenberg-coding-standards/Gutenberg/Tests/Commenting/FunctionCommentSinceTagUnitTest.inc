<?php
function foo() {
	$result = do_action( 'some_filter', array() );
	$result = do_action_ref_array( 'some_filter', array() );
	$result = apply_filters( 'some_filter', array() );
	$result = apply_filters_ref_array( 'some_filter', array() );

	/**
	 * @version
	 * 123
	 */
	$result = apply_filters( 'some_filter', array() );

	/**
	 * @version invalid 123
	 */
	$result = apply_filters( 'some_filter', array() );

	/**
	 * @version 123
	 */
	$result = apply_filters( 'some_filter', array() );

	$variable = 'some_value'; // Some comment @version 123

	$result = apply_filters( 'some_filter', array() );
}

/**
 * @version
 * 123
 */
function bar() {
}

/**
 * @version invalid 123
 */
function baz() {
}

/**
 * @version 123
 */
function qux() {
}

$variable = 'some_value'; // Some comment @version 123

function quux() {
}

$result = array_map( function ( $value ) {
	return $value * 2; // Doubling each value
}, array( 1, 2, 3, 4, 5 ) );

class Foo {
	protected function foobar() {
		$result = do_action( 'some_filter', array() );
		$result = do_action_ref_array( 'some_filter', array() );
		$result = apply_filters( 'some_filter', array() );
		$result = apply_filters_ref_array( 'some_filter', array() );

		/**
		 * @version
		 * 123
		 */
		$result = apply_filters( 'some_filter', array() );

		/**
		 * @version invalid 123
		 */
		$result = apply_filters( 'some_filter', array() );

		/**
		 * @version 123
		 */
		$result = apply_filters( 'some_filter', array() );

		$variable = 'some_value'; // Some comment @version 123

		$result = apply_filters( 'some_filter', array() );
	}

	/**
	 * @version
	 * 123
	 */
	public function bar() {
	}

	/**
	 * @version invalid 123
	 */
	public function baz() {
	}

	/**
	 * @version 123
	 */
	protected function qux() {
	}

	// Some comment @version 123

	public function quux() {
		$result = array_map( function ( $value ) {
			return $value * 2; // Doubling each value
		}, array( 1, 2, 3, 4, 5 ) );
	}

	private function corge() {

	}
}

/**
 * @version
 * 123
 */
class Foo_1 {
}

/**
 * @version invalid 123
 */
class Foo_2 {
}

/**
 * @version 123
 */
class Foo_3 {
}

$variable = 'some_value'; // Some comment @version 123

class Foo_4 {
}

abstract class Bar {
	protected function foobar() {
		$result = do_action( 'some_filter', array() );
		$result = do_action_ref_array( 'some_filter', array() );
		$result = apply_filters( 'some_filter', array() );
		$result = apply_filters_ref_array( 'some_filter', array() );

		/**
		 * @version
		 * 123
		 */
		$result = apply_filters( 'some_filter', array() );

		/**
		 * @version invalid 123
		 */
		$result = apply_filters( 'some_filter', array() );

		/**
		 * @version 123
		 */
		$result = apply_filters( 'some_filter', array() );

		$variable = 'some_value'; // Some comment @version 123

		$result = apply_filters( 'some_filter', array() );
	}

	/**
	 * @version
	 * 123
	 */
	public function bar() {
	}

	/**
	 * @version invalid 123
	 */
	public function baz() {
	}

	/**
	 * @version 123
	 */
	protected function qux() {
	}

	// Some comment @version 123

	public function quux() {
		$result = array_map( function ( $value ) {
			return $value * 2; // Doubling each value
		}, array( 1, 2, 3, 4, 5 ) );
	}

	private function corge() {
	}
}

/**
 * @version
 * 123
 */
class Bar_1 {
}

/**
 * @version invalid 123
 */
class Bar_2 {
}

/**
 * @version 123
 */
class Bar_3 {
}

$variable = 'some_value'; // Some comment @version 123

class Bar_4 {
}

Trait Baz {
	protected function foobar() {
		$result = do_action( 'some_filter', array() );
		$result = do_action_ref_array( 'some_filter', array() );
		$result = apply_filters( 'some_filter', array() );
		$result = apply_filters_ref_array( 'some_filter', array() );

		/**
		 * @version
		 * 123
		 */
		$result = apply_filters( 'some_filter', array() );

		/**
		 * @version invalid 123
		 */
		$result = apply_filters( 'some_filter', array() );

		/**
		 * @version 123
		 */
		$result = apply_filters( 'some_filter', array() );

		$variable = 'some_value'; // Some comment @version 123

		$result = apply_filters( 'some_filter', array() );
	}

	/**
	 * @version
	 * 123
	 */
	public function bar() {
	}

	/**
	 * @version invalid 123
	 */
	public function baz() {
	}

	/**
	 * @version 123
	 */
	protected function qux() {
	}

	// Some comment @version 123

	public function quux() {
		$result = array_map( function ( $value ) {
			return $value * 2; // Doubling each value
		}, array( 1, 2, 3, 4, 5 ) );
	}

	private function corge() {
	}
}

/**
 * @version
 * 123
 */
class Baz_1 {
}

/**
 * @version invalid 123
 */
class Baz_2 {
}

/**
 * @version 123
 */
class Baz_3 {
}

$variable = 'some_value'; // Some comment @version 123

class Baz_4 {
}

interface Qux {
	public function foobar();

	/**
	 * @version
	 * 123
	 */
	public function bar();

	/**
	 * @version invalid 123
	 */
	public function baz();

	/**
	 * @version 123
	 */
	protected function qux();

	// Some comment @version 123

	public function quux();

	private function corge() {
	}
}

/**
 * @version
 * 123
 */
class Qux_1 {
}

/**
 * @version invalid 123
 */
class Qux_2 {
}

/**
 * @version 123
 */
class Qux_3 {
}

$variable = 'some_value'; // Some comment @version 123

class Qux_4 {
}

$result = do_action( 'some_filter', array() );
$result = do_action_ref_array( 'some_filter', array() );
$result = apply_filters( 'some_filter', array() );
$result = apply_filters_ref_array( 'some_filter', array() );

/**
 * @version
 * 123
 */
$result = apply_filters( 'some_filter', array() );

/**
 * @version invalid 123
 */
$result = apply_filters( 'some_filter', array() );

/**
 * @version 123
 */
$result = apply_filters( 'some_filter', array() );

$variable = 'some_value'; // Some comment @version 123

$result = apply_filters( 'some_filter', array() );
