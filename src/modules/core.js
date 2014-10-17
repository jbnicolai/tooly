//    +-------------+
//    | CORE MODULE |
//    +-------------+
		/**
		 * Function version of ECMAScript6 String.prototype.endsWith
		 * 
		 * @param  {String} str    the string to check
		 * @param  {String} suffix the "endWith" we are seeking
		 * @return {Boolean}       true if str ends with suffix
		 * 
		 * @see <a href="http://stackoverflow.com/a/2548133">stackoverflow thread</a>
		 * @memberOf tooly
		 * @module core
		 * @static
		 */
		endsWith: function(str, suffix) {
		  return str.indexOf(suffix, str.length - suffix.length) !== -1;
		},

		/**
		 * Function version of String.format / sprintf
		 * 
		 * @see  http://stackoverflow.com/a/4673436/2416000
		 * @param  {String} format
		 * @return {String} 
		 * 
		 * @memberOf tooly
		 * @module core
		 * @static
		 */
		format: function(format) {
		  var args = Array.prototype.slice.call(arguments, 1);
		  return format.replace(/{(\d+)}/g, function(match, number) { 
			return typeof args[number] != 'undefined' ? args[number] : match;
		  });
		},

		/**
		 * Utility method to convert milliseconds into human readable time format hh:mm:ss
		 * 
		 * @param  {Number} time - the time value in milliseconds
		 * @return {String}      - human readable time
		 * 
		 * @memberOf tooly
		 * @module core
		 * @static
		 */
		formatTime: function(time) {
		  var h = Math.floor(time / 3600),
			  m = Math.floor((time - (h * 3600)) / 60),
			  s = Math.floor(time - (h * 3600) - (m * 60));
		  if (h < 10) h = '0' + h;
		  if (m < 10) m = '0' + m;
		  if (s < 10) s = '0' + s;
		  return h + ':' + m + ':' + s;
		},

	  // @see http://stackoverflow.com/a/14428340/2416000 (slightly modified to coerce string-numbers)
	  // (and not fuck with native Number proto)
	  
		/**
		 * Format money.
		 * 
		 * @example
		 * ```js
		 * var loot = '$' + tooly.formatMonet(10989.34); //=> "$10,989.00"
		 * ```
		 * @param  {Number|String} n a number or numerical string
		 * @return {String}   `n` formatted as money (comma separated every hundred)
		 * @see http://stackoverflow.com/a/14428340/2416000 (slightly modified to coerce string-numbers)
		 * @memberOf tooly
		 * @module core
		 * @static
		 */
		formatMoney: function(n) {
		  var number = tooly.type(n, 'number') ? n : +n;
		  return number.toFixed(2).replace(/./g, function(c, i, a) {
			return i && c !== '.' && !((a.length - i) % 3) ? ',' + c : c;
		  });
		},

		/**
		 * Function version of ECMAScript6 String.prototype.repeat without the silly
		 * range error checks etc.
		 * 
		 * @param  {String} str   the string to repeat
		 * @param  {Number} n     the number of times to repeat
		 * @return {String}       the string repeated, or an empty string if n is 0
		 * @memberOf tooly
		 * @module core
		 * @static
		 */
		repeat: function(str, n) {
		  var s = '', i = 0;
		  for (; i < n; i++) s += str;
		  return s;
		},

		/**
		 * scale a number from one range to another
		 * 
		 * @param  {Number} n      the number to scale
		 * @param  {Number} oldMin 
		 * @param  {Number} oldMax 
		 * @param  {Number} min    the new min
		 * @param  {Number} max    the new max
		 * @return {Number}        the scaled number
		 * 
		 * @memberOf tooly
		 * @module core
		 * @static
		 */
		scale: function(n, oldMin, oldMax, min, max) {
		  return (((n-oldMin)*(max-min)) / (oldMax-oldMin)) + min; 
		},

		/**
		 * Extracts final relative part of url, optionally keeping forward,
		 * backward, or both slashes. By default both front and trailing slashes are removed
		 *
		 * @param {String}  url           the url or filepath
		 * @param {Boolean} preSlash      keeps slash before relative part if true
		 * @param {Boolean} trailingSlash keeps last slash after relative part if true.
		 *                                note thatsliceRel does not add a trailing slash if it wasn't
		 *                                there to begin with
		 * @return {String}                               
		 * 
		 * @memberOf tooly
		 * @module core
		 * @static
		 */
		sliceRel: function(url, preSlash, trailingSlash) {
		  var hasTrailing = false;
		  if (url.slice(-1) === '/') {
			hasTrailing = true;
			// we slice off last '/' either way, to easily
			// use lastIndexOf for last url string
			url = url.slice(0,-1);
		  }
		  // snatch last part
		  url = url.slice(url.lastIndexOf('/') + 1);
		  // only if url already had trailing will we add it back
		  // when trailingSlash is true.
		  if (hasTrailing && trailingSlash) { 
			url = url.concat('/'); 
		  }
		  if (preSlash) { 
			url = '/' + url;
		  }
		  return url;
		},

		/**
		 * get the extension of a file, url, or anything after the last `.` in a string.
		 *
		 * @param {String} str the string
		 * @return {String}
		 *
		 * @memberOf tooly
		 * @module core
		 * @static
		 */
		extension: function(str) {
		  return str.substring(str.lastIndexOf('.')+1);
		},

		/**
		 * Get a copy of `str` without file extension, or anything after the last `.`
		 * (does not change the original string)
		 * 
		 * @param  {String} str the string to copy and strip
		 * @return {String}     the copied string with file extension removed
		 *
		 * @memberOf tooly
		 * @module core
		 * @static
		 */
		stripExtension: function(str) {
		  return str.substring(0, str.lastIndexOf('.'));
		},

		/**
		 * Alpha-numeric sort.
		 * 
		 * @param  {Array} arr the array to sort
		 * @param  {String} key the key to sort by
		 * @param  {boolean} dsc sorts descending order if true
		 * @return {Array}     the original `arr` sorted.
		 * 
		 * @see http://stackoverflow.com/questions/4373018/sort-array-of-numeric-alphabetical-elements-natural-sort
		 * @memberOf tooly
		 * @module core
		 * @static
		 */
		sort: function(arr, key, dsc) {
		  var a, b, a1, b1, t, rx = /(\d+)|(\D+)/g, rd = /\d+/;
		  return arr.sort(function(as, bs) {
			a = String(as[key]).toLowerCase().match(rx);
			b = String(bs[key]).toLowerCase().match(rx);
			if (dsc) { // swap
			  // http://stackoverflow.com/a/16201730/2416000
			  // b = [a, a = b][0]; ;)
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
				  return a1> b1? 1: -1;
				}
			}
			return a.length - b.length;
		  });
		},
		// return arr.sort(function(a, b) {
		//   a = a[key];
		//   b = b[key];
		//   if (isNaN(a) && isNaN(b)) return a > b ? -1 : a == b ? 0 : 1; // both are string
		//   else if (isNaN(a)) return -1; // only a is a string
		//   else if (isNaN(b)) return 1; // only b is a string
		//   else return a-b; // both are num
		// });

		/**
		 * A more useful alternative to the typeof operator.
		 * If only the `obj` argument is passed, the class of that object is returned.
		 * If the second argument `klass` is passed, a boolean indicating whether `obj`
		 * is of class `klass` or not is returned.
		 * 
		 * @param  {Object} obj     the object
		 * @param  {String} klass   object class to compare to
		 * @return {String|Boolean} the type of object if only `obj` is passed or 
		 *                              true if `obj` is of class `klass`, false otherwise
		 *
		 * @alias type, typeof
		 * 
		 * @author Angus Croll
		 * @see  http://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator
		 * 
		 * @memberOf tooly
		 * @module core
		 * @static
		 */
		toType: function(obj, klass) {
		  return _type(obj, klass);
		},

		/*! @alias for #toType */
		type: function(o, k) { 
		  return _type(o, k); 
		},

		lPad: function(v, len, symbol) {
		  var n = len - v.length;
		  return (n > 0) ? tooly.repeat(symbol || ' ', n) + v : v;
		},

		rPad: function(v, len, symbol) {
		  var n = len - v.length;
		  return (n > 0) ? v + tooly.repeat(symbol || ' ', n) : v;
		},
