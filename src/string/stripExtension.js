


/**
 * Get a copy of `str` without file extension, or anything after the last `.`
 * (does not change the original string)
 * 
 * @param  {String} str the string to copy and strip
 * @return {String}     the copied string with file extension removed
 *
 * @alias #stringExt
 * @memberOf tooly
 * @category String
 * @static
 */
tooly.stripExtension = tooly.stripExt = function(str) {
  return str.substring(0, str.lastIndexOf('.'));
};
