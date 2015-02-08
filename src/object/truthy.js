


/**
 * Opposite of `falsy`.
 * 
 * @param  {mixed}  obj the object to check
 * @return {Boolean}     true if `obj` is "truthy"
 *
 * @alias #isTruthy
 * @see  #falsy
 * @memberOf tooly
 * @category Object
 * @static
 */
tooly.truthy = tooly.isTruthy = function(obj) {
  return !tooly.isFalsy(obj);
};
