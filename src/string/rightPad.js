


/**
 * right pad
 * @example   
 * ```js
 * tooly.rightPad('99', 4, '*'); //=> "99**"
 * // works for numbers as well
 * tooly.rightPad(9, 4, '*'); //=> "9***"
 * ```
 * 
 * @param  {String} v      the string to pad
 * @param  {Number} len    the length such that len - v = number of padding chars
 * @param  {String} symbol the symbol to use for padding, defaults to single white space
 * @return {String}        the right padded string
 *
 * @alias #rightpad
 * @alias #rPad
 * @alias #rpad
 * @see tooly#lpad
 * @memberOf tooly
 * @category String
 * @static
 */
tooly.rightPad = tooly.rightpad = tooly.rPad = tooly.rpad = function(v, len, symbol) {
  var n = len - (v+'').length;
  return (n > 0) ? v + tooly.repeat(symbol || ' ', n) : v;
};
