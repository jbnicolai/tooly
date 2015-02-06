


/**
 * Execute `fn` for each index in the set of matched elements. The value of `this`
 * inside the function will be the raw node.
 * 
 * @param  {Function} fn the function with signature `fn(index)`
 * @return {this}
 *
 * @memberOf  tooly.Frankie
 * @category  Frankie
 * @instance 
 */
tooly.Frankie.prototype.each = function(fn) {
  var i = 0, len = this.els.length;
  for (; i < len; i++) fn.call(this.els[i], i);
  return this;
};
