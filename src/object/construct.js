


/**
 * @param  {Function} ctor
 * @param  {Object|Array} args
 * @return {Object}
 *
 * @memberOf  tooly
 * @category  Object
 * @static
 */
tooly.construct = function(ctor, args) {
  function F() {
    return constructor.apply(this, args);
  }
  F.prototype = constructor.prototype;
  return new F();
};
