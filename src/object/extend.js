


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
 * @category  Core
 * @memberOf tooly
 * @static
 */
tooly.extend = function(dest, src) {
  return _extend(dest, src);
};
