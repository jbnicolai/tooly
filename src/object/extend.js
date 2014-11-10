


/**
 * Add the "own properties" of `src` to `dest`.
 * Used throughout the application to add prototype
 * methods to tooly classes without
 * assigning Object as their prototype.
 *
 * @param  {Object} dest the destination object
 * @param  {Object} src  the source object
 * @return {Object}      `dest`
 *
 * @category  Object
 * @memberOf tooly
 * @static
 */
tooly.extend = function(dest, src) {
  var sources = _slice.call(arguments),
      target = sources.shift();
  target = target || {};
  _each(sources, function(source) {
    for (var prop in source) {
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
