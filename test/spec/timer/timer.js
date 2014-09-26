function Timer(name) {
  // enable instantiation without new
  if (!(this instanceof Timer)) {
    return new Timer(name);
  }
  this.name = name || 'Timer_instance_' + Date.now(); 
}

Timer.prototype = (function() {

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
    }
  }
})();

var timer = new Timer('theTimer');
timer.start();
for (var i = 0; i < 100; i++) {
  var j = Math.pow(i, 3);
}
timer.stop();
