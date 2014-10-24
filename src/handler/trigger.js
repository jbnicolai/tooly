/**
 * alias for #executeHandler
 * 
 * @ignore
 * @memberOf  tooly.Handler
 * @instance
 */
tooly.Handler.trigger = function(fn) {
  return this.executeHandler(fn);
};
