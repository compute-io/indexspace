/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	indexspace = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-indexspace', function tests() {

	it( 'should export a function', function test() {
		expect( indexspace ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided a string', function test() {
		var values = [
			5,
			null,
			undefined,
			NaN,
			true,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				indexspace( value, 10 );
			};
		}
	});

	it( 'should throw an error if not provided a valid subsequence string', function test() {
		var values = [
			'',
			'[:]',
			'[:',
			':]',
			'beep',
			':5a',
			'5:a',
			'5:end*2',
			'end+2:',
			'::-',
			'-:',
			':-',
			'::-',
			'end-:',
			':-:'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				indexspace( value, 10 );
			};
		}
	});

	it( 'should throw an error if provided a reference array length which is not a nonnegative integer', function test() {
		var values = [
			-3,
			Math.PI,
			'5',
			NaN,
			null,
			undefined,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				indexspace( ':', value );
			};
		}
	});

	it( 'should throw an error if provided a 0 increment', function test() {
		expect( badValue ).to.throw( Error );
		function badValue() {
			indexspace( '::0', 10 );
		}
	});

	it( 'should return an index array', function test() {
		var actual, expected;

		actual = indexspace( ':', 5 );
		expected = [ 0, 1, 2, 3, 4 ];
		assert.deepEqual( actual, expected, '[:]' );

		actual = indexspace( '2:', 5 );
		expected = [ 2, 3, 4 ];
		assert.deepEqual( actual, expected, '[2:]' );

		actual = indexspace( ':3', 5 );
		expected = [ 0, 1, 2 ];
		assert.deepEqual( actual, expected, '[:3]' );

		actual = indexspace( '2:4', 5 );
		expected = [ 2, 3 ];
		assert.deepEqual( actual, expected, '[2:4]' );

		actual = indexspace( '1:4:2', 5 );
		expected = [ 1, 3 ];
		assert.deepEqual( actual, expected, '[1:4:2]' );

		actual = indexspace( '2::2', 5 );
		expected = [ 2, 4 ];
		assert.deepEqual( actual, expected, '[2::2]' );

		actual =  indexspace( ':10:3', 20 );
		expected = [ 0, 3, 6, 9 ];
		assert.deepEqual( actual, expected, '[:10:3]' );

		actual = indexspace( ':-1', 5 );
		expected = [ 0, 1, 2, 3 ];
		assert.deepEqual( actual, expected, '[:-1]' );

		actual = indexspace( '-3:', 5 );
		expected = [ 2, 3, 4 ];
		assert.deepEqual( actual, expected, '[-3:]' );

		actual = indexspace( ':-2', 5 );
		expected = [ 0, 1, 2 ];
		assert.deepEqual( actual, expected, '[:-2]' );

		actual = indexspace( '2:-2', 5 );
		expected = [ 2 ];
		assert.deepEqual( actual, expected, '[2:-2]' );

		actual = indexspace( ':-1:2', 5 );
		expected = [ 0, 2 ];
		assert.deepEqual( actual, expected, '[:-1:2]' );

		actual = indexspace( '-4:-1:2', 5 );
		expected = [ 1, 3 ];
		assert.deepEqual( actual, expected, '[-4:-1:2]' );

		actual = indexspace( '-5:-1', 5 );
		expected = [ 0, 1, 2, 3 ];
		assert.deepEqual( actual, expected, '[-5:-1]' );

		actual = indexspace( '::-1', 5 );
		expected = [ 4, 3, 2, 1, 0 ];
		assert.deepEqual( actual, expected, '[::-1]' );

		actual = indexspace( ':0:-1', 5 );
		expected = [ 4, 3, 2, 1 ];
		assert.deepEqual( actual, expected, '[:0:-1]' );

		actual = indexspace( '3:0:-1', 5 );
		expected = [ 3, 2, 1 ];
		assert.deepEqual( actual, expected, '[3:0:-1]' );

		actual = indexspace( '-1:-4:-2', 5 );
		expected = [ 4, 2 ];
		assert.deepEqual( actual, expected, '[-1:-4:-2]' );
	});

	it( 'should support an `end` keyword', function test() {
		var actual, expected;

		actual = indexspace( ':end', 5 );
		expected = [ 0, 1, 2, 3, 4 ];
		assert.deepEqual( actual, expected, '[:end]' );

		actual = indexspace( 'end::-1', 5 );
		expected = [ 4, 3, 2, 1, 0 ];
		assert.deepEqual( actual, expected, '[end::-1]' );

		actual = indexspace( ':end-1', 5 );
		expected = [ 0, 1, 2, 3 ];
		assert.deepEqual( actual, expected, '[:end-1]' );

		actual = indexspace( ':end/2', 5 );
		expected = [ 0, 1 ];
		assert.deepEqual( actual, expected, '[:end/2]' );

		actual = indexspace( ':end/2', 6 );
		expected = [ 0, 1, 2 ];
		assert.deepEqual( actual, expected, '[:end/2]' );

		actual = indexspace( 'end-2::-1', 5 );
		expected = [ 2, 1, 0 ];
		assert.deepEqual( actual, expected, '[end-2::-1]' );

		actual = indexspace( 'end/2:', 5 );
		expected = [ 2, 3, 4 ];
		assert.deepEqual( actual, expected, '[end/2:]' );

		actual = indexspace( 'end/2:', 6 );
		expected = [ 3, 4, 5 ];
		assert.deepEqual( actual, expected, '[end/2:]' );

		actual = indexspace( '2:end-2', 5 );
		expected = [ 2 ];
		assert.deepEqual( actual, expected, '[2:end-2]' );

		actual = indexspace( 'end/3::-1', 5 );
		expected = [ 2, 1, 0 ];
		assert.deepEqual( actual, expected, '[end/3::-1]' );

		actual = indexspace( '1:end:2', 5 );
		expected = [ 1, 3 ];
		assert.deepEqual( actual, expected, '[1:end:2]' );
	});

	it( 'should return an empty array if provided a reference array length equal to 0', function test() {
		var actual = indexspace( ':', 0 );
		assert.deepEqual( actual, [] );
	});

	it( 'should return an empty array if start and end indices are equal', function test() {
		var actual;

		actual = indexspace( '2:-3', 5 );
		assert.deepEqual( actual, [], '[2:-3]' );

		actual = indexspace( '2:2', 5 );
		assert.deepEqual( actual, [], '[2:2]' );
	});

	it( 'should return an empty array if start is greater than the end for a positive increment', function test() {
		var actual = indexspace( '4:0', 10 );
		assert.deepEqual( actual, [] );
	});

	it( 'should return an empty array if start is less than the end for a negative increment', function test() {
		var actual = indexspace( '0:4:-1', 10 );
		assert.deepEqual( actual, [] );
	});

	it( 'should return an empty array if start index is greater than maximum index', function test() {
		var actual;

		actual = indexspace( '5:', 5 );
		assert.deepEqual( actual, [], '[5:]' );

		actual = indexspace( '20:25', 5 );
		assert.deepEqual( actual, [], '[20:25]' );
	});

	it( 'should return an empty array if both indices are less than 0', function test() {
		var actual;

		actual = indexspace( '-25:-20', 5 );
		assert.deepEqual( actual, [], '[-25:-20]' );
	});

	it( 'should be forgiving if the user exceeds index bounds', function test() {
		var actual, expected;

		actual = indexspace( '-10:', 5 );
		expected = [ 0, 1, 2, 3, 4 ];
		assert.deepEqual( actual, expected, '[-10:]' );

		actual = indexspace( ':10', 5 );
		expected = [ 0, 1, 2, 3, 4 ];
		assert.deepEqual( actual, expected, '[:10]' );

		actual = indexspace( ':-10:-1', 5 );
		expected = [ 4, 3, 2, 1, 0 ];
		assert.deepEqual( actual, expected, '[:-10:-1]' );

		actual = indexspace( 'end-10:', 5 );
		expected = [ 0, 1, 2, 3, 4 ];
		assert.deepEqual( actual, expected, '[end-10:]' );

		actual = indexspace( ':end-10:-1', 5 );
		expected = [ 4, 3, 2, 1, 0 ];
		assert.deepEqual( actual, expected, '[:end-10:-1]' );
	});

});
