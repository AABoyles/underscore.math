// *`Math`, but Better.*
//
// bettermath is a browser- and node- compatible javascript module for a variety
// of useful numerical computations on arrays of numbers.

'use strict';

(function(){

  // It's designed to work seamlessly as a mixin with the standard
  // [`Math`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math)
  // object, However, I know that messing with standard globals makes some
  // people sick to their stomachs, so it doesn't do it automatically.
  //
  // If you're using it in the browser, you can access it from the `math`
  // global ([sorry](http://wiki.c2.com/?GlobalVariablesAreBad)). (Note the
  // lower-case 'm').

  var math = {};

  // It you're working in [node](http://nodejs.com), you can `require` it into
  // whatever you want.

  //## Helper Functions

  //### isArray
  // Determines if a given object is an array.
  math.isArray = function(obj){
    if(Array.isArray) return Array.isArray(obj);
    return variable.constructor === Array;
  };

  //### isObject
  // Determines if a given object is an object.
  math.isObject = function(obj){
    return obj === Object(obj);
  };

  //### Pluck
  // Returns an array of numbers.
  math.pluck = function(obj, key){
    var arr = obj;
    if(math.isArray(obj)){
      if(math.isObject(obj[0])){
        var key = key || 'value';
        var arr = obj.map(i => i[key]);
      }
    }
    return arr;
  };

  //## Mappers
  // Mapper functions accept a single argument (which may be an array of numbers
  // or objects), and return an object of roughly similar type and size.
  // For example, passing a number to a mapper should result in a number.
  // Passing an array of `n` numbers should (in most cases) return an array of
  // `n` numbers.
  //
  // Note that these will also generally work with arrays of objects, provided
  // you pass a 'key' argument indicating the key in the object which you wish
  // to operate on.

  //### isUndefined
  // Determines if a given object is undefined.
  math.isUndefined = function(obj, key){
    if(math.isArray(obj)){
      return math.pluck(obj, key).map(math.isUndefined);
    }
    return typeof obj === 'undefined';
  };

  //### isNumber
  // Determines if a given object is a number
  math.isNumber = function(obj, key){
    if(math.isArray(obj)){
      return math.pluck(obj, key).map(math.isNumber);
    }
    return typeof obj === 'number';
  };

  //### isNaN
  // Determines if a given object is [Not a Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN)
  math.isNaN = function(obj){
    if(math.isArray(obj)){
      return math.pluck(obj, key).map(math.isNaN);
    }
    return math.isNumber(obj) && obj !== +obj;
  };

  //### isInteger
  // Determines if a given object is an integer
  math.isInteger = function(obj, key){
    if(math.isArray(obj)){
      return math.pluck(obj, key).map(math.isInteger);
    }
    return Number.isInteger(obj);
  };

  //### isPositive
  // Determines whether a number is positive
  math.isPositive = function(obj, key){
    if(math.isArray(obj)){
      return math.pluck(obj, key).map(math.isPositive);
    }
    return obj > 0;
  };

  //### isNegative
  // Determines whether a number is negative
  math.isNegative = function(obj, key){
    if(math.isArray(obj)){
      return math.pluck(obj, key).map(math.isNegative);
    }
    return obj < 0;
  };

  math.isNonnegative = function(obj, key){
    if(math.isArray(obj)){
      return math.pluck(obj, key).map(math.isNonnegative);
    }
    return obj >= 0;
  };

  math.isNonpositive = function(obj, key){
    if(math.isArray(obj)){
      return math.pluck(obj, key).map(math.isNonpositive);
    }
    return obj <= 0;
  };

  //### isZero
  // Determines whether a number is Zero
  math.isZero = function(obj, key){
    if(math.isArray(obj)){
      return math.pluck(obj, key).map(math.isZero);
    }
    return obj === 0;
  };

  //### isFinite
  // Determines whether a number is finite
  math.isFinite = function(obj, key){
    if(math.isArray(obj)){
      return math.pluck(obj, key).map(math.isFinite);
    }
    return Number.isFinite(obj);
  };

  //### isInfinite
  // Determines whether a number is positive
  math.isInfinite = function(obj, key){
    if(math.isArray(obj)){
      return math.pluck(obj, key).map(math.isInfinite);
    }
    return !math.isFinite(obj);
  };

  //### isEven
  // Determines whether a number is even.
  math.isEven = function(obj, key){
    if(math.isArray(obj)){
      return math.pluck(obj, key).map(math.isEven);
    }
    return obj % 2 === 0;
  };

  //### isOdd
  // Returns a boolean indicating whether a number n is odd.
  math.isOdd = function(obj, key){
    if(math.isArray(obj)){
      return math.pluck(obj, key).map(math.isOdd);
    }
    return obj % 2 === 1;
  };

  //### isPrime
  // Returns a boolean variable indicating whether a number n is prime.
  //
  // *Note* that for a numeric input, n, this is O(sqrt(n)).
  // For arrays of size m, it's O(m*sqrt(n)).
  // It isn't the most efficient possible implementation, but it's reasonably
  // simple.
  math.isPrime = function(obj, key){
    if(math.isNumber(obj)){
      if(math.isArray(obj)){
        return math.pluck(obj, key).map(math.isPrime);
      }
      var safeN = Math.abs(Math.round(obj));
      if (!obj){
        return false;
      } else if (obj !== 2){
        var goUntil = Math.ceil(Math.sqrt(safeN));
        for (var i = 2; i <= goUntil; i++){
          if (safeN % i === 0){
            return false;
          }
        }
      }
      return true;
    }
  };

  //### isComposite
  // Returns a boolean variable indicating whether a number n is composite.
  //
  // *Note* that for a numeric input, n, this is O(sqrt(n)).
  // For arrays of size m, it's O(m*sqrt(n)).
  // It isn't the most efficient possible implementation, but it's reasonably
  // simple.
  math.isComposite = function(obj, key){
    if(math.isArray(obj)){
      return math.pluck(obj, key).map(math.isComposite);
    }
    return !math.isPrime(obj);
  };

  //### sign
  // Returns one of [-1,0,1], indicating whether the given obj is negative,
  // zero, or positive
  var origSign = Math.sign;
  math.sign = function(obj, key){
    if(math.isArray(obj)){
      return math.pluck(obj, key).map(math.sign);
    }
    return origSign(obj);
  };

  //### abs
  // Returns the absolute value of a number.
  var origAbs = Math.abs;
  math.abs = function(obj, key){
    if(math.isNumber(obj)){
      return origAbs(obj);
    }
    if(math.isArray(obj)){
      return math.pluck(obj, key).map(math.abs);
    }
  };

  //### square
  // Multiplies a number by itself.
  math.square = function(obj, key){
    return math.pow(math.pluck(obj, key), 2);
  };

  //### cube
  // Multiplies a number by its square.
  math.cube = function(obj, key){
    return math.pow(math.pluck(obj, key), 3);
  };

  //### pow
  // Given a number and an exponent, returns the number raised to the exponent.
  //
  // Given an array of numbers, along with an exponent, returns an array for
  // which each entry is the corresponding value of the original array raised
  // to that exponent.
  //
  //**WARNING! Overwrites `Math.pow` when mixed with Math**
  //
  // This should be safe to do, but if you encounter any issues doing so,
  // please [let me know.](https://github.com/AABoyles/bettermath/issues)
  //
  // `math.pow(2,3)` &rArr; 8
  var origPow = Math.pow; //Just in case we want to extend Math
  math.pow = function(obj, n){
    if(math.isArray(obj)){
      return obj.map(i => math.pow(i, n));
    }
    return origPow(obj, n);
  };

  //### sqrt
  // Given a number, computes the Square Root
  math.sqrt = function(obj, key){
    if(math.isArray(obj)){
      return math.pluck(obj, key).map(math.sqrt);
    }
    return Math.sqrt(obj);
  };

  //### cbrt
  // Given a number, computes the Cube Root
  math.cbrt = function(obj, key){
    if(math.isArray(obj)){
      return math.pluck(obj, key).map(math.cbrt);
    }
    return Math.cbrt(obj);
  };

  //### factorial
  // Given a number, computes the factorial.
  //
  // Given an array of numbers, computes the factorial of each.
  math.factorial = function(obj, key){
    if(math.isArray(obj)){
      return math.pluck(obj, key).map(math.factorial);
    }
    if (obj < 0){
      return Infinity;
    } else if (obj === 0){
      return 1;
    } else {
      return math.product(math.range(obj));
    }
  };

  //### scale
  // Transforms an array to fit within the range [min, max], such that the
  // ratios between any two elements are maintained.
  //
  // `math.scale([0, 2, 5, 10])` &rArr; [0, 0.2, 0.5, 1]
  math.scale = function(arr, min, max){
    if(math.isUndefined(min)) min = 0;
    if(math.isUndefined(max)) max = 1;
    var minArr = Math.min(...arr);
    var oldRange = Math.max(...arr) - minArr;
    var newRange = max - min;
    return arr.map(i => (i - minArr) / oldRange * newRange + min);
  };

  //### sameSign
  // Compares the signs of two values
  math.sameSign = function(obj, b){
    if(math.isArray(obj)){
      return obj.map(i => math.sameSign(i, b));
    }
    return (obj >= 0) !== (b < 0);
  };

  //### copySign
  // Copies the sign of y onto x
  math.copySign = function(obj, b){
    if(math.isArray(obj)){
      return obj.map(i => math.copysign(i, b));
    }
    return math.samesign(obj, b) ? obj : -obj;
  };

  //### undirected Edges
  // Given an undirected graph of n nodes, what is the upper bound on the number
  // of distinct edges?
  math.undirectedEdges = function(obj, key){
    if(math.isArray(obj)){
      return math.pluck(obj, key).map(math.undirectedEdges);
    }
    return n * (n - 1) / 2;
  };

  //### factors
  // Returns an array of the factors of a number, n
  math.factors = function(obj){
    if(math.isArray(obj)){
      obj.map(math.factors);
    }
    var result = [],
        startN = Math.abs(Math.round(obj)),
        finished = false;
    while(!finished){
      finished = true;
      for (var i = 2; i <= startN / 2; i++){
        if (obj % i === 0){
          obj /= i;
          result.push(i);
          finished = false;
          break;
        }
      }
    }
    if (result.length === 0){
      result.push(startN);
    }
    return result;
  };

  //### divisors
  // Returns an array of the divisors of a number n
  math.divisors = function(obj){
    if(math.isArray(obj)){
      return obj.map(math.divisors);
    }
    var safeN = Math.abs(Math.round(obj));
    var result = [1];
    for(var i = 2; i <= safeN / 2; i++){
      if(safeN % i === 0){
        result.push(i);
      }
    }
    return result;
  };

  //### between
  // Returns a boolean indicating whether a number x is between two others
  // numbers, a and b.
  math.between = function (obj, a, b){
    if(math.isArray(obj)){
      return obj.map((i) => math.between(i));
    }
    return (a<=obj && obj<=b) || (b<=obj && obj<=a);
  };

  //### format
  // Truncates a number n at the given precision
  //
  // *Note* that the necessity of the precision argument prevents passing a key,
  // meaning that in order to use this on an array of objects, you must pluck it
  // before you pass it. For example:
  //
  // `math.format([{a:1.234}, {a:2.345}], 2)` &rArr; Error
  //
  // `var t = math.pluck([{a:1.234}, {a:2.345}], 'a'); math.format(t, 2);` &rArr;
  math.format = function(obj, precision){
    if(math.isArray(obj)){
      return obj.map(i => math.format(i, precision));
    }
    return (obj.toFixed(precision))/1;
  };

  //### Sort
  // Sorts an array of numbers.
  //
  // `math.sort([3,1,2])` &rArr; [1,2,3]
  math.sort = function(obj, descending){
    if(descending){
      return obj.sort((a, b) => b - a);
    } else {
      return obj.sort((a, b) => a - b);
    }
  };

  //### movingAvg
  // Computes a moving average of an array of numbers.
  //
  // In case this is non-obvious, this should return an array of fewer elements
  // than the original array contained.
  //
  // `math.movingAvg([1,2,3,4,5], 3)` &rArr; [2,3,4]
  math.movingAvg = function(arr, size){
    var win, i, newarr = [];
    for(i = size - 1; i <= arr.length; i++){
      win = arr.slice(i - size, i);
      if (win.length === size){
        newarr.push(math.mean(win));
      }
    }
    return newarr;
  };

  //## Reducers

  //### sum
  // Computes the sum of an array of numbers (or an array of objects with a
  // given `key`).
  //
  //`math.sum([1,2,3]);` &rArr; 6
  //
  //`math.sum([{b: 4},{b: 5},{b: 6}], 'b')` &rArr; 15
  math.sum = math.add = function(obj, key){
    return math.pluck(obj, key).reduce((a, b) => a + b, 0);
  };

  //### product
  // Computes the product of an array of numbers (or an array of objects with a
  // a given `key`).
  //
  // `math.product([1,2,3])` &rArr; 6
  //
  // `math.product([{b: 4},{b: 5},{b: 6}], 'b')` &rArr; 120
  math.product = math.multiply = function(obj, key){
    return math.pluck(obj, key).reduce((a, b) => a * b, 1);
  };

  //### mean
  // Given an array of numbers, returns
  // the [arithmetic mean](https://en.wikipedia.org/wiki/Arithmetic_mean).
  //
  // `math.mean([1,2,3])` &rArr; 2
  math.mean = math.average = function(obj, key){
    var arr = math.pluck(obj, key);
    return math.sum(arr) / arr.length;
  };

  //### median
  // Given an array of numbers, returns
  // the [median](https://en.wikipedia.org/wiki/Median).
  //
  // `math.median([1,2,3,4])` &rArr; 2.5
  math.median = function(obj, key){
    var arr = math.pluck(obj, key);
    var middle = (arr.length + 1) /2;
    var sorted = math.sort(arr.slice());
    return (sorted.length % 2) ? sorted[middle - 1] : (sorted[middle - 1.5] + sorted[middle - 0.5]) / 2;
  };

  //### modes
  // Returns an array of the most frequently recurring value in the input array.
  math.mode = math.modes = function(obj, key){
    var arr = math.pluck(obj, key);

		if (!arr.length) return [];

		var modeMap = {},
		    maxCount = 0,
		    modes = [];

		arr.forEach(val => {
			if (!modeMap[val]){
        modeMap[val] = 1;
      } else {
        modeMap[val]++;
      }
			if (modeMap[val] > maxCount){
				modes = [val];
				maxCount = modeMap[val];
			} else if (modeMap[val] === maxCount){
				modes.push(val);
			}
		});
		return modes;
	};

  //### geometricMean
  // Given an array of numbers, returns
  // the [geomatric mean](https://en.wikipedia.org/wiki/Geometric_mean).
  //
  // `math.geometricMean([3,9,27])` &rArr; 9
  math.geometricMean = function(obj, key){
    var arr = math.pluck(obj, key);
    return Math.pow(math.product(arr),1/arr.length);
  };

  //### Variance
  // Computes the variance of an array of numbers.
  //
  // `math.variance([1,2,3])` &rArr; 2/3
  math.variance = function(arr){
    var mean = math.mean(arr);
    return math.mean(arr.map(x => math.pow(x - mean, 2)));
  };

  //### stdDeviation
  // Computes the Standard Deviation of an array of numbers.
  //
  // `math.stdDeviation([1,2,3])` &rArr; 0.816496580927726
  math.stdDeviation = math.sigma = function(obj, key){
    return Math.sqrt(math.variance(math.pluck(obj, key)));
  };

  //### meanAbsoluteDeviation
  // Computes the mean absolute deviation of an array of numbers.
  //
  // `math.meanAbsoluteDeviation([1,2,3])` &rArr; 1
  math.meanAbsoluteDeviation = function(obj, key){
    var arr = math.pluck(obj, key),
        mean = math.mean(arr);
		return math.mean(arr.map(n => Math.abs(n - mean)));
	};

  //### zscore
  // Computes the standard Z-score, *assuming a normal distribution*
  //
  // `math.zscore([1,2,3])` &rArr; [-1.224744871391589, 0, 1.224744871391589]
  math.zscore = function(obj, key){
    var arr = math.pluck(obj, key),
        mean = math.mean(arr),
        sigma = math.stdDeviation(arr);
    return arr.map(d => (d-mean)/sigma);
  };

  //## Other functions
  // Most of these don't fit with the general paradigm this module is designed
  // for. Accordingly, these should be considered at risk of deprecation.
  // If you need these operation, I'd encourage you to find a more
  // formal and complete module for working with matrices or euclidena geometry
  // or whatever. Never-the-less, I'm leaving them in because it seems some
  // people are using this module and I don't want to push any breaking changes
  // yet.

  //## Binary functions (for two numbers)

  //### gcd
  // Determines the greatest common divisor between two numbers, a and b.
  math.gcd = function(a, b){
    var ref;
    while (b){
      ref = [b, a % b], a = ref[0], b = ref[1];
    }
    return a;
  };

  //### lcm
  // Determines the least common multiple of two numbers, a and b.
  math.lcm = function(a, b){
    return a / math.gcd(a, b) * b;
  };

  //## Trinary functions (for three numbers)

  //### range
  // Given a number, s, range returns an array of integers between 1 and s
  // (inclusive).
  //
  // Given two numbers s and t, range returns an array of integers between t and
  // s (inclusive).
  //
  // Given three numders s, t, and i, range returns an array of integers between
  // t and s such that the difference between each element in the output array
  // is exactly i.
  //
  // Note that this function constitutes an exception to my general deprecation
  // warning above. Having a range function is much to valuable to my purposes
  // to eliminate, even if it doesn't match the general design pattern of the
  // rest of this module.
  math.range = function(stop, start, step){
    start = start || 1;
    step = step || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step){
      range[idx] = start;
    }

    return range;
  };

  //### slope
  // Computes the slope between two ordered pairs.
  //
  // `math.slope([0,0],[1,2])` &rArr; 2
  math.slope = function(a, b){
    return (a[1] - b[1]) / (a[0] - b[0]);
  };

  //### Transpose
  // Computes a transpose of the given matrix.
  //
  //`math.transpose(([1,2,3], [4,5,6], [7,8,9]])` &rArr; [[1,4,7], [2,5,8], [3,6,9]]
  math.transpose = function(arr){
    var trans = [];
    arr.forEach((row, y) => {
      row.forEach((col, x) => {
        if (!trans[x]) trans[x] = [];
        trans[x][y] = col;
      });
    });
    return trans;
  };

  //That's all, folks!

  if(typeof exports !== 'undefined'){
    if(typeof module !== 'undefined' && module.exports){
      exports = module.exports = math;
    }
    exports.math = math;
  } else {
    window.math = math;
  }

}).call(this);
