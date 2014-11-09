


/**
 * alias for [#executeHandler](`#executeHandler`)
 *
 * @alias #executeHandler
 * @memberOf  tooly.Handler
 * @category  Handler
 * @instance
 */
tooly.Handler.prototype.trigger = function(fn) {
  return this.executeHandler(fn);
};
