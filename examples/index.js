'use strict';

var indexspace = require( './../lib' );

var arr = indexspace( '[:]', 5 );
console.log( '\n[:]' );
console.log( arr );
// returns [ 1, 2, 3, 4 ];

arr = indexspace( '[2:]', 5 );
console.log( '\n[2:]' );
console.log( arr );
// returns [ 2, 3, 4 ]

arr = indexspace( '[:3]', 5 );
console.log( '\n[:3]' );
console.log( arr );
// returns [ 0, 1, 2 ]

arr = indexspace( '[2:4]', 5 );
console.log( '\n[2:4]' );
console.log( arr );
// returns [ 2, 3 ]

arr = indexspace( '[1:4:2]', 5 );
console.log( '\n[1:4:2]' );
console.log( arr );
// returns [ 1, 3 ]

arr = indexspace( '[2::2]', 5 );
console.log( '\n[2::2]' );
console.log( arr );
// returns [ 2, 4 ]

arr =  indexspace( '[:10:3]', 20 );
console.log( '\n[:10:3]' );
console.log( arr );
// returns [ 0, 3, 6, 9 ]

arr = indexspace( '[:-2]', 5 );
console.log( '\n[:-2]' );
console.log( arr );
// returns [ 0, 1 ]

arr = indexspace( '[:-1:2]', 5 );
console.log( '\n[:-1:2]' );
console.log( arr );
// returns [ 0, 2 ]

arr = indexspace( '[-4:-1:2]', 5 );
console.log( '\n[-4:-1:2]' );
console.log( arr );
// returns [ 0, 2 ]

arr = indexspace( '[-5:-1]', 5 );
console.log( '\n[-5:-1]' );
console.log( arr );
// returns [ 0, 1, 2 ]

arr = indexspace( '[::-1]', 5 );
console.log( '\n[::-1]' );
console.log( arr );
// returns [ 4, 3, 2, 1, 0 ]

arr = indexspace( '[:0:-1]', 5 );
console.log( '\n[:0:-1]' );
console.log( arr );
// returns [ 4, 3, 2, 1 ]

arr = indexspace( '[3:0:-1]', 5 );
console.log( '\n[3:0:-1]' );
console.log( arr );
// returns [ 3, 2, 1 ]

arr = indexspace( '[-1:-4:-2]', 5 );
console.log( '\n[-1:-4:-2]' );
console.log( arr );
// returns [ 3, 1 ]

arr = indexspace( '[:end]', 5 );
console.log( '\n[:end]' );
console.log( arr );
// returns [ 0, 1, 2, 3, 4 ]

arr = indexspace( '[:end-1]', 5 );
console.log( '\n[:end-1]' );
console.log( arr );
// returns [ 0, 1, 2, 3 ]

arr = indexspace( '[:end/2]', 5 );
console.log( '\n[:end/2]' );
console.log( arr );
// returns [ 0, 1 ]

arr = indexspace( '[end-2::-1]', 5 );
console.log( '\n[end-2::-1]' );
console.log( arr );
// returns [ 2, 1, 0 ]

arr = indexspace( '[end/2:]', 5 );
console.log( '\n[end/2:]' );
console.log( arr );
// returns [ 2, 3, 4 ]


// Reversing an array...
console.log( '\nReverse an array...\n' );

// Create an array...
var len = 10;

arr = new Array( len );
for ( var i = 0; i < len; i++ ) {
	arr[ i ] = i;
}

// Create an index array...
var idx = indexspace( '[::-1]', len );

// From the original array, create a reversed array...
var rev = new Array( len );
for ( var j = 0; j < len; j++ ) {
	rev[ j ] = arr[ idx[j] ];
}
console.log( arr.join( ',' ) );
console.log( rev.join( ',' ) );
console.log( '\n' );
