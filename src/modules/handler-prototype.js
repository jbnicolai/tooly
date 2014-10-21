_extend(tooly.Handler.prototype, {

  /**
   * Register an event handler for a named function.
   * 
   * @param  {(String|Function)} fn   the function that will call the handler when executed
   * @param  {callback}   handler the handler that we be called by the named function
   * @return {Object} `this` for chaining
   * 
   * @memberOf  tooly.Handler
   * @instance
   */
  on: function(fn, handler) {
    if (this.handlers[fn] === undefined) {
      this.handlers[fn] = [];
    }
    this.handlers[fn].push(handler);
    return this;
  },

  /**
   * Remove all handlers. Any subsequent call to #executeHandler will have no effect.
   *
   * @memberOf  tooly.Handler
   * @instance
   */
  removeAll: function() {
    this.handlers = {};
  },

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
  remove: function(fn) {
    if (this.handlers[fn] !== undefined) {
      this.handlers[fn].length = 0;
    }
  },

  /**
   * executes all handlers attached to the named function.
   * @example
   * var value = 0;
   * var handler = new tooly.Handler();
   * 
   * function inc() { 
   *   value += 10; 
   *   handler.executeHandler('inc');
   * }
   * 
   * function jump() {
   *   this.value *= 2;
   * }
   *
   * handler.on('inc', announce);
   * inc();
   * value; //=> 20;
   * 
   * @param  {(String|Object)} fn the name of the method to execute
   * @return {Object} `this` for chaining
   * 
   * @memberOf  tooly.Handler
   * @instance
   * @alias #exec #trigger
   */
  executeHandler: function(fn) {
    var handler = this.handlers[fn] || [],
        i = 0, len = handler.length;
    for (; i < len; i++) {
      handler[i].apply(this.context, []);
    }
    return this;
  },

  /**
   * alias for #executeHandler
   * 
   * @ignore
   * @memberOf  tooly.Handler
   * @instance
   */
  trigger: function(fn) {
    return this.executeHandler(fn);
  },

  /**
   * Add callbacks to the list of handlers. The callbacks must be an object collection of 
   * key-value pairs where the identifier key is the name of a function that calls the 
   * `executeHandler` method with the same name as the key, while the value is the callback 
   * function itself. This method should not be used if only registering a single callback, 
   * for that use {@link #on}.
   * 
   * @param  {Object} handlers  collection of callback functions
   * @return {Object} `this` for chaining
   * 
   * @memberOf  tooly.Handler
   * @instance
   */
  registerCallbacks: function(callbacks) {
    var t = this, h = {};
    if (callbacks !== undefined) {
      for (h in callbacks) {
        if (callbacks.hasOwnProperty(h)) {
          t.on(h, callbacks[h]);
        }
      }
    }
    return t;
  },

  /**
   * @return {String}
   * @memberOf  tooly.Handler
   * @instance
   */
  toString: function() { 
    return "[Handler ' " + this + " ']"; 
  }
});
