


/**
 * Add the "own properties" of `src` to `dest`. Mutliple src 
 * arguments can be supplied (ie. `tooly.extend({}, src1, src2, src3))`.
 *
 * @param  {Object} dest the destination object
 * @param  {Object} src  the source object
 * @return {Object} `dest`
 *
 * @category  Object
 * @memberOf tooly
 * @static
 */
tooly.extend = function(dest, src) {
  var sources = _slice.call(arguments),
      target = sources.shift(),
      prop;
  target = target || {};
  _each(sources, function(source) {
    for (prop in source) {
      if (source.hasOwnProperty(prop)) {
        if (_type(source[prop]) === 'object') {
          target[prop] = tooly.extend(target[prop], source[prop]);
        } else {
          target[prop] = source[prop];
        }
      }
    }
  });
  return target;
};
