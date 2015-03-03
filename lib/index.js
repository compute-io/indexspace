/**
*
*	COMPUTE: indexspace
*
*
*	DESCRIPTION:
*		- Generates a linearly spaced index array from a subsequence string.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2015. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2015.
*
*/

'use strict';

// MODULES //

var isNonNegativeInteger = require( 'validate.io-nonnegative-integer' );


// VARIABLES //

var re = /^\[(?:(?:-(?=\d+))?\d*|end(?:-?\d+|\/\d+)?):(?:(?:-(?=\d+))?\d*|end(?:-?\d+|\/\d+)?)(?:\:(?=-?\d*)(?:-?\d+)?)?\]$/;

/**
*	^\[
*	=> require that the string begin with '['
*
*	(?:(?:-(?=\d+))?\d*|end(?:-?\d+|/\\d+)?)
*	=> match but do not capture
*		(?:-(?=\d+))?
*		=> match but do not capture a minus sign but only if followed by one or more digits
*		\d*
*		=> 0 or more digits
*		|
*		=> OR
*		end(?:-?\d+|/\d+)?
*		=> the word `end` exactly, which may be followed by either a minus sign and 1 or more digits or a division sign and 1 or more digits
*
*	:
*	=> match a colon exactly
*
*	(?:(?:-(?=\d+))?\d*|end(?:-?\d+|/\\d+)?)
*	=> same as above
*
*	(?:\:(?=-?\d*)(?:-?\d+)?)?
*	=> match but do not capture
*		\:(?=-?\d*)
*		=> a colon but only if followed by either a possible minus sign and 0 or more digits
*		(?:-?\d+)?
*		=> match but do not capture a possible minus sign and 1 or more digits
*
*	\]$
*	=> require that the string end with a ']'
*
*
* Examples:
*	-	[:]
*	-	[::]
*	-	[4:]
*	-	[:4]
*	-	[::-1]
*	-	[3::-1]
*	-	[:10:2]
*	-	[1:3:1]
*	-	[9:1:-3]
*	-	[1:-1]
*	-	[:-1]
*	-	[-5:]
*	-	[1:-5:2]
*	-	[-9:10:1]
*	-	[-9:-4:2]
*	-	[-4:-9:-2]
*	-	[1:end:2]
*	-	[:end/2]
*	-	[end/2:end:5]
*/


// INDEXSPACE

/**
* FUNCTION: indexspace( str, len )
*	Generates a linearly spaced index array from a subsequence string.
*
* @param {String} str - subsequence string
* @param {Number} len - reference array length
* @returns {Number[]} array of indices
*/
function indexspace( str, len ) {
	var sign,
		n, i, j;
	if ( !re.test( str ) ) {
		throw new Error( 'indexspace()::invalid input argument. Invalid subsequence syntax. Please consult documentation. Value: `' + str + '`.' );
	}
	if ( !isNonNegativeInteger( len ) ) {
		throw new TypeError( 'indexspace()::invalid input argument. Reference array length must be a nonnegative integer. Value: `' + len + '`.' );
	}
	if ( !len ) {
		return [];
	}
	str = str.split( ':' );
	n = str.length;
	for ( i = 0; i < n; i++ ) {
		str[ i ] = parseInt( str[ i ], 10 );
	}
	i = str[ 0 ];
	j = str[ 1 ];
	if ( n === 2 ) {
		str.push( 1 );
	} else {
		if ( str[ 2 ] < 0 ) {
			sign = true;
		}
	}
	if ( sign ) {
		if ( i !== i ) {
			i = len;
		}
		if ( j !== j ) {
			j = -1;
		} else {
			j -= 1;
		}
	} else {
		if ( i !== i ) {
			i = 0;
		}
		if ( j !== j ) {
			j = len + 1;
		} else {
			j += 1;
		}
	}
	return [];
} // end FUNCTION indexspace()


// EXPORTS //

module.exports = indexspace;
