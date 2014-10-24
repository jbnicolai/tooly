/**
 * Remove all handler's attached to `fn`. All subsequent calls to 
 * `executeHandler(fn)` will no longer have an effect.
 * 
 * @param  {Function} fn the named function that executes handler(s)
 * 
 * @memberOf  tooly.Handler
 * @instance
 * @alias #off
 */
tooly.Handler.remove = function(fn) {
  if (this.handlers[fn] !== undefined) {
    this.handlers[fn].length = 0;
  }
};
