


/**
 * Add callbacks to the list of handlers. The callbacks must be an object collection of 
 * key-value pairs where the identifier key is the name of a function that calls the 
 * `#executeHandler` method with the same name as the key, while the value is the callback 
 * function itself. This method should not be used if only registering a single callback, 
 * for that use [#on](#on).
 * 
 * @param  {Object} handlers  collection of callback functions
 * @return {this}
 * 
 * @memberOf  tooly.Handler
 * @category  Handler
 * @instance
 */
tooly.Handler.prototype.registerCallbacks = function(callbacks) {
  var t = this, h = {};
  if (callbacks !== undefined) {
    for (h in callbacks) {
      if (callbacks.hasOwnProperty(h)) {
        t.on(h, callbacks[h]);
      }
    }
  }
  return t;
};
