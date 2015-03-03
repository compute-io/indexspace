'use strict';

var indexspace = require( './../lib' );

var arr = indexspace( '[:]', 5 );
console.log( '[:]' );
console.log( arr );
// returns [ 1, 2, 3, 4 ];

arr = indexspace( '[2:]', 5 );
console.log( '[2:]' );
console.log( arr );
// returns [ 2, 3, 4 ]

arr = indexspace( '[:3]', 5 );
console.log( '[:3]' );
console.log( arr );
// returns [ 0, 1, 2 ]

arr = indexspace( '[2:4]', 5 );
console.log( '[2:4]' );
console.log( arr );
// returns [ 2, 3 ]

arr = indexspace( '[1:4:2]', 5 );
console.log( '[1:4:2]' );
console.log( arr );
// returns [ 1, 3 ]

arr = indexspace( '[2::2]', 5 );
console.log( '[2::2]' );
console.log( arr );
// returns [ 2, 4 ]

arr =  indexspace( '[:10:3]', 20 );
console.log( '[:10:3]' );
console.log( arr );
// returns [ 0, 3, 6, 9 ]

arr = indexspace( '[:-1:2]', 5 );
console.log( '[:-1:2]' );
console.log( arr );
// returns [ 0, 2 ]

arr = indexspace( '[-4:-1:2]', 5 );
console.log( '[-4:-1:2]' );
console.log( arr );
// returns [ 1, 3 ]

arr = indexspace( '[-5:-1]', 5 );
console.log( '[-5:-1]' );
console.log( arr );
// returns [ 0, 1, 2, 3 ]

arr = indexspace( '[::-1]', 5 );
console.log( '[::-1]' );
console.log( arr );
// returns [ 4, 3, 2, 1, 0 ]

arr = indexspace( '[:0:-1]', 5 );
console.log( '[:0:-1]' );
console.log( arr );
// returns [ 4, 3, 2, 1 ]

arr = indexspace( '[3:0:-1]', 5 );
console.log( '[3:0:-1]' );
console.log( arr );
// returns [ 3, 2, 1 ]

arr = indexspace( '[-1:-4:-2]', 5 );
console.log( '[-1:-4:-2]' );
console.log( arr );
// returns [ 3, 1 ]
