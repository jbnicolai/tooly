/**
 * Stop the timer
 * 
 * @return {Number} the time elapsed in milliseconds
 *
 * @memberOf  tooly.Timer
 * @instance
 * @category Timer
 */
tooly.stop = function() { 
  this.endTime = Date.now();
  this.elapsed = this.endTime - this.startTime;
  return this.elapsed;
};
