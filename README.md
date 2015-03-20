indexspace
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Generates a linearly spaced index array from a subsequence string.


## Installation

``` bash
$ npm install compute-indexspace
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var indexspace = require( 'compute-indexspace' );
```

#### indexspace( str, len )

Generates a linearly spaced index `array` from a subsequence `string`. `len` specifies the reference `array` length, which is needed to properly interpret the subsequence `string`. If `len = 0`, the function returns an empty `array`.

``` javascript
var arr = indexspace( ':', 5 );
// returns [ 0, 1, 2, 3, 4 ]

arr = indexspace( ':', 0 );
// returns []
```

The subsequence `string` syntax is similar to Python's [slice](https://docs.python.org/2/tutorial/introduction.html) notation.

``` javascript
var str = '<start>:<stop>:<increment>';
```

Notes about the notation:
* 	If an `increment` is not specified, the default increment is `1`. An `increment` of zero is __not__ allowed.
*	The `start` index is __inclusive__, while the `stop` index is __exclusive__.
* 	Both `start` and `stop` indices are *optional*. If not provided, `start` and `stop` default to index extremes.
* 	Both `start` and `stop` can be negative, in which case the index is subtracted from `len`.

``` javascript
var arr = indexspace( '-3:', 5 );
// returns [ 2, 3, 4 ];

arr = indexspace( ':-2', 5 );
// returns [ 0, 1, 2 ]
```

The function also recognizes the `end` keyword, which refers to the last index; i.e., `len-1`. If specified as the `stop` index, `end` is __inclusive__ and equivalent to `<start>::<increment>`.

``` javascript
var arr = indexspace( 'end::-1', 5 );
// returns [ 4, 3, 2, 1, 0 ]

arr = indexspace( ':end', 5 );
// returns [ 0, 1, 2, 3, 4 ]
```

Basic arithmetic (subtraction and division) may be performed on the `end` keyword. The result from division is __rounded up__ to the next integer.

``` javascript
var arr = indexspace( 'end-2::-1', 5 );
// returns [ 2, 1, 0 ];

arr = indexspace( ':end/2', 5 );
// returns [ 0, 1 ]

arr = indexspace( 'end/2:', 5 );
// returns [ 2, 3, 4 ]

arr = indexspace( 'end/3::-1', 5 );
// returns [ 2, 1, 0 ];

arr = indexspace( '1:end:2', 5 );
// returns [ 1, 3 ];
```



__Note__: unlike Matlab, but like Python, the subsequence `string` is upper-bound __exclusive__. For example, in Python, `0:2` corresponds to the index array `[0,1]`. In Matlab, `1:3` corresponds to `[1,2,3]`.

This implementation chooses to follow the Python convention such that `:n` combined with `n:` is equivalent to `:`. Using the Matlab convention, the two subsequences would overlap by one element.




## Examples

``` javascript
var indexspace = require( 'compute-indexspace' );

var arr = indexspace( ':', 5 );
// returns [ 0, 1, 2, 3, 4 ] 

arr = indexspace( '2:', 5 );
// returns [ 2, 3, 4 ]

arr = indexspace( ':3', 5 );
// returns [ 0, 1, 2 ]

arr = indexspace( '2:4', 5 );
// returns [ 2, 3 ]

arr = indexspace( '1:4:2', 5 );
// returns [ 1, 3 ]

arr = indexspace( '2::2', 5 );
// returns [ 2, 4 ]

arr =  indexspace( ':10:3', 20 );
// returns [ 0, 3, 6, 9 ]

arr = indexspace( ':-2', 5 );
// returns [ 0, 1, 2 ]

arr = indexspace( ':-1:2', 5 );
// returns [ 0, 2 ]

arr = indexspace( '-4:-1:2', 5 );
// returns [ 1, 3 ]

arr = indexspace( '-5:-1', 5 );
// returns [ 0, 1, 2, 3 ]

arr = indexspace( '::-1', 5 );
// returns [ 4, 3, 2, 1, 0 ]

arr = indexspace( ':0:-1', 5 );
// returns [ 4, 3, 2, 1 ]

arr = indexspace( '3:0:-1', 5 );
// returns [ 3, 2, 1 ]

arr = indexspace( '-1:-4:-2', 5 );
// returns [ 4, 2 ]

arr = indexspace( ':end', 5 );
// returns [ 0, 1, 2, 3, 4 ]

arr = indexspace( ':end-1', 5 );
// returns [ 0, 1, 2, 3 ]

arr = indexspace( ':end/2', 5 );
// returns [ 0, 1 ]

arr = indexspace( 'end-2::-1', 5 );
// returns [ 2, 1, 0 ]

arr = indexspace( 'end/2:', 5 );
// returns [ 2, 3, 4 ]
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Notes

The motivation for this module stems from wanting to create an API for `arrays` similar to Python and Matlab; e.g., `A = B[1:6:2];`. JavaScript only supports basic indexing; e.g., `A = B[3];`.

The workaround provided by this module is to express the subsequence syntax as a `string`, which, when provided with a reference `array` length, is parsed and then converted into an index `array`. A consumer can then iterate through the index `array` to extract the desired elements.

``` javascript
var indexspace = require( 'compute-indexspace' );

// Create an array...
var len = 10,
	arr;

arr = new Array( len );
for ( var i = 0; i < len; i++ ) {
	arr[ i ] = i;
}

// Create an index array...
var idx = indexspace( '::-1', len );

// From the original array, create a reversed array...
var rev = new Array( len );
for ( var j = 0; j < len; j++ ) {
	rev[ j ] = arr[ idx[j] ];
}
console.log( arr.join( ',' ) );
console.log( rev.join( ',' ) );
```




## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT). 


## Copyright

Copyright &copy; 2015. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/compute-indexspace.svg
[npm-url]: https://npmjs.org/package/compute-indexspace

[travis-image]: http://img.shields.io/travis/compute-io/indexspace/master.svg
[travis-url]: https://travis-ci.org/compute-io/indexspace

[coveralls-image]: https://img.shields.io/coveralls/compute-io/indexspace/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/indexspace?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/indexspace.svg
[dependencies-url]: https://david-dm.org/compute-io/indexspace

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/indexspace.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/indexspace

[github-issues-image]: http://img.shields.io/github/issues/compute-io/indexspace.svg
[github-issues-url]: https://github.com/compute-io/indexspace/issues
