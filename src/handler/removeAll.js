


/**
 * Remove all handlers. Any subsequent call to `#executeHandler` will have no effect.
 *
 * @memberOf  tooly.Handler
 * @category  Handler
 * @instance
 */
tooly.Handler.prototype.removeAll = function() {
  this.handlers = {};
};
