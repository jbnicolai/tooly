


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
    return _type(args) === 'array' ? ctor.apply(this, args) : ctor.call(this, args);
  }
  F.prototype = ctor.prototype;
  return new F();
};
