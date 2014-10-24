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
tooly.end = function() {
  this.stop();
  this.log();
  return this.elapsed;
};
