


/**
 * Construct an instance of an object from a given constructor.
 * The remaining arguments, if any, will be applied to the given constructor.
 *
 * @example
 * ```js
 * tooly.construct(Array);          //=> []
 * tooly.construct(Array, 3);       //=> [ , ,  ]
 * tooly.construct(Array, 1, 2, 3); //=> [ 1, 2, 3 ]
 * ```
 * 
 * @param  {Function} ctor
 * @return {Object}
 *
 * @memberOf  tooly
 * @category  Object
 * @static
 */
tooly.construct = function(ctor) {
  var args = arguments,
      len = args.length;
  function F() {
    if (len > 2)  {
      return ctor.apply(this, _slice.call(args, 1));
    } else if (len === 2) {
      return ctor.call(this, args[1]);
    }
    return ctor.call(this);
  }
  F.prototype = ctor.prototype;
  return new F();
};