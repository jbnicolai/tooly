tooly.Timer.prototype = (function() {

  var _start, _end, _elapsed;

  return {

    /**
     * Start the timer
     *
     * @memberOf  Timer
     * @instance
     * @module Timer
     */
    start: function() { 
      _start = Date.now(); 
    },

    /**
     * Stop the timer
     * 
     * @return {Number} the time elapsed in milliseconds
     *
     * @memberOf  Timer
     * @instance
     * @module Timer
     */
    stop: function() { 
      _end = Date.now();
      _elapsed = _end - _start;
      return _elapsed; 
    },

    /**
     * Stop the timer and log the results to the console.
     * Equivalent of calling #stop then #log
     * 
     * @return {Number} the time elapsed in milliseconds
     *
     * @memberOf  Timer
     * @instance
     * @module Timer
     */
    end: function() {
      this.stop();
      this.log();
      return _elapsed;
    },

    /**
     * log results to the console
     *
     * @memberOf  Timer
     * @instance
     * @module Timer
     */
    log: function() {
      console.log(this.name + ' ' + _elapsed);
    },

    /**
     * "funkyTime" - think "Function Execution Time".
     * Get the total, individual, and average execution times of `fn` called `n` times.
     * funkyTime is a static method, which can be invoked from a Timer instance,
     * or simply bound for convenience - use:
     * `var funkyTime = tooly.Timer.prototype.funkyTime.bind(this);`
     * 
     * @param  {Function} fn the function that will be timed  
     * @param  {number}   n  the number of times to run the function (defaults to 1)  
     * @return {Object}      a hash of timing results with the following signature:
     *                       { stack: <Array[Number]>, // the time of each iteration 
     *                         total: <Number>, // the total of all iterations
     *                         average: <Number>, // the average of all iterations
     *                         offset: <Number> }
     *                         `offset` is the difference between the total time to run 
     *                         the iteration loop and the sum of all iteration times - basically
     *                         the loop and Timer overhead.
     * @memberOf  Timer
     * @static
     * @module Timer
     */
    funkyTime: function(fn, n) {
      var tx = tooly.Timer(),
          ix = tooly.Timer(),
          stack = [],
          i = end = avg = 0;
      n = n || 1;
      tx.start();
      for (; i < n; i++) {
        ix.start();
        fn.call();
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
    }
  }
})();