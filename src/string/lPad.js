


/**
 * left pad
 * 
 * @param  {String} v      the string to pad
 * @param  {Number} len    the length such that len - v = number of padding chars
 * @param  {String} symbol the symbol to use for padding, defaults to single white space
 * @return {String}        the left padded string
 *
 * @see  tooly#rpad
 * @memberOf tooly
 * @category String
 * @static
 */
tooly.lPad = function(v, len, symbol) {
  var n = len - v.length;
  return (n > 0) ? tooly.repeat(symbol || ' ', n) + v : v;
};
