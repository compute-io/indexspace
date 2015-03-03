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

	it( 'should throw an error if not provided a valid subsequence string', function test() {
		var values = [
			'',
			'beep',
			'4',
			'[5',
			'0]',
			'[]',
			'[a]',
			'[5]',
			'[5:',
			':5]',
			'[5:a]',
			'[5:end*2]',
			'[end+2:]',
			'[::-]',
			'[-:]',
			'[:-]',
			'[::-]',
			'[end-:]',
			'[:-:]'
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
				indexspace( '[:]', value );
			};
		}
	});

	it( 'should return an empty array if provided a reference array length equal to 0', function test() {
		var actual = indexspace( '[:]', 0 );
		assert.deepEqual( actual, [] );
	});

});
