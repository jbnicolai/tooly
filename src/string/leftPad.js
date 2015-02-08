


/**
 * left pad
 * @example   
 * ```js
 * tooly.leftPad('99', 4, '*'); //=> "**99"
 * // works for numbers as well
 * tooly.leftPad(9, 4, '*'); //=> "***9"
 * ```
 * 
 * @param  {String} v      the string to pad
 * @param  {Number} len    the length such that len - v = number of padded chars
 * @param  {String} symbol the symbol to use for padding, defaults to single white space
 * @return {String}        the left padded string
 *
 * @alias #leftpad
 * @alias #lPad
 * @alias #lpad
 * @see  tooly#rightPad
 * @memberOf tooly
 * @category String
 * @static
 */
tooly.leftPad = tooly.leftpad = tooly.lpad = tooly.lPad = function(v, len, symbol) {
  var n = len - (v+'').length;
  return (n > 0) ? tooly.repeat(symbol || ' ', n) + v : v;
};
