


/**
 * Executes all handlers attached to the named function.
 * For `Handler#on(<name>)` to work, `<name>` itself needs to call `#executeHandler`.
 * 
 * ### Example
 * ```js
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
 * ```
 * 
 * @param  {String|Object} fn the name of the function that will announce to attached handlers
 * @return {this}
 *
 * @alias #trigger
 * @memberOf  tooly.Handler
 * @category  Handler
 * @instance
 */
tooly.Handler.prototype.executeHandler = function(fn) {
  var handler = this.handlers[fn] || [],
      i = 0, len = handler.length;
  for (; i < len; i++) {
    handler[i].apply(this.context, []);
  }
  return this;
};
