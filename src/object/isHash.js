/**
 * port of is.hash
 *
 * Test if `value` is a hash - a plain object literal.
 *
 * @param {Mixed} value value to test
 * @return {Boolean} true if `value` is a hash, false otherwise
 *
 * @see https://github.com/enricomarino/is/blob/master/index.js
 * @author Enrico Marino (with minor edits)
 *
 * @memberOf  tooly
 * @category  Object
 * @static
 */
tooly.isHash = function(val) {
  return _type(val, 'object') && val.constructor === Object && 
    !val.nodeType && !val.setInterval;
};
