


/**
 * Delete all properties from collection.
 * 
 * @param {Object|Array} el the array or object to initialize
 * @return {Object} `tooly` for chaining
 * 
 * @memberOf tooly
 * @category  Collections
 * @static
 */
tooly.empty = function(el) {
  if (_type(el) === 'object') {
    _each(el, function(v, k) { delete el[k]; });
    return tooly;
  }
  while (el.length) el.pop();
  return tooly;
};