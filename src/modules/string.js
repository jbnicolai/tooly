//    +--------+
//    | STRING |
//    +--------+

/**
 * minimal Function version of ECMAScript6 `String.prototype.contains`.
 * 
 * @param  {String} source the source string
 * @param  {String} str    the string to find
 * @param  {String} index  [optional] index to start searching from
 * @return {Boolean}       true if `source` contains `str`
 *
 * @memberOf tooly
 * @category String
 * @static
 */
contains: function(source, str, index) {
  return source.indexOf(str, index || 0) > -1; 
},

/**
 * minimal Function version of ECMAScript6 `String.prototype.startsWith`.
 * 
 * @param  {String} str    the string to check
 * @param  {String} prefix the "startsWith" we are seeking
 * @return {Boolean}       true if str starts with prefix
 *
 * @memberOf tooly
 * @category String
 * @static
 */
startsWith: function(str, prefix) {
  return str.substring(0, prefix.length) === prefix;
},

/**
 * minimal Function version of ECMAScript6 `String.prototype.endsWith`.
 * 
 * @param  {String} str    the string to check
 * @param  {String} suffix the "endWith" we are seeking
 * @return {Boolean}       true if str ends with suffix
 *
 * @memberOf tooly
 * @category String
 * @static
 */
endsWith: function(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
},

/**
 * Minimal `printf` style string formatting.
 *
 * ### Usage
 * ```js
 * var obj = {website:'lokua.net'};
 * var float = 19.333;
 * tooly.format('object: %o, float: %f', obj, float);
 * //=> "object: {website:'lokua.net'}, float: 19.333"
 * ```
 * 
 * ### Supported specifiers 
 * + `%o` or `%j`: Object (JSON#stringified)
 * + `%d` of `%i`: Integer
 * + `%f`        : Float
 * + `%s`        : String
 *   
 * @param  {String} format the format string
 * @return {String}        the formatted string
 */
format: function(format) {
  var args = Array.prototype.slice.call(arguments, 1);
  if (!_format_re) _format_re = /\%[ojdifsc]+/gi;
  return format.replace(_format_re, function(m) {
    var x = args.shift();
    if (x !== undefined) {
      switch(m) {
        case '%o': // fallthrough
        case '%j': x = JSON.stringify(x); break;
        case '%d': // fallthrough
        case '%i': x = x | 0; break;
        case '%f': x = parseFloat(x); break;
        case '%s': // fallthrough
        default: break;
      }      
      return x;
    }
    return m;
  });
},

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
formatString: function(format) {
  var args = _slice.call(arguments, 1);
  return format.replace(_curly_re, function(match, number) { 
    return typeof args[number] != 'undefined' ? args[number] : match;
  });
},

/*! alias for #formatString */
stringFormat: function() {
  return tooly.formatString.apply(null, arguments);
},

/**
 * Utility method to convert milliseconds into human readable time
 * 
 * @param  {Number} time the time value in milliseconds
 * @return {String}      `time` formatted as hh:mm:ss
 * 
 * @memberOf tooly
 * @category String
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
 * @return {String}   `n` formatted as money (comma separated every three digits)
 * 
 * @see http://stackoverflow.com/a/14428340/2416000 
 * (slightly modified to coerce string-numbers)
 * @memberOf tooly
 * @category String
 * @static
 */
formatMoney: function(n) {
  var number = tooly.type(n, 'number') ? n : +n;
  return number.toFixed(2).replace(/./g, function(c, i, a) {
    return i && c !== '.' && !((a.length - i) % 3) ? ',' + c : c;
  });
},

/**
 * __Experimental__ - will change in future versions.
 * Wrap a string with html tags, id, classes, and attributes with 
 * very simple syntax. Void elements are accounted for.
 * Warning: has not been tested extensively as of yet.
 *
 * ### Examples
 * ```js
 * tooly.tag('div #my-id .my-class data-mood="perculatory"', 'Hi');
 * //=> "<div id="my-id" class="my-class" data-mood="perculatory">Hi</div>"
 * 
 * // nested:
 * tooly.tag('div', tooly.tag('section', '!'));
 * //=> "<div><section>!</section></div>"
 * ```
 * 
 * @param  {String}  el         String of the format "<tag> [.class[...]] [#id] [attribute[...]]"
 * @param  {String}  content    [optional] content to be place after the opening HTML tag
 * @param  {Boolean} asHTML     output HTML if true, String otherwise
 * @return {String|HTMLElement} HTML tag `el` filled with `content`
 *
 * @memberOf tooly
 * @category String
 * @static
 */
tag: function(el, content, asHTML) {
  if (!_tag_re) {
    _tag_re = /(^[a-z]+\d{1})|[^\s]+[a-z]+(-\w+)?=(["'])(?:(?!\3)[^\\]|\\.)*\3|[.#-_a-z][-\w]+/gi;
    _void_el_re = /area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr/i; 
  }
  var matches = el.match(_tag_re),
      el = matches.shift(),
      classes = '', id = '', attrs = '',
      closingTag, out; 
  matches.forEach(function(m, i) {
    var c = m.charAt(0);
    if (c === '#') {
      id += m.slice(1) + '"';
    } else if (c === '.') {
      classes += ' ' + m.slice(1) + ' ';
    } else {
      attrs += ' ' + m;
    }
  });
  closingTag = _void_el_re.test(el) ? '' : '</' + el + '>';
  out = [
    '<', el,
    id ? ' id="' + id : '',
    classes? ' classes="' + classes.trim() + '" ' : '',
    attrs ? attrs : '',
    '>', content, closingTag
  ].join('');
  if (asHTML) {
    var d = document.createElement('div');
    d.innerHTML = out;
    return d.firstChild;
  }
  return out;
},

/**
 * Function version of ECMAScript6 `String.prototype.repeat`
 * 
 * @param  {String} str   the string to repeat
 * @param  {Number} n     the number of times to repeat
 * @return {String}       the string repeated, or an empty string if n is 0
 * 
 * @memberOf tooly
 * @category String
 * @static
 */
repeat: function(str, n) {
  var s = '', i = 0;
  for (; i < n; i++) s += str;
  return s;
},

/**
 * Extracts final relative part of url, optionally keeping forward,
 * backward, or both slashes. By default both front and trailing slashes are removed
 *
 * @param {String}  url           the url or filepath
 * @param {Boolean} preSlash      keeps slash before relative part if true
 * @param {Boolean} trailingSlash keeps last slash after relative part if true,
 *                                though does not add a trailing slash if it wasn't
 *                                there to begin with
 * @return {String}                               
 * 
 * @memberOf tooly
 * @category String
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
  if (hasTrailing && trailingSlash) url += '/'; 
  if (preSlash) url = '/' + url;
  return url;
},

/**
 * get the extension of a file, url, or anything after the last `.` in a string.
 *
 * @param {String} str the string
 * @return {String}
 *
 * @memberOf tooly
 * @category String
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
 * @category String
 * @static
 */
stripExtension: function(str) {
  return str.substring(0, str.lastIndexOf('.'));
},

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
lPad: function(v, len, symbol) {
  var n = len - v.length;
  return (n > 0) ? tooly.repeat(symbol || ' ', n) + v : v;
},

/**
 * right pad
 * 
 * @param  {String} v      the string to pad
 * @param  {Number} len    the length such that len - v = number of padding chars
 * @param  {String} symbol the symbol to use for padding, defaults to single white space
 * @return {String}        the right padded string
 *
 * @see tooly#lpad
 * @memberOf tooly
 * @category String
 * @static
 */
rPad: function(v, len, symbol) {
  var n = len - v.length;
  return (n > 0) ? v + tooly.repeat(symbol || ' ', n) : v;
},
