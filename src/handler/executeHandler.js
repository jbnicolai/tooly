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
tooly.Handler.executeHandler = function(fn) {
  var handler = this.handlers[fn] || [],
      i = 0, len = handler.length;
  for (; i < len; i++) {
    handler[i].apply(this.context, []);
  }
  return this;
};
