


/**
 * "funkyTime" - think "Function Execution Time".
 * Get the total, individual, and average execution times of `fn` called `n` times.
 * `fn` will be passed the iteration number as its first argument.
 *
 * @example
 * ```js
 * // setup code
 * var data = [], i = 0, n = 99000;
 * for (; i < n; i++) data.push(Math.random()*(1/3));
 *
 * // run a sort five times
 * var results = funkyTime(function() {
 *   var rndm = data.sort();
 * }, 5);
 *
 * results;
 * // returns something like:
 * // { stack: [ 692, 720, 730, 722, 735 ],
 * //   total: 735,
 * //   average: 147,
 * //   offset: 15.2 }
 * ```
 * 
 * @param  {Function} fn the function that will be timed.
 * @param  {number}   n  the number of times to run the function (defaults to 1)  
 * @return {Object}      a hash of timing results with the following signature:
 * <br>
 * + __stack__ <Array[Number]>: the time of each iteration 
 * + __total__ <Number>: the total of all iterations
 * + __average__ <Number>: the average of all iterations
 * + __offset__ <Number>: the difference between the total time to run 
 * the iteration loop and the sum of all iteration times - basically
 * the loop and Timer overhead.
 * @memberOf  tooly.Timer
 * @static
 * @category Timer
 */
tooly.funkyTime = function(fn, n) {
  var tx = tooly.Timer(),
      ix = tooly.Timer(),
      stack = [],
      i = 0, end, avg;
  n = n || 1;
  tx.start();
  for (; i < n; i++) {
    ix.start();
    fn.call(null, i);
    stack.push(ix.stop());
  }
  end = tx.stop();
  avg = end/n;
  return { 
    stack: stack,
    total: end,
    average: avg,
    offset: (function() {
      var sum = 0;
      stack.forEach(function(x) { sum += x; });
      return parseFloat((end - (sum/n)).toFixed(2));
    })()
  };
};
