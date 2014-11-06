


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
  function __SurrogateConstructor() {
    return (_type(args) === 'array')
      ? ctor.apply(this, args)
      : ctor.call(this, args);
  }
  __SurrogateConstructor.prototype = ctor.prototype;
  return new __SurrogateConstructor();
};
