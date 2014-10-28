


var _sort_re, _sort_dig_re;

/**
 * Alpha-numeric sort arrayof objects by key. 
 * Numbers preceed letters regardless of being instances of  `Number` or `String`.
 * Note that this method does modify the original array.
 *
 * ### Example
 * ```js
 * var data = [
 *   {name: 'a'},{name: 2},{name: 1},
 *   {name: 'b'},{name: 'c'},{name: 'z'}
 * ];
 * var ascending = tooly.sort(data, 'name');
 * //=> [{name: 1},{name: 2},{name: 'a'},{name: 'b'},{name: 'c'},{name: 'z'}]
 * 
 * // pass descending flag third arg
 * var descending = tooly.sort(data, 'name', true);
 * //=> [{name: 'z'},{name: 'c'},{name: 'b'},{name: 'a'},{name: 2},{name: 1}]  
 * ```
 * 
 * @param  {Array} arr the array to sort
 * @param  {String} key the key to sort by
 * @param  {boolean} dsc sorts descending order if true
 * @return {Array}     the original `arr` sorted.
 * 
 * @see http://stackoverflow.com/questions/4373018/sort-array-of-numeric-alphabetical-elements-natural-sort
 * @memberOf tooly
 * @category  Collections
 * @static
 */
tooly.sort = function(arr, key, dsc) {
  var a, b, a1, b1, t;
  if (!_sort_re) {
    _sort_re = /(\d+)|(\D+)/g; 
    _sort_dig_re = /\d+/;
  }
  return arr.sort(function(as, bs) {
    a = String(as[key]).toLowerCase().match(_sort_re);
    b = String(bs[key]).toLowerCase().match(_sort_re);
    if (dsc) { // swap
      t = a; a = b; b = t;
    }
    while (a.length && b.length) {
      a1 = a.shift();
      b1 = b.shift();
      if (_sort_dig_re.test(a1) || _sort_dig_re.test(b1)) {
        if (!_sort_dig_re.test(a1)) return 1;
        if (!_sort_dig_re.test(b1)) return -1;
        if (a1 != b1) return a1-b1;
      } else if (a1 != b1) {
        return a1 > b1? 1: -1;
      }
    }
    return a.length - b.length;
  });
};
