//    +-------------+
//    | COLLECTIONS |
//    +-------------+

/**
 * Port of underscore's each. Falls back to native forEach for Arrays when available.
 * The `iterator` argument takes the following signature for Arrays:
 * `iterator(value, index, array)` where the array is the same collection passed
 * as the `obj` argument. For objects the signature is:
 * `iterator(value, key, object)`.
 * @example
 * ```js
 * var obj = {'1': 1, '2': 2, '3': 3, '4': 4};
 * each(obj, function(v, k, o) { o[k] = v*100; });
 * obj; //=> {'1': 100, '2': 200, '3': 300, '4': 400};
 * 
 * var arr = [1, 2, 3, 4];
 * each(arr, function(v, i, a) { a[i] = v*100; });
 * arr; //=> [100, 200, 300, 400];
 * ```
 * @param  {Object|Array} obj      the collection to iterate over
 * @param  {Function} iterator the function called on each element in `obj` 
 * @param  {Object} context  the context, used as `this` in the callback
 * @return {Object|Array}          `obj`
 *
 * @memberOf  tooly
 * @category  Collections
 * @static 
 */
each: function(obj, iterator, context) {
  return _each(obj, iterator, context);
},

/**
 * Alpha-numeric sort by key (first level key only).
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
sort: function(arr, key, dsc) {
  var a, b, a1, b1, t, rx = /(\d+)|(\D+)/g, rd = /\d+/;
  return arr.sort(function(as, bs) {
    a = String(as[key]).toLowerCase().match(rx);
    b = String(bs[key]).toLowerCase().match(rx);
    if (dsc) { // swap
      t = a; a = b; b = t;
    }
    while (a.length && b.length) {
      a1 = a.shift();
      b1 = b.shift();
      if (rd.test(a1) || rd.test(b1)) {
        if (!rd.test(a1)) return 1;
        if (!rd.test(b1)) return -1;
        if (a1 != b1) return a1-b1;
      } else if (a1 != b1) {
        return a1 > b1? 1: -1;
      }
    }
    return a.length - b.length;
  });
},
