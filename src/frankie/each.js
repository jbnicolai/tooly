


/**
 * execute fn for each index and element
 * 
 * @param  {Function} fn the function with signature `fn(index, element)`
 * @return {this} 
 */
tooly.Frankie.prototype.each = function(fn) {
  var i = 0, len = this.els.length;
  for (; i < len; i++) fn(i, this.els[i]);
  return this;
};
