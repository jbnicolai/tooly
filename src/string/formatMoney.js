


/**
 * Format money.
 * 
 * @example
 * ```js
 * var loot = '$' + tooly.formatMoney(10989.34); 
 * loot //=> "$10,989.00"
 * ```
 * 
 * @param  {Number|String} n a number or numerical string
 * @param  {String} symbol optional symbol to prepend to the final output
 * @return {String}   `n` formatted as money (comma separated every three digits)
 * 
 * @see http://stackoverflow.com/a/14428340/2416000 
 * (slightly modified to coerce string-numbers)
 * @memberOf tooly
 * @category String
 * @static
 */
tooly.formatMoney = function(n, symbol) {
  var number = _type(n, 'number') ? n : +n;
  return (symbol || '') + number.toFixed(2).replace(/./g, function(c, i, a) {
    return i && c !== '.' && !((a.length - i) % 3) ? ',' + c : c;
  });
};
