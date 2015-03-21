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

var isString = require( 'validate.io-string-primitive' ),
	isNonNegativeInteger = require( 'validate.io-nonnegative-integer' );


// VARIABLES //

var re = /^(?:(?:-(?=\d+))?\d*|end(?:-\d+|\/\d+)?):(?:(?:-(?=\d+))?\d*|end(?:-\d+|\/\d+)?)(?:\:(?=-?\d*)(?:-?\d+)?)?$/;

/**
*	^(...)
*	=> require that the string begin with either a digit (+ or -), an `end` keyword, or a colon
*
*	(?:(?:-(?=\d+))?\d*|end(?:-?\d+|/\\d+)?)
*	=> match but do not capture
*		(?:-(?=\d+))?
*		=> match but do not capture a minus sign but only if followed by one or more digits
*		\d*
*		=> 0 or more digits
*		|
*		=> OR
*		end(?:-\d+|/\d+)?
*		=> the word `end` exactly, which may be followed by either a minus sign and 1 or more digits or a division sign and 1 or more digits
*
*	:
*	=> match a colon exactly
*
*	(?:(?:-(?=\d+))?\d*|end(?:-\d+|/\\d+)?)
*	=> same as above
*
*	(?:\:(?=-?\d*)(?:-?\d+)?)?
*	=> match but do not capture
*		\:(?=-?\d*)
*		=> a colon but only if followed by either a possible minus sign and 0 or more digits
*		(?:-?\d+)?
*		=> match but do not capture a possible minus sign and 1 or more digits
*
*	$
*	=> require that the string end with either a digit, `end` keyword, or a colon.
*
*
* Examples:
*	-	:
*	-	::
*	-	4:
*	-	:4
*	-	::-1
*	-	3::-1
*	-	:10:2
*	-	1:3:1
*	-	9:1:-3
*	-	1:-1
*	-	:-1
*	-	-5:
*	-	1:-5:2
*	-	-9:10:1
*	-	-9:-4:2
*	-	-4:-9:-2
*	-	1:end:2
*	-	:end/2
*	-	end/2:end:5
*/

var reEnd = /^end/,
	reMatch = /(-|\/)(?=\d+)(\d+)?$/;


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
	var x1,
		x2,
		tmp,
		inc,
		arr;
	if ( !isString( str ) || !re.test( str ) ) {
		throw new Error( 'indexspace()::invalid input argument. Invalid subsequence syntax. Please consult documentation. Value: `' + str + '`.' );
	}
	if ( !isNonNegativeInteger( len ) ) {
		throw new TypeError( 'indexspace()::invalid input argument. Reference array length must be a nonnegative integer. Value: `' + len + '`.' );
	}
	if ( !len ) {
		return [];
	}
	str = str.split( ':' );
	x1 = str[ 0 ];
	x2 = str[ 1 ];

	if ( str.length === 2 ) {
		inc = 1;
	} else {
		inc = parseInt( str[ 2 ], 10 );
	}
	// Handle zero increment...
	if ( inc === 0 ) {
		throw new Error( 'indexspace()::invalid syntax. Increment must be an integer not equal to 0. Value: `' + inc + '`.' );
	}

	// START //

	// Handle use of 'end' keyword...
	if ( reEnd.test( x1 ) ) {
		tmp = x1.match( reMatch );
		if ( tmp ) {
			if ( tmp[ 1 ] === '-' ) {
				x1 = len - 1 - parseInt( tmp[ 2 ], 10 );
				if ( x1 < 0 ) {
					// WARNING: forgive the user for exceeding the range bounds...
					x1 = 0;
				}
			} else {
				x1 = (len-1) / parseInt( tmp[ 2 ], 10 );
				x1 = Math.ceil( x1 );
			}
		} else {
			x1 = len - 1;
		}
	} else {
		x1 = parseInt( x1, 10 );

		// Handle empty index...
		if ( x1 !== x1 ) {
			// :-?\d*:-?\d+
			if ( inc < 0 ) {
				// Max index:
				x1 = len - 1;
			} else {
				// Min index:
				x1 = 0;
			}
		}
		// Handle negative index...
		else if ( x1 < 0 ) {
			x1 = len + x1; // len-x1
			if ( x1 < 0 ) {
				// WARNING: forgive the user for exceeding index bounds...
				x1 = 0;
			}
		}
		// Handle exceeding bounds...
		else if ( x1 >= len ) {
			return [];
		}
	}

	// END //

	// NOTE: here, we determine an inclusive `end` value; i.e., the last acceptable index value.

	// Handle use of 'end' keyword...
	if ( reEnd.test( x2 ) ) {
		tmp = x2.match( reMatch );
		if ( tmp ) {
			if ( tmp[ 1 ] === '-' ) {
				x2 = len - 1 - parseInt( tmp[ 2 ], 10 );
				if ( x2 < 0 ) {
					// WARNING: forgive the user for exceeding the range bounds...
					x2 = 0;
				}
			} else {
				x2 = (len-1) / parseInt( tmp[ 2 ], 10 );
				x2 = Math.ceil( x2 ) - 1;
			}
		} else {
			x2 = len - 1;
		}
	} else {
		x2 = parseInt( x2, 10 );

		// Handle empty index...
		if ( x2 !== x2 ) {
			// -?\d*::-?\d+
			if ( inc < 0 ) {
				// Min index:
				x2 = 0;
			} else {
				// Max index:
				x2 = len - 1;
			}
		}
		// Handle negative index...
		else if ( x2 < 0 ) {
			x2 = len + x2; // len-x2
			if ( x2 < 0 ) {
				// WARNING: forgive the user for exceeding index bounds...
				x2 = 0;
			}
			if ( inc > 0 ) {
				x2 = x2 - 1;
			}
		}
		// Handle positive index...
		else {
			if ( inc < 0 ) {
				x2 = x2 + 1;
			}
			else if ( x2 >= len ) {
				x2 = len - 1;
			}
			else {
				x2 = x2 - 1;
			}
		}
	}

	// INDICES //

	arr = [];
	if ( inc < 0 ) {
		if ( x2 > x1 ) {
			return arr;
		}
		while ( x1 >= x2 ) {
			arr.push( x1 );
			x1 += inc;
		}
	} else {
		if ( x1 > x2 ) {
			return arr;
		}
		while ( x1 <= x2 ) {
			arr.push( x1 );
			x1 += inc;
		}
	}
	return arr;
} // end FUNCTION indexspace()


// EXPORTS //

module.exports = indexspace;
