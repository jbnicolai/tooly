/**
 * Opposite of `isFalsy`.
 * 
 * @param  {mixed}  obj the object to check
 * @return {Boolean}     true if `obj` is "truthy"
 *
 * @alias #truthy
 * @see  #isFalsy
 * @memberOf tooly
 * @category Object
 * @static
 */
tooly.isTruthy = function(obj) {
  return !isFalsy(obj);
};
