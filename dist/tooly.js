/**
 * tooly - version 0.0.1 (built: 2014-08-18)
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

  /**
   * @namespace  tooly
   * @type {Object}
   */
  var tooly = (function() {
  
    /** @private */
    function _type(o) {
      return ({}).toString.call(o).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
    }
    
    var _ws = /\s+/;
  
    /** @private */
    function _between(str) {
      return new RegExp('\s*' + str + '\s*', 'g');
    }
  
    /** @private */
    function _procArray(el, args, callback) {
      if (_type(arg) === 'array') {
        var ret, 
            i = 0, 
            len = el.length
        for (; i < len; i++) {
          ret = callback(el[i], args);
        }
        return ret;
      }
    }
    
    return {
  
      /**
       * check if an element has a css class
       * 
       * @param  {(Object|Array)} el  such that el or each index of el has nodeType === 1
       * @param  {String}   klass   the css class to add
       * @return {Boolean} true if `el` has `klass`
       * @throws {TypeError} If el is not of nodeType: 1
       */
      hasClass: function(el, klass) {
  
        if (_procArray(el, klass, tooly.hasClass)) return true;
  
        if (el.nodeType === 1) {
  
          var re = _between(klass),
              classes = el.className.split(_ws),
              len = classes.length,
              i = 0;
  
          for (; i < len; i++) {
            if (classes[i].match(re) == klass) {
              return true;
            }
          }
  
          return false;
        }
  
        throw new TypeError(el + ' must be of nodeType: 1');
      },
  
      /**
       * add a css class to element
       * 
       * @param  {(Object|Array)} el  such that el or each index of el has nodeType === 1
       * @param {String} klass the css class to add
       * @return {Object} `tooly` for chaining
       */
      addClass: function(el, klass) {
        _procArray(el, klass, tooly.addClass);
        if (el.nodeType === 1) {
          el.className += ' ' + klass;
        }
        return tooly;
      },
  
      /**
       * remove a css class from an element
       * 
       * @param  {(Object|Array)} el  such that el or each index of el has nodeType === 1
       * @param  {String} klass   the css class to remove
       * @return {Object} `tooly` for chaining
       */
      removeClass: function(el, klass) {
        _procArray(el, klass, tooly.removeClass);
        if (el.nodeType === 1) {
          el.className = el.className.replace(_between(klass), ' ');
        }
        return tooly;
      },
  
      /**
       * prepend content to HTML element(s)
       * 
       * @param  {Object}  el         the element(s) to prepend content to
       * @param  {String}  content    the content to prepend
       * @return {Object} `tooly` for chaining
       */
      prepend: function(el, content) {
        el = el || document;
        if (_type(el) === 'array') {
          for (var i = 0, len = el.length; i < len; i++) {
            if (el[i].nodeType === 1) {
              el[i].innerHTML = content + el[i].innerHTML;
            }
          }
          return tooly
        }
        // if node is not ELEMENT_NODE or DOCUMENT_NODE, do nothing
        if (el.nodeType !== 1 && el.nodeType !== 9) {
          return tooly
        }
        el.innerHTML = content + el.innerHTML;
        return tooly
      },
  
      /**
       * append content to HTML element(s)
       *
       * @param  {Object}  el         the element(s) to append content to
       * @param  {String}  content    the content to append
       * @return {Object} `tooly` for chaining
       */
      append: function(el, content) {
        el = el || document;
        if (_type(el) === 'array') {
          for (var i = 0, len = el.length; i < len; i++) {
            if (el[i].nodeType === 1) {
              el[i].innerHTML += content;
            }
          }
          return tooly;
        }
        // if node is not ELEMENT_NODE or DOCUMENT_NODE, do nothing
        if (el.nodeType !== 1 && el.nodeType !== 9) {
          return tooly;
        }
        el.innerHTML += content;
        return tooly;
      },
  
      /**
       * fill DOM element `el` with `content`.
       * *note - replaces existing content
       * 
       * @param  {(String|Object)} content
       * @param  {Element} el      
       * @return {Object} tooly for chaining
       */
      html: function(el, content) {
        el = el || document;
        if (_type(el) === 'array') {
          for (var i = 0, len = el.length; i < len; i++) {
            if (el[i].nodeType === 1) {
              el[i].innerHTML = content;
            }
          }
          return tooly
        }
        // if node is not ELEMENT_NODE or DOCUMENT_NODE, do nothing
        if (el.nodeType !== 1 && el.nodeType !== 9) {
          return tooly
        }
        el.innerHTML = content;
        return tooly
      },
  
      /**
       * wrapper for HTML5 `querySelector`
       * 
       * @param  {String} selector
       * @param  {Object} context,  the parent element to start searching from 
       *                            defaults to document if blank 
       * @return {Element|null}     the first matched element or null if no match
       */
      select: function(selector, context) {
        context = context || document;
        return context.querySelector(selector);
      },
  
      /**
       * wrapper for HTML5 `querySelectorAll`
       * 
       * @param  {String} selector
       * @param  {Object} context,      the parent element to start searching from 
       *                                defaults to document if blank 
       * @return {Array.<Element>|null} an array of matched elements or an empty array if no match
       */
      selectAll: function(selector, context) {
        var list = (context || document).querySelectorAll(selector),
            els = [],
            i = 0, len = list.length;
        for (; i < len; i++) {
          els[i] = list[i];
        }
        return els;
      },
          /**
       * Function version of ECMAScript6 String.prototype.endsWith
       * @param  {String} str    the string to check
       * @param  {String} suffix the "endWith" we are seeking
       * @return {Boolean}       true if str ends with suffix
       * @see <a href="http://stackoverflow.com/a/2548133">stackoverflow thread</a>
       * @memberOf tooly
       */
      endsWith: function(str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
      },
  
      /**
       * Function version of String.format / sprintf
       * @see  http://stackoverflow.com/a/4673436/2416000
       * @param  {String} format
       * @return {String} 
       * @memberOf tooly
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
       * @memberOf tooly
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
       * Function version of ECMAScript6 String.prototype.repeat without the silly
       * range error checks etc.
       * 
       * @param  {String} str   the string to repeat
       * @param  {Number} n     the number of times to repeat
       * @return {String}       the string repeated, or an empty string if n is 0
       * @memberOf tooly
       */
      repeat: function(str, n) {
        var s = '';
        for (var i = 0; i < n; i++) {
          s += str;
        }
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
       * @memberOf tooly
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
       * @memberOf tooly
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
       * a more useful alternative to the typeof operator
       * 
       * @param  {Object} obj the object
       * @return {String}     the type of object
       * @author Angus Croll
       * @see  <a href=
       * "http://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/">
       * related article
       * </a>
       * @memberOf tooly
       */
      toType: function(obj) {
        return _type(obj);
      }
  
    };  // end return statement
  })(); // end IIFE
  

  return tooly;


}));
