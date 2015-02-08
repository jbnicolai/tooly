


var _curly_re = /{(\d+)}/g;

/**
 * Function version of (C# style?) String.format
 * 
 * @example 
 * ```js
 * var formatted = tooly.format('{0}{1}', 'tooly', '.js')); 
 * formatted; //=> 'tooly.js'
 * ```
 *
 * @param  {String} format the format string
 * @return {String}        the formatted string
 *
 * @alias #stringFormat
 * @see  #format
 * @see  http://stackoverflow.com/a/4673436/2416000
 * @memberOf tooly
 * @category String
 * @static
 */
tooly.formatString = tooly.stringFormat = function(format) {
  var args = _slice.call(arguments, 1);
  return format.replace(_curly_re, function(match, number) { 
    return typeof args[number] != 'undefined' ? args[number] : match;
  });
};
