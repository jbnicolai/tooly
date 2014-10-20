tooly.Timer.prototype = {
  
  /**
   * Start the timer
   *
   * @memberOf  tooly.Timer
   * @instance
   * @category Timer
   */
  start: function() { 
    this.startTime = Date.now(); 
  },

  /**
   * Stop the timer
   * 
   * @return {Number} the time elapsed in milliseconds
   *
   * @memberOf  tooly.Timer
   * @instance
   * @category Timer
   */
  stop: function() { 
    this.endTime = Date.now();
    this.elapsed = this.endTime - this.startTime;
    return this.elapsed;
  },

  /**
   * Stop the timer and log the results to the console.
   * Equivalent of calling #stop then #log
   * 
   * @return {Number} the time elapsed in milliseconds
   *
   * @memberOf  tooly.Timer
   * @instance
   * @category Timer
   */
  end: function() {
    this.stop();
    this.log();
    return this.elapsed;
  },

  /**
   * log results to the console
   *
   * @memberOf  tooly.Timer
   * @instance
   * @category Timer
   */
  log: function() {
    console.log(this.name + ' ' + this.elapsed);
  }
};
