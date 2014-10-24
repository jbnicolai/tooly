(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define('tooly', [], function () {
      return (root.returnExportsGlobal = factory());
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    root['tooly'] = factory();
  }
}(this, function () {

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define('tooly', [], function () {
      return (root.returnExportsGlobal = factory());
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    root['tooly'] = factory();
  }
}(this, function () {

/*!
 * tooly - version 0.0.4 (built: 2014-10-24)
 * js utility functions
 * https://github.com/Lokua/tooly.git
 * Copyright (c) 2014 Joshua Kleckner
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/MIT
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define('tooly', [], function () {
      return (root.returnExportsGlobal = factory());
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    root['tooly'] = factory();
  }
}(this, function () {

// var _ws_re = /\s+/,
//     _type_re = /\s([a-z]+)/i,
//     _classes_re_cache = {};
var _classes_re_cache = {};

function _each(obj, fn, context) {
  var keys = Object.keys(obj), i = 0, len = keys.length;
  for (; i < len; i++) fn.call(context, obj[keys[i]], keys[i], obj);
  return obj;
}

function _type(o, klass) {
  o = ({}).toString.call(o).match(_type_re)[1].toLowerCase();
  return klass ? o === klass.toLowerCase() : o;
}

function _toArray(obj) {
  return [].map.call(obj, function(el) { return el; });
}

function _node(el) {
  return  el && (el.nodeType === 1 || el.nodeType === 9);
}

function _select(selector, context) {
  var parent;
  if (context && _type(context, 'string')) {
    parent = document.querySelector(context);
  }  
  return (parent ? parent : document).querySelector(selector);
}

function _selectAll(selector, context) {
  var parent = null;
  if (context) {
    if (_type(context, 'string')) {
      parent = select(context);
    } else if (_type(context, 'nodelist')) {
      parent = select(context[0]);
    }
  }
  return _toArray( (parent ? parent : document).querySelectorAll(selector) );
}


function _classReg(str) {
  if (!_classes_re_cache[str]) {
    _classes_re_cache[str] = new RegExp('\\s*' + str + '\\s*(![\\w\\W])?', 'g');
  }
  return _classes_re_cache[str];
}

// impl for both #append and #prepend
function _pend(append, els, content) {
  if (!_type(content, 'string')) {
    var type = _type(content);
    html = (_node(content))
      ? content.outerHTML 
      : (content instanceof tooly.Frankie)
        ? content.els
        : (type === 'array')
          ? content
          : (type === 'nodelist') 
            ? _toArray(content) 
            : null;
    if (_type(html, 'array')) {
      html = html.map(function(x) { return x.outerHTML; }).join('');
    } else if (!html) {
      return;
    }
  } else {
    html = content;
  }
  els.forEach(function(el) {
    // http://jsperf.com/insertadjacenthtml-perf/14
    el.insertAdjacentHTML(append ? 'beforeend' : 'afterbegin', html);
  }); 
} 
var _format_re,
    _ws_re = /\s+/,
    _type_re = /\s([a-z]+)/i,
    _slice = Array.prototype.slice;

/*!
 * @see  tooly#type
 */
function _type(o, klass) {
  o = ({}).toString.call(o).match(_type_re)[1].toLowerCase();
  return klass ? o === klass.toLowerCase() : o;
}

/*!
 * @see  tooly#basicExtend
 */
function _extend(dest, src) {
  for (var p in src) {
    if (src.hasOwnProperty(p)) {
      dest[p] = src[p];
    }
  }
  return dest;
}

/**
 * @namespace  tooly
 * @type {Object}
 */
var tooly = (function() {

  var _nativeForEach = Array.prototype.forEach;

  /*!
   * underscore's #each
   * @see  tooly#each
   */
  function _each(obj, iterator, context) {
    if (obj == null) return;
    if (_nativeForEach && obj.forEach === _nativeForEach) {
      obj.forEach(iterator, context);
    } else {
      var i = 0, len = obj.length;
      if (len === +len) {
        for (; i < len; i++) {
          iterator.call(context, obj[i], i, obj);
        }
      } else {
        var keys = Object.keys(obj);
        for (len = keys.length; i < len; i++) {
          iterator.call(context, obj[keys[i]], keys[i], obj);
        }
      }
    }
    return obj;
  }
 
  // convert object or array-like object (arguments, NodeList, HTMLCollection, etc.) 
  // into proper primitive array 
  function _toArray(obj) {
    return [].map.call(obj, function(el) { return el; });
  }

  // modified from http://stackoverflow.com/a/9229821/2416000
  // TODO: this modifies original arr, find unaltering way
  function _sortUnique(arr) {
    return arr.sort().filter(function(item, pos) {
      return !pos || item != arr[pos-1];
    });
  }
  
  // large enough to warrant caching only when used
  var _tag_re, _void_el_re, 
      _curly_re = /{(\d+)}/g;

  return {

//    +-----+//    | DOM |//    +-----+        /**     * The Frankie class - named after the late, great DJ Frankie Knuckles (one of the greatest)      * _selectors_ of all time ;) - provides a jQuery style wrapper around most     * tooly#dom methods except for #select and #selectAll.      * Selection instead is done through the Frankie constructor, which will keep     * an internal reference to a selectAll query on the passed `el`. All dom     * methods that can be called directly from tooly can instead be called     * from the Frankie instance without their first argument, for example:     * `tooly.css('.myDiv', {color:'red'})` and      * `tooly.Frankie('.myDiv').css({color:'red'})` are equivalent. It is also     * important to note that all methods return the instance for easy chainability,     * expect when either `css()` or `html()` are called without any arguments, which makes     * them getters. Methods `parent` and `children` will return the instance as well,      * instead setting the internal selection reference to the parents or children of the      * previous selection, for example, with markup `<div><p></p></div>`,      * `tooly.Frankie('p').parent().css('background', 'orange');` would change the div's      * background orange.     *      *      * Another usage example:     * @example     * ```js     * // alias the Frankie namespace     * var $ = tooly.Frankie.bind(this);     * var $divs = $(divs);     * $divs.css({color:'green'});     * // multiple yet separate selectors must be comma separated     * $('div, p')     *   .addClass('purple')     *   .addClass('yellow')     *   .removeClass('g')     *   .css({'border-radius':'4px'})     *   .prepend('<h1>---</h1>')     *   .append('<h1>+++</h1>')     *   .html('H T M L');     * ```     *        * @param {String|HTMLElement} el      *        valid css selector string, can contain multiple      *        selectors separated my commas (see the example)     * @param {HTMLElement|String|Array<HTMLElement>|NodeList|Frankie}      *        context a parent context to search for the supplied `el` argument.     * @class Frankie     * @constructor     * @category Dom     * @memberOf  tooly     * @static                         */    Frankie: function(el, context) {      // if (!(this instanceof tooly.Frankie)) {      //   return new tooly.Frankie(el, context);      // }      // this.els = _node(el) ? [el] : tooly.selectAll(el, context);      // return this;      if (!(this instanceof tooly.Frankie)) {        return new tooly.Frankie(el, context);      }      this.els = _node(el) ? [el] : _selectAll(el, context);      return this;    },    

//    +--------+//    | OBJECT |//    +--------+        /**     * scale a number from one range to another     *      * @param  {Number} n      the number to scale     * @param  {Number} oldMin      * @param  {Number} oldMax      * @param  {Number} min    the new min     * @param  {Number} max    the new max     * @return {Number}        the scaled number     *      * @memberOf tooly     * @category Object     * @static     */    scale: function(n, oldMin, oldMax, min, max) {      return (((n-oldMin)*(max-min)) / (oldMax-oldMin)) + min;     },        /**     * @param  {Function} ctor      * @param  {Object|Array} args      * @return {Object}     *      * @memberOf  tooly     * @category  Object     * @static           */    construct: function(ctor, args) {      // the stupid name leads to more revealing output in logs      function ToolySurrogateConstructor() {        return (_type(args) === 'array')           ? ctor.apply(this, args)           : ctor.call(this, args);      }      ToolySurrogateConstructor.prototype = ctor.prototype;      return new ToolySurrogateConstructor();    },        /**     * Add the "own properties" of `src` to `dest`.     * Used throughout the application to add prototype      * methods to tooly classes without     * assigning Object as their prototype.     *      * @param  {Object} dest the destination object     * @param  {Object} src  the source object     * @return {Object}      `dest`     *     * @category  Core     * @memberOf tooly     * @static     */    basicExtend: function(dest, src) {      return _basicExtend(dest, src);    },        /**     * quick and dirty port of [node.extend](https://github.com/dreamerslab/node.extend)     * which is in turn a port of jQuery.extend, slightly modified for tooly compatibility.     * Copyright 2011, John Resig     * Dual licensed under the MIT or GPL Version 2 licenses.     * http://jquery.org/license     *      * @see  http://api.jquery.com/jquery.extend/     *      * @memberOf  tooly     * @category  Object     * @static     */         extend: function() {      var target = arguments[0] || {},          i = 1,          length = arguments.length,          deep = false,          options, name, src, copy, copy_is_array, clone;          // Handle a deep copy situation      if (_type(target, 'boolean')) {        deep = target;        target = arguments[1] || {};        // skip the boolean and the target        i = 2;      }          // Handle case when target is a string or something (possible in deep copy)      if (!_type(target, 'object') && !_type(target, 'function')) {        target = {};      }          for (; i < length; i++) {        // Only deal with non-null/undefined values        options = arguments[i]        if (options != null) {          if (_type(options, 'string')) {            options = options.split('');          }          // Extend the base object          for (name in options) {            src = target[name];            copy = options[name];                // Prevent never-ending loop            if (target === copy) {              continue;            }                // Recurse if we're merging plain objects or arrays            if (deep && copy && (tooly.isHash(copy) || (copy_is_array = _type(copy, 'array')))) {              if (copy_is_array) {                copy_is_array = false;                clone = src && _type(src, 'array') ? src : [];              } else {                clone = src && tooly.isHash(src) ? src : {};              }                  // Never move original objects, clone them              target[name] = tooly.extend(deep, clone, copy);                // Don't bring in undefined values            } else if (typeof copy !== 'undefined') {              target[name] = copy;            }          }        }      }          // Return the modified object      return target;    },        /**     * Object literal assignment results in creating an an object with Object.prototype     * as the prototype. This allows us to assign a different prototype while keeping      * the convenience of literal declaration.     *      * @param  {Object} prototype     * @param  {Object} object         * @return {Object}     *      * @author Yehuda Katz     * @see http://yehudakatz.com/2011/08/12/understanding-prototypes-in-javascript/     *      * @memberOf  tooly     * @category  Object     * @static      */    fromPrototype: function(prototype, object) {      var newObject = Object.create(prototype),           prop;      for (prop in object) {        if (object.hasOwnProperty(prop)) {          newObject[prop] = object[prop];        }      }      return newObject;    },        /**     * Helper to perform prototypal inheritance.     * Note that this method overwrites the child's original prototype.     * Also note that the child's constructor needs to call `parent.call(this)`     *     * @example     * ```js     * function Parent() {}     * Parent.prototype.b = 2;     * function Child() { Parent.call(this); } // this is a must     * tooly.inherit(Parent, Child, { a: 1 });     * var child = new Child();     * console.log(child.a + child.b); //=> 3     * // for a more practical example see the tooly.Handler documentation.     * ```     *      * @param  {Function} parent     * @param  {Function} child       * @param  {Mixed} extend additional members to the Child's prototype      *      * @memberOf  tooly     * @category  Object     * @static     */    inherit: function(parent, child, extend) {      child.prototype = new parent();      child.prototype.constructor = child;      for (var prop in extend) {        if (extend.hasOwnProperty(prop)) {          child.prototype[prop] = extend[prop];        }      }    },        /**     * port of is.hash     *      * Test if `value` is a hash - a plain object literal.     *     * @param {Mixed} value value to test     * @return {Boolean} true if `value` is a hash, false otherwise     *      * @see https://github.com/enricomarino/is/blob/master/index.js     * @author Enrico Marino (with minor edits)     *      * @memberOf  tooly     * @category  Object     * @static     */    isHash: function(val) {      return _type(val) === 'object' && val.constructor === Object &&         !val.nodeType && !val.setInterval;    },        /**     * A more useful alternative to the typeof operator.     * If only the `obj` argument is passed, the class of that object is returned.     * If the second argument `klass` is passed, a boolean indicating whether `obj`     * is of class `klass` or not is returned.     *      * @param  {Object} obj     the object     * @param  {String} klass   object class to compare to     * @return {String|Boolean} the type of object if only `obj` is passed or      *                              true if `obj` is of class `klass`, false otherwise     *     * @alias type     * @author Angus Croll     * @see  http://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator     *      * @memberOf tooly     * @category Object     * @static     */    toType: function(obj, klass) {      return _type(obj, klass);    },        /*! @alias for #toType */    type: function(o, k) {       return _type(o, k);     },        /**     * Extensively check if `obj` is "falsy".      * <br>     * ### isFalsy returns true for the following:     * ```js     * var undefinedValue;     * var nullValue             = null;     * var setUndefined          = undefined;     * var falseValue            = false;     * var zero                  = 0;     * var emptyString           = ''; // same for ' \n\t   \n'     * var falseString           = 'false';     * var zeroString            = '0';     * var nullString            = 'null';     * var undefinedString       = 'undefined';     * ```     * Note that in the cases of falsy strings, the check is      * done after a call to `String.trim`, so surrounding      * whitespace is ignored:      * `isFalsy('\n\t false   \n') //=> true`     *      * @param  {mixed}  obj the object to check     * @return {Boolean}     true if `obj` is "falsy"     *     * @alias #falsy     * @see  #isTruthy     * @memberOf tooly     * @category Object     * @static     */    isFalsy: function(obj) {      // no-strict void 0 covers null as well      if (obj == void 0 || obj == false) return true;      if (_type(obj, 'string')) {        var str = obj.trim();        return str === ''           || str === 'false'           || str === 'undefined'           || str === 'null';      }    },        /*! alias for #isFalsy */    falsy: function(obj) {      return isFalsy(obj);    },        /**     * Opposite of `isFalsy`.     *      * @param  {mixed}  obj the object to check     * @return {Boolean}     true if `obj` is "truthy"     *     * @alias #truthy     * @see  #isFalsy     * @memberOf tooly     * @category Object     * @static     */    isTruthy: function(obj) {      return !isFalsy(obj);    },        /*! alias for #isTruthy */    truthy: function(obj) {      return !isFalsy(obj);    },    

//    +--------+//    | STRING |//    +--------+        /**     * minimal Function version of ECMAScript6 `String.prototype.contains`.     *      * @param  {String} source the source string     * @param  {String} str    the string to find     * @param  {String} index  [optional] index to start searching from     * @return {Boolean}       true if `source` contains `str`     *     * @memberOf tooly     * @category String     * @static     */    contains: function(source, str, index) {      return source.indexOf(str, index || 0) > -1;     },        /**     * minimal Function version of ECMAScript6 `String.prototype.startsWith`.     *      * @param  {String} str    the string to check     * @param  {String} prefix the "startsWith" we are seeking     * @return {Boolean}       true if str starts with prefix     *     * @memberOf tooly     * @category String     * @static     */    startsWith: function(str, prefix) {      return str.substring(0, prefix.length) === prefix;    },        /**     * minimal Function version of ECMAScript6 `String.prototype.endsWith`.     *      * @param  {String} str    the string to check     * @param  {String} suffix the "endWith" we are seeking     * @return {Boolean}       true if str ends with suffix     *     * @memberOf tooly     * @category String     * @static     */    endsWith: function(str, suffix) {      return str.indexOf(suffix, str.length - suffix.length) !== -1;    },        /**     * Minimal `printf` style string formatting.     *     * ### Usage     * ```js     * var obj = {website:'lokua.net'};     * var float = 19.333;     * tooly.format('object: %o, float: %f', obj, float);     * //=> "object: {website:'lokua.net'}, float: 19.333"     * ```     *      * ### Supported specifiers      * + `%o` or `%j`: Object (JSON#stringified)     * + `%d` of `%i`: Integer     * + `%f`        : Float     * + `%s`        : String     *        * @param  {String} format the format string     * @return {String}        the formatted string     */    format: function(format) {      var args = Array.prototype.slice.call(arguments, 1);      if (!_format_re) _format_re = /\%[ojdifsc]+/gi;      return format.replace(_format_re, function(m) {        var x = args.shift();        if (x !== undefined) {          switch(m) {            case '%o': // fallthrough            case '%j': x = JSON.stringify(x); break;            case '%d': // fallthrough            case '%i': x = x | 0; break;            case '%f': x = parseFloat(x); break;            case '%s': // fallthrough            default: break;          }                return x;        }        return m;      });    },        /**     * Function version of (C# style?) String.format     *      * @example      * ```js     * var formatted = tooly.format('{0}{1}', 'tooly', '.js'));      * formatted; //=> 'tooly.js'     * ```     *     * @param  {String} format the format string     * @return {String}        the formatted string     *     * @alias #stringFormat     * @see  #format     * @see  http://stackoverflow.com/a/4673436/2416000     * @memberOf tooly     * @category String     * @static     */    formatString: function(format) {      var args = _slice.call(arguments, 1);      return format.replace(_curly_re, function(match, number) {         return typeof args[number] != 'undefined' ? args[number] : match;      });    },        /*! alias for #formatString */    stringFormat: function() {      return tooly.formatString.apply(null, arguments);    },        /**     * Utility method to convert milliseconds into human readable time     *      * @param  {Number} time the time value in milliseconds     * @return {String}      `time` formatted as hh:mm:ss     *      * @memberOf tooly     * @category String     * @static     */    formatTime: function(time) {      var h = Math.floor(time / 3600),          m = Math.floor((time - (h * 3600)) / 60),          s = Math.floor(time - (h * 3600) - (m * 60));      if (h < 10) h = '0' + h;      if (m < 10) m = '0' + m;      if (s < 10) s = '0' + s;      return h + ':' + m + ':' + s;    },        /**     * Format money.     *      * @example     * ```js     * var loot = '$' + tooly.formatMoney(10989.34);      * loot //=> "$10,989.00"     * ```     *      * @param  {Number|String} n a number or numerical string     * @return {String}   `n` formatted as money (comma separated every three digits)     *      * @see http://stackoverflow.com/a/14428340/2416000      * (slightly modified to coerce string-numbers)     * @memberOf tooly     * @category String     * @static     */    formatMoney: function(n) {      var number = tooly.type(n, 'number') ? n : +n;      return number.toFixed(2).replace(/./g, function(c, i, a) {        return i && c !== '.' && !((a.length - i) % 3) ? ',' + c : c;      });    },        /**     * __Experimental__ - will change in future versions.     * Wrap a string with html tags, id, classes, and attributes with      * very simple syntax. Void elements are accounted for.     * Warning: has not been tested extensively as of yet.     *     * ### Examples     * ```js     * tooly.tag('div #my-id .my-class data-mood="perculatory"', 'Hi');     * //=> "<div id="my-id" class="my-class" data-mood="perculatory">Hi</div>"     *      * // nested:     * tooly.tag('div', tooly.tag('section', '!'));     * //=> "<div><section>!</section></div>"     * ```     *      * @param  {String}  el         String of the format "<tag> [.class[...]] [#id] [attribute[...]]"     * @param  {String}  content    [optional] content to be place after the opening HTML tag     * @param  {Boolean} asHTML     output HTML if true, String otherwise     * @return {String|HTMLElement} HTML tag `el` filled with `content`     *     * @memberOf tooly     * @category String     * @static     */    tag: function(el, content, asHTML) {      if (!_tag_re) {        _tag_re = /(^[a-z]+\d{1})|[^\s]+[a-z]+(-\w+)?=(["'])(?:(?!\3)[^\\]|\\.)*\3|[.#-_a-z][-\w]+/gi;        _void_el_re = /area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr/i;       }      var matches = el.match(_tag_re),          el = matches.shift(),          classes = '', id = '', attrs = '',          closingTag, out;       matches.forEach(function(m, i) {        var c = m.charAt(0);        if (c === '#') {          id += m.slice(1) + '"';        } else if (c === '.') {          classes += ' ' + m.slice(1) + ' ';        } else {          attrs += ' ' + m;        }      });      closingTag = _void_el_re.test(el) ? '' : '</' + el + '>';      out = [        '<', el,        id ? ' id="' + id : '',        classes? ' classes="' + classes.trim() + '" ' : '',        attrs ? attrs : '',        '>', content, closingTag      ].join('');      if (asHTML) {        var d = document.createElement('div');        d.innerHTML = out;        return d.firstChild;      }      return out;    },        /**     * Function version of ECMAScript6 `String.prototype.repeat`     *      * @param  {String} str   the string to repeat     * @param  {Number} n     the number of times to repeat     * @return {String}       the string repeated, or an empty string if n is 0     *      * @memberOf tooly     * @category String     * @static     */    repeat: function(str, n) {      var s = '', i = 0;      for (; i < n; i++) s += str;      return s;    },        /**     * Extracts final relative part of url, optionally keeping forward,     * backward, or both slashes. By default both front and trailing slashes are removed     *     * @param {String}  url           the url or filepath     * @param {Boolean} preSlash      keeps slash before relative part if true     * @param {Boolean} trailingSlash keeps last slash after relative part if true,     *                                though does not add a trailing slash if it wasn't     *                                there to begin with     * @return {String}                                    *      * @memberOf tooly     * @category String     * @static     */    sliceRel: function(url, preSlash, trailingSlash) {      var hasTrailing = false;      if (url.slice(-1) === '/') {        hasTrailing = true;        // we slice off last '/' either way, to easily        // use lastIndexOf for last url string        url = url.slice(0,-1);      }      // snatch last part      url = url.slice(url.lastIndexOf('/') + 1);      // only if url already had trailing will we add it back      // when trailingSlash is true.      if (hasTrailing && trailingSlash) url += '/';       if (preSlash) url = '/' + url;      return url;    },        /**     * get the extension of a file, url, or anything after the last `.` in a string.     *     * @param {String} str the string     * @return {String}     *     * @memberOf tooly     * @category String     * @static     */    extension: function(str) {      return str.substring(str.lastIndexOf('.')+1);    },        /**     * Get a copy of `str` without file extension, or anything after the last `.`     * (does not change the original string)     *      * @param  {String} str the string to copy and strip     * @return {String}     the copied string with file extension removed     *     * @memberOf tooly     * @category String     * @static     */    stripExtension: function(str) {      return str.substring(0, str.lastIndexOf('.'));    },        /**     * left pad     *      * @param  {String} v      the string to pad     * @param  {Number} len    the length such that len - v = number of padding chars     * @param  {String} symbol the symbol to use for padding, defaults to single white space     * @return {String}        the left padded string     *     * @see  tooly#rpad     * @memberOf tooly     * @category String     * @static     */    lPad: function(v, len, symbol) {      var n = len - v.length;      return (n > 0) ? tooly.repeat(symbol || ' ', n) + v : v;    },        /**     * right pad     *      * @param  {String} v      the string to pad     * @param  {Number} len    the length such that len - v = number of padding chars     * @param  {String} symbol the symbol to use for padding, defaults to single white space     * @return {String}        the right padded string     *     * @see tooly#lpad     * @memberOf tooly     * @category String     * @static     */    rPad: function(v, len, symbol) {      var n = len - v.length;      return (n > 0) ? v + tooly.repeat(symbol || ' ', n) : v;    },    

//    +-------------+//    | COLLECTIONS |//    +-------------+        /**     * Port of underscore's each. Falls back to native forEach for Arrays when available.     * The `iterator` argument takes the following signature for Arrays:     * `iterator(value, index, array)` where the array is the same collection passed     * as the `obj` argument. For objects the signature is:     * `iterator(value, key, object)`.     * @example     * ```js     * var obj = {'1': 1, '2': 2, '3': 3, '4': 4};     * each(obj, function(v, k, o) { o[k] = v*100; });     * obj; //=> {'1': 100, '2': 200, '3': 300, '4': 400};     *      * var arr = [1, 2, 3, 4];     * each(arr, function(v, i, a) { a[i] = v*100; });     * arr; //=> [100, 200, 300, 400];     * ```     * @param  {Object|Array} obj      the collection to iterate over     * @param  {Function} iterator the function called on each element in `obj`      * @param  {Object} context  the context, used as `this` in the callback     * @return {Object|Array}          `obj`     *     * @memberOf  tooly     * @category  Collections     * @static      */    each: function(obj, iterator, context) {      return _each(obj, iterator, context);    },        /**     * Alpha-numeric sort by first level key.     *      * @param  {Array} arr the array to sort     * @param  {String} key the key to sort by     * @param  {boolean} dsc sorts descending order if true     * @return {Array}     the original `arr` sorted.     *      * @see http://stackoverflow.com/questions/4373018/sort-array-of-numeric-alphabetical-elements-natural-sort     * @memberOf tooly     * @category  Collections     * @static     */    sort: function(arr, key, dsc) {      var a, b, a1, b1, t;      if (!_sort_re) {        _sort_re = /(\d+)|(\D+)/g;         _sort_dig_re = /\d+/;      }      return arr.sort(function(as, bs) {        a = String(as[key]).toLowerCase().match(rx);        b = String(bs[key]).toLowerCase().match(rx);        if (dsc) { // swap          t = a; a = b; b = t;        }        while (a.length && b.length) {          a1 = a.shift();          b1 = b.shift();          if (rd.test(a1) || rd.test(b1)) {            if (!rd.test(a1)) return 1;            if (!rd.test(b1)) return -1;            if (a1 != b1) return a1-b1;          } else if (a1 != b1) {            return a1 > b1? 1: -1;          }        }        return a.length - b.length;      });    },    

//    +-----+//    | XHR |//    +-----+        /**     * perform a `GET` xhr request for a JSON file and operate on a `JSON.parse`'d with     * a supplied `success` callback.     *      * @param  {String}   jsonFile  url     * @param  {callback} success   function to operate on response data     *                              if the request is successful. If so, success     *                              takes a single data parameter (the response).     * @param {Boolean}   async     defaults to true     *     * @memberOf tooly     * @category XHR     * @static     */    getJSON: function(jsonFile, success, async) {      tooly.get(jsonFile, 'json', success, async);    },        /**     * perform a `GET` xhr request     *      * @param  {String}   url       url to resource     * @param  {String}   respType  the request responseType     * @param  {callback} success   function to operate on response data     *                              if the request is successful. If so, success     *                              takes a single data parameter (the response).     * @param {Boolean}   async     defaults to true     *     * @memberOf tooly     * @category XHR     * @static     */    get: function(url, respType, success, async) {      var req = new XMLHttpRequest();      req.open('get', url, (arguments.length === 3) ? true : async);      req.reponseType = respType;      req.onload = function() {        if (req.readyState == 4) { // done          if (req.status == 200) {            success(respType === 'json' ? JSON.parse(req.response) : req.response);          }        }      };      req.send();    },    

//    +---------+//    | HANDLER |//    +---------+            /**     * Constructor.     *      * @param {Object}  context   (optional) designates the owner of the `handlers` array that holds      *                            all callbacks. When blank the Handler instance uses its own internal     *                            array. If you'd like to keep track of the handlers outside of the     *                            instance, pass a context such that context.handlers is an array.     * @class  tooly.Handler     * @constructor     * @category  Handler     * @memberOf  tooly     */    Handler: function(context) {      if (!(this instanceof tooly.Handler)) {        return new tooly.Handler(context);      }      this.context = context || this;      this.handlers = this.context.handlers = {};      return this;    },        

//    +-------+//    | TIMER |//    +-------+            /**     * Timer class constructor. Contains basic `start` and `stop` methods for timing     * of code execution. Also see #funkyTime, which is a static method to time     * function executions and is simpler to use than manually controlling a timer instance.     *       * @param {String} name [optional] name     *      * @category Timer     * @class  tooly.Timer     * @constructor     * @memberOf tooly     */    Timer: function(name) {      // enable instantiation without new      if (!(this instanceof tooly.Timer)) {        return new tooly.Timer(name);      }      this.name = name || 'Timer_instance_' + Date.now();      return this;     },        /**     * "funkyTime" - think "Function Execution Time".     * Get the total, individual, and average execution times of `fn` called `n` times.     * `fn` will be passed the iteration number as its first argument.     *     * @example     * ```js     * // setup code     * var data = [], i = 0, n = 99000;     * for (; i < n; i++) data.push(Math.random()*(1/3));     *     * // run a sort five times     * var results = funkyTime(function() {     *   var rndm = data.sort();     * }, 5);     *     * results;     * // returns something like:     * // { stack: [ 692, 720, 730, 722, 735 ],     * //   total: 735,     * //   average: 147,     * //   offset: 15.2 }     * ```     *      * @param  {Function} fn the function that will be timed.     * @param  {number}   n  the number of times to run the function (defaults to 1)       * @return {Object}      a hash of timing results with the following signature:     * + __stack__ <Array[Number]>: the time of each iteration      * + __total__ <Number>: the total of all iterations     * + __average__ <Number>: the average of all iterations     * + __offset__ <Number>: the difference between the total time to run      * the iteration loop and the sum of all iteration times - basically     * the loop and Timer overhead.     * @memberOf  tooly.Timer     * @static     * @category Timer     */    funkyTime: function(fn, n) {      var tx = tooly.Timer(),          ix = tooly.Timer(),          stack = [],          i = 0, end, avg;      n = n || 1;      tx.start();      for (; i < n; i++) {        ix.start();        fn.call(null, i);        stack.push(ix.stop());      }      end = tx.stop();      avg = end/n;      return {         stack: stack,        total: end,        average: avg,        offset: (function() {          var sum = 0;          stack.forEach(function(x) { sum += x; });          return parseFloat((end - (sum/n)).toFixed(2));        })()      };    },    

//    +--------+//    | LOGGER |//    +--------+        /**     * Class constructor. Typical logging functionality that wraps around console.log     * with css coloring and level control. The Logger level hierarchy is as follows:     *     * - -1: off     * - 0: log (no difference from console.log)     * - 1: trace     * - 2: debug     * - 3: info     * - 4: warn     * - 5: error     *     * Only calls that are greater or equal to the current Logger.level will be run.     *     * ## Format     * Format strings follow the same usage as node.js or the web interface, depending     * on what environment you are in.     * - node     *   + %s, %j, and %d can be used for 'string', 'json', or 'number'     * - browser     *   + %s or %o can be used in place of 'string' or 'object'     *      * ## Example     * ```js     * var logger = new tooly.Logger(2, 'TEST_LOGGER');     * logger.trace(logger); // will not output     * ```     *      * All active loggers in the current context can be disabled, regardless of level,     * by setting the static `tooly.Logger.off = true`. Setting back to false will resume     * logging at each loggers previous level.     *      * @param {Number} level set the level of this logger. Defaults to 2 (debug) if no     *                       arguments are passed.     * @param {String} name  optional name to identify this instance. The name will preceed any     *                       output message     *     * @category Logger     * @class  tooly.Logger     * @constructor     * @memberOf  tooly     * @static     */    Logger: function(level, name) {      var logger = this;      tooly.Logger.loggers = tooly.Logger.loggers || [];      // enable instantiation without new      if (!(logger instanceof tooly.Logger)) {        logger = new tooly.Logger(level, name);        tooly.Logger.loggers.push(logger);      }      logger.level = (level !== undefined) ? level : 2;      if (name) logger.name = name;      // automatically set this false as its only       // for emergency "must track anonymous function location" purposes      logger.traceAnonymous = false;      return logger;    },    

  };
})();

/**
 * add a css class to element
 * 
 * @param {String|Array<String>} klass the css class(es) to add
 * @return {Frankie} `this`
 *
 * @memberOf  Frankie
 * @instance
 */
tooly.Frankie.prototype.addClass = function(klass) {
  this.els.forEach(function(x) { 
    if (!x.className) {
      x.className += ' ' + klass;
      return;
    }
    var names = x.className;
    x.className += ' ' + klass.split(_ws_re).filter(function(n) {
      return names.indexOf(n) === -1;
    }).join(' ');
  });
  return this;
};

/**
 * append `content` to all elements in the set of matched elements.
 * 
 * @param  {mixed}  content  the content to append
 * @return {Frankie} `this`
 *
 * @memberOf  Frankie
 * @instance
 */
tooly.Frankie.prototype.append = function(content) {
  _pend(true, this.els, content);
  return this;
};

/**
 * get or set a(n) html attribute(s)
 * 
 * @param  {Object|String} attr  the attribute to get/set
 * @param  {String|Number} the value of the attribute `attr` (only if `attr` is a name string)
 * @return {Object} Frankie or the attribute value if only a single string is passed
 *                          for the first argument
 *
 * @memberOf  Frankie
 * @instance
 */
tooly.Frankie.prototype.attr = function(/*mixed*/) {
  var argsLen = arguments.length,
      attr = arguments[0];
  if (argsLen === 1) {
    if (_type(attr, 'object')) {
      // SET (hash)
      _each(attr, function(val, key) {
        this.els.forEach(function(x) { x.setAttribute(key, val); });
      });
    } else {
      // GET
      return this.els[0].getAttribute(attr);
    }
  } else { // SET (single comma sep key-val pair)
    var value = arguments[1];
    this.els.forEach(function(x) { x.setAttribute(attr, value); });
  }
  return this;
};

/**
 * Create a new Frankie instance from all first-generation child elements of 
 * the current set of matched elements;
 *     
 * @return {Frankie} new Frankie instance
 * 
 * @memberOf  Frankie
 */
tooly.Frankie.prototype.children = function() {
  var frank = new tooly.Frankie();
  this.els.forEach(function(x) { 
    var c = x.children;
    if (_node(c)) {
      frank.els.push(c);
    } else if (_type(c) === 'htmlcollection') {
      [].push.apply(frank.els, [].slice.call(c).map(function(v) { return v; }));
    }
  });
  return frank;
};

/**
 * @example
 * ```js
 * // as key val pair (key must also be a string)
 * var el = tooly.select('#main');
 * $('div').css('background', 'red');
 * 
 * // or as hash (notice that hyphenated keys must be quoted)<br>
 * $('div').css({ width: '100px', background: 'red', 'font-size': '24px' });
 *
 * // also can take valid css selector string in place of element
 * // below will match the document's first div
 * $('div').css('border', '2px solid red');
 * ```
 * 
 * @param  {String|Object}  styles  
 *         either a single comma separated key value pair of strings, or object hash
 * @return {Frankie} `this`
 * 
 * @memberOf  Frankie
 * @instance
 */
tooly.Frankie.prototype.css = function(/*mixed*/) {
  var styles = {}, argsLen = arguments.length;
  if (argsLen === 2) {
    // SET via single comma sep key-value pair
    styles[arguments[0]] = arguments[1];
  } else {
    var el = this.els[0];
    if (argsLen === 1) {
      _0 = arguments[0];
      // GET by key
      if (_type(_0, 'string')) {
        return el.style[_0] || undefined;
      }
      // SET via hash
      styles = _0;
    } else {
      // GET all
      return el.style || undefined;
    }
  }
  // set
  this.els.forEach(function(x) { 
    _each(styles, function(s, k) { x.style[k] = s; });
  });
  return this;
};

/**
 * remove all child nodes from the set of matched elements.
 * __TODO__: remove listeners?
 * 
 * @return {Frankie} `this`
 *
 * @memberOf  Frankie
 * @instance
 */
tooly.Frankie.prototype.empty = function() {
  this.els.forEach(function(x) {
    // see http://jsperf.com/innerhtml-vs-removechild/15
    while (x.lastChild) x.removeChild(x.lastChild);
  });
  return this;
};

/**
 * Create a new instance of Frankie with only the element
 * specified by index
 *
 * @param {Number} index the index of the element
 * @return {Frankie} new Frankie instance
 * 
 * @memberOf Frankie
 * @instance
 */
tooly.Frankie.prototype.eq = function(i) {
  var frank = new tooly.Frankie();
  frank.els = [this.els[i]];
  return frank;
};

/**
 * @memberOf Frankie
 * @instance
 */
tooly.Frankie.prototype.get = function(i) {
  return this.els[i];
};

/**
 * @memberOf tooly.Frankie
 * @instance
 */
tooly.Frankie.prototype.hasClass = function(klass) {
  var re = _classReg(klass);
  return this.els.some(function(x) { 
    return x.className.split(_ws_re).some(function(c) { 
      return c.match(re) == klass; 
    });
  });
};

/**
 * fill each element in the set of matched elements with `content`. 
 * Replaces existing content.
 * If called with 1 arg, the first matched element's innerHTML is returned.
 * 
 * @param  {Mixed} content
 * @return {String|Object} the first matched el's innerHTML or null when in get mode,
 *                             otherwise `this` for chaining
 * @memberOf  Frankie
 * @instance
 */
tooly.Frankie.prototype.html = function(content) {
  // get
  if (!arguments.length)  {
    return this.els[0].innerHTML;
  }
  // set
  this.els.forEach(function(x) { x.innerHTML = content; });
  return this;
};

/**
 * Create a Frankie instance from all parent elements of the set of matched elements.
 * 
 * @return {Frankie} a new Frankie instance
 *
 * @memberOf  Frankie
 * @instance
 */
tooly.Frankie.prototype.parent = function() {
  var frank = new tooly.Frankie();
  var seen = {};
  frank.els = this.els.map(function(x) { 
    return x.parentNode; 
  }).filter(function(x) {
    return seen.hasOwnProperty(x) ? false : (seen[x] = true);
  });
  return frank;
};

/**
 * prepend `content` to all elements in the set of matched elements.
 * 
 * @param  {mixed}  content  the content to prepend
 * @return {Frankie} `this`
 *
 * @memberOf  Frankie
 * @instance
 */
tooly.Frankie.prototype.prepend = function(content) {
  _pend(false, this.els, content);
  return this;
};

/**
 * remove a css class from an element
 * 
 * @param  {String} klass   the css class(es) to remove
 * @return {Frankie} `this` 
 *
 * @memberOf  Frankie
 * @instance
 */
tooly.Frankie.prototype.removeClass = function(klass) {
  // "or-ize" for multiple klasses match in regexp
  var classes = '(' + klass.split(_ws_re).join('|') + ')';
  this.els.forEach(function(x) {
    x.className = x.className.replace(_classReg(classes), ' ').trim();
  });
  return this;
};

/**
 * @memberOf Frankie
 * @instance
 */
tooly.Frankie.prototype.zilch = function() {
  return this.els.length === 0;
};  


_extend(tooly.Handler.prototype, {

  /**
   * Register an event handler for a named function.
   * 
   * @param  {(String|Function)} fn   the function that will call the handler when executed
   * @param  {callback}   handler the handler that we be called by the named function
   * @return {Object} `this` for chaining
   * 
   * @memberOf  tooly.Handler
   * @instance
   */
  on: function(fn, handler) {
    if (this.handlers[fn] === undefined) {
      this.handlers[fn] = [];
    }
    this.handlers[fn].push(handler);
    return this;
  },

  /**
   * Remove all handlers. Any subsequent call to #executeHandler will have no effect.
   *
   * @memberOf  tooly.Handler
   * @instance
   */
  removeAll: function() {
    this.handlers = {};
  },

  /**
   * Remove all handler's attached to `fn`. All subsequent calls to 
   * `executeHandler(fn)` will no longer have an effect.
   * 
   * @param  {Function} fn the named function that executes handler(s)
   * 
   * @memberOf  tooly.Handler
   * @instance
   * @alias #off
   */
  remove: function(fn) {
    if (this.handlers[fn] !== undefined) {
      this.handlers[fn].length = 0;
    }
  },

  /**
   * executes all handlers attached to the named function.
   * @example
   * var value = 0;
   * var handler = new tooly.Handler();
   * 
   * function inc() { 
   *   value += 10; 
   *   handler.executeHandler('inc');
   * }
   * 
   * function jump() {
   *   this.value *= 2;
   * }
   *
   * handler.on('inc', announce);
   * inc();
   * value; //=> 20;
   * 
   * @param  {(String|Object)} fn the name of the method to execute
   * @return {Object} `this` for chaining
   * 
   * @memberOf  tooly.Handler
   * @instance
   * @alias #exec #trigger
   */
  executeHandler: function(fn) {
    var handler = this.handlers[fn] || [],
        i = 0, len = handler.length;
    for (; i < len; i++) {
      handler[i].apply(this.context, []);
    }
    return this;
  },

  /**
   * alias for #executeHandler
   * 
   * @ignore
   * @memberOf  tooly.Handler
   * @instance
   */
  trigger: function(fn) {
    return this.executeHandler(fn);
  },

  /**
   * Add callbacks to the list of handlers. The callbacks must be an object collection of 
   * key-value pairs where the identifier key is the name of a function that calls the 
   * `executeHandler` method with the same name as the key, while the value is the callback 
   * function itself. This method should not be used if only registering a single callback, 
   * for that use {@link #on}.
   * 
   * @param  {Object} handlers  collection of callback functions
   * @return {Object} `this` for chaining
   * 
   * @memberOf  tooly.Handler
   * @instance
   */
  registerCallbacks: function(callbacks) {
    var t = this, h = {};
    if (callbacks !== undefined) {
      for (h in callbacks) {
        if (callbacks.hasOwnProperty(h)) {
          t.on(h, callbacks[h]);
        }
      }
    }
    return t;
  },

  /**
   * @return {String}
   * @memberOf  tooly.Handler
   * @instance
   */
  toString: function() { 
    return "[Handler ' " + this + " ']"; 
  }
});


_extend(tooly.Timer.prototype, {
  
  /**
   * Start the timer
   *
   * @memberOf  tooly.Timer
   * @instance
   * @category Timer
   */
  start: function() { 
    this.startTime = Date.now(); 
  },

  /**
   * Stop the timer
   * 
   * @return {Number} the time elapsed in milliseconds
   *
   * @memberOf  tooly.Timer
   * @instance
   * @category Timer
   */
  stop: function() { 
    this.endTime = Date.now();
    this.elapsed = this.endTime - this.startTime;
    return this.elapsed;
  },

  /**
   * Stop the timer and log the results to the console.
   * Equivalent of calling #stop then #log
   * 
   * @return {Number} the time elapsed in milliseconds
   *
   * @memberOf  tooly.Timer
   * @instance
   * @category Timer
   */
  end: function() {
    this.stop();
    this.log();
    return this.elapsed;
  },

  /**
   * log results to the console
   *
   * @memberOf  tooly.Timer
   * @instance
   * @category Timer
   */
  log: function() {
    console.log(this.name + ' ' + this.elapsed);
  }
});


_extend(tooly.Logger.prototype, (function() {

  var _cjs = typeof exports === 'object',
      _push = Array.prototype.push,
      _chalk = _cjs ? require('chalk') : null
      _levels = ['dummy','trace','debug','info','warn','error'],
      _colors = [
        'gray', // dummy
        'gray',
        'green',
        _cjs ? 'cyan' : 'blue',
        _cjs ? 'yellow' : 'darkorange',
        'red',
        'gray' // last gray for time
      ],
      _o_re = /%o/gi,
      _j_re = /%j/gi; 
      
  function _log(instance, level, caller, args) {
    if (tooly.Logger.off || instance.level === -1 || level < instance.level || instance.level > 5) {
      return;
    }

    var format = '%s%s', // name, [LEVEL] [HH:mm:ss]
        pargs = []; // final args for console call
    args = _slice.call(args);
    _format_re = _format_re || /\%[ojdifsc]/g;

    if (_cjs) {

      // TODO: replace match with RegExp#test
      if (tooly.type(args[0], 'string') && args[0].match(_format_re)) {
        format += args.shift().replace(_o_re, '%j');
      }
      pargs.unshift(format, _name(instance), _level(level));

    } else { // window
      format = '%c%s%c%s%c%s';
      if (tooly.type(args[0], 'string') && args[0].match(_format_re)) {
        format += args.shift().replace(_j_re, '%o');
      }
      caller = (caller !== undefined && caller.replace(_ws_re, '') === '') ? '' : caller;
      var color = 'color:' + _colors[level] + ';',
          purple = 'color:purple', black = 'color:black';
      pargs = [format, purple, _name(instance), color, _level(level), black, caller];
    }

    _push.apply(pargs, args);

    switch (level) {
      case -1: 
        return;

      case 0: 
        console.log(arguments[3]); 
        break;

      case 2: 
        // there is no console.debug, 
        // so the _levels map (default case) doesn't work there
        console.log.apply(console, pargs); 
        break;

      default: 
        // http://stackoverflow.com/
        // questions/8159233/typeerror-illegal-invocation-on-console-log-apply
        try {
          console[ _levels[level] ].apply(console, pargs);
        } catch(e) {
          console.log('[Logger (recovery mode)] ', pargs);
        }
        break;
    }
  }

  function _checkCaller(args) {
    if (!this.traceAnonymous) return '';
    var name = ''; 
    try { 
      name = args.callee.caller.name; 
    } catch(ignored) {
    }
    if (!name) {
      return  '<anonymous> ' + args.callee.caller + '\n';
    }
    return '<'+name+'> ';
  }

  // helper
  function _name(instance) {
    var name = instance.name || '';
    return (_chalk) ? _chalk.magenta(name) : name;
  }

  // helper
  function _level(level) {
    return _chalkify(level, ' ' + _levels[level].toUpperCase() + ' ') +
      _chalkify(6, '[' + _dateFormatted() + '] ');
  }

  // helper
  function _dateFormatted() {
    function format(n) { return n < 10 ? '0' + n : n }
    var d = new Date();
    return [
      format(d.getHours()),
      format(d.getMinutes()),
      format(d.getSeconds()),
      d.getMilliseconds()
    ].join(':');
  }

  // use chalk if node.js
  function _chalkify(level, str) {
    return (!_chalk) ? str : _chalk[ _colors[level] ](str);
  }

  // public API
  return {
    log:   function() { _log(this, 0, _checkCaller(arguments), arguments); },
    trace: function() { _log(this, 1, _checkCaller(arguments), arguments); },
    debug: function() { _log(this, 2, _checkCaller(arguments), arguments); },
    info : function() { _log(this, 3, _checkCaller(arguments), arguments); },
    warn : function() { _log(this, 4, _checkCaller(arguments), arguments); },
    error: function() { _log(this, 5, _checkCaller(arguments), arguments); }
  };
})());



return tooly;


}));


return tooly;


}));


return tooly;


}));
