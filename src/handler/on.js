


/**
 * Register an event handler for a named function.
 * 
 * @param  {String} fn  the name of the function that will call the handler when executed
 * @param  {callback}   handler the handler that we be called by the named function
 * @return {Object} `this` for chaining
 * 
 * @memberOf  tooly.Handler
 * @category  Handler
 * @instance
 */
tooly.Handler.prototype.on = function(fn, handler) {
  if (this.handlers[fn] === undefined) {
    this.handlers[fn] = [];
  }
  this.handlers[fn].push(handler);
  return this;
};
