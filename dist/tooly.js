/*!
 * tooly - version 0.0.4 (built: 2014-10-19)
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

  function _type(o, klass) {
    o = ({}).toString.call(o).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
    if (klass) return o === klass.toLowerCase();
    return o;
  }

  var _nativeForEach = Array.prototype.forEach;

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

  // http://stackoverflow.com/a/9229821/2416000
  // function _unique(obj) {
  //   var prims = { 'boolean': {}, 'number': {}, 'string': {} }, 
  //       objs = [];
  //   return obj.filter(function(item) {
  //     var type = typeof item;
  //     return (type in prims) 
  //       ? prims[type].hasOwnProperty(item) ? false : (prims[type][item] = true)
  //       : objs.indexOf(item) >= 0 ? false : objs.push(item);
  //   });
  // }

  // modified from http://stackoverflow.com/a/9229821/2416000
  // TODO: this modifies original arr, find unaltering way
  function _sortUnique(arr) {
    return arr.sort().filter(function(item, pos) {
      return !pos || item != arr[pos-1];
    });
  }

  var _ws = /\s+/;

  function _classReg(str) {
    return new RegExp('\\s*' + str + '\\s*(![\\w\\W])?', 'g');
  }

  function _hasClass(el, klass, re) {
    var classes = el.className.split(_ws);
    return classes.some(function(c) { return c.match(re) == klass; });
  }

  function _addToClassName(el, klasses) {
    if (!el.className) {
      el.className += klasses ? ' ' + klasses : '';
      return;
    }
    var names = el.className;
    // guard against duplicates
    el.className += ' ' + klasses.split(_ws).filter(function(n) {
      return names.indexOf(n) === -1;
    }).join(' ');
  }

  function _node(el) {
    return  el && (el.nodeType === 1 || el.nodeType === 9);
  }

  function _prepEl(el) {
    if (el instanceof tooly.Frankie) {
      return el.els;
    } else if (_type(el, 'string')) {
      return tooly.selectAll(el);
    } else if (_type(el, 'nodelist')) {
      return _toArray(el);
    }
    return el;
  }

  return {

    /**
     * wrapper for HTML5 `querySelector`
     * 
     * @param  {String}  selector valid css selector string
     * @param  {Element} context  the parent element to start searching from 
     *                            defaults to document if blank 
     * @return {Element|null} the first matched element or null if no match
     * 
     * @memberOf  tooly
     * @category Dom
     * @static
     */
    select: function(selector, context) {
      return (_node(context) ? context : document).querySelector(selector);
    },

    /**
     * wrapper for HTML5 `querySelectorAll`
     * 
     * @param  {String}  selector
     * @param  {Element} context   the parent element to start searching from 
     *                             defaults to document if blank 
     * @return {Array<Node>} an array of matched elements or an empty array if no match
     * 
     * @memberOf  tooly
     * @category Dom
     * @static
     */
    selectAll: function(selector, context) {
      return _toArray((_node(context) ? context : document).querySelectorAll(selector));
    },

    /**
     * select all parents element of `elements`.
     * 
     * @param  {Element|String} elements the node element or valid css selector string
     *                             representing the element whose parent will be selected
     * @return {Element|undefined} the parent element of `selector` or 
     *                                 undefined if no parent is found
     *
     * @memberOf  tooly
     * @category Dom
     * @static
     */
    parent: function(elements) {
      var el = _prepEl(elements),
          parents = [];
      if (_node(el)) {
        return el.parentNode;
      } else if (_type(el, 'array')) {
        return _sortUnique(el.map(function(l) { return l.parentNode; }));
      }
      return;
    },

    /**
     * select all first-generation child elements of `elements`.
     *     
     * @param  {Element|String} elements the element or valid css selector string representing
     *                             the element whose children will be returned 
     * @return {Array<Element>|undefined} an array of child elements or undefined 
     *                                       if `elements` has no children
     * @memberOf  tooly
     * @category Dom
     * @static
     */
    children: function(elements) {
      var el = _prepEl(elements);
      if (_node(el)) {
        return el.children;
      } else if (_type(el, 'array')) {
        return el.map(function(l) { return l.children; });
      }
      return;
    },    

    /**
     * check if an element has a css class
     * 
     * @param  {Object|Array<Element>|String} el  the node, array of nodes, or valid css selector
     * @param  {String}   klass   the css class to compare
     * @return {Boolean} true if `el` has `klass`
     *
     * @memberOf  tooly
     * @category Dom
     * @static
     */
    hasClass: function(element, klass) {
      var el = _prepEl(element);
      if (_node(el)) {
        return _hasClass(el, klass, _classReg(klass));
      }
      if (_type(el, 'array')) {
        var re = _classReg(klass);
        return el.some(function(l, i, r) { 
          return _hasClass(r[i], klass, re); 
        });
      }
      return false;
    },

    /**
     * add a css class to element
     * 
     * @param  {Object|Array<Element>|String} element  the node, array of nodes, or valid css selector
     * @param {String|Array<String>} klass the css class(es) to add
     * @return {Object} `tooly` for chaining
     *
     * @memberOf  tooly
     * @category Dom
     * @static
     */
    addClass: function(element, klass) {
      var el = _prepEl(element);
      if (_node(el)) {
        _addToClassName(el, klass);
      } else if (_type(el, 'array')) {
        el.forEach(function(el) { _addToClassName(el, klass); });
      }
      return tooly;
    },

    /**
     * remove a css class from an element
     * 
     * @param  {Object|Array<Element>|String} element  the node, array of nodes, or valid css selector
     * @param  {String} klass   the css class to remove
     * @return {Object} `tooly` for chaining
     *
     * @memberOf  tooly
     * @category Dom
     * @static
     */
    removeClass: function(element, klass) {
      var el = _prepEl(element);
      // "or-ize" for multiple klasses match in regexp
      klass = '(' + klass.split(_ws).join('|') + ')';
      function replace(el) {
        el.className = el.className.replace(_classReg(klass), ' ').trim();
      };
      if (_node(el)) {
        replace(el);
      } else if (_type(el, 'array')) {
        el.forEach(replace);
      }
      return tooly;
    },

    /**
     * prepend `html` to HTML element(s)
     * 
     * @param  {Object}  element  the element(s) to prepend `html` to
     * @param  {String}  html  the html to prepend
     * @return {Object} `tooly` for chaining
     *
     * @memberOf  tooly
     * @category Dom
     * @static
     */
    prepend: function(element, html) {
      var el = _prepEl(element), parent;
      function prepend(el) {
        el.insertAdjacentHTML('afterbegin', html);
      }
      if (_node(el)) {
        prepend(el);
      } else if (_type(el, 'array')) {
        el.forEach(prepend); 
      } 
      return tooly;
    },

    /**
     * append `html` to HTML element(s)
     *
     * @param  {Object}  element  the element(s) to append content to
     * @param  {String}  html     the content to append
     * @return {Object} `tooly` for chaining
     *
     * @memberOf  tooly
     * @category Dom
     * @static
     */
    append: function(element, html) {
      var el = _prepEl(element), parent;
      function append(el) {
        // http://jsperf.com/insertadjacenthtml-perf/14
        el.insertAdjacentHTML('beforeend', html);
      }
      if (_node(el)) {
        append(el);
      } else if (_type(el, 'array')) {
        el.forEach(append); 
      } 
      return tooly;
    },

    /**
     * remove all child nodes (including text) from `element`.
     * 
     * @param  {Element|String|Frankie} element the element to clear of all children
     * @return {Object}         `tooly` for chaining
     *
     * @memberOf  tooly
     * @category Dom
     * @static
     */
    empty: function(element) {
      var el = _prepEl(element);
      if (_type(el, 'array')) {
        el.forEach(function(d) {
          while (d.lastChild) d.removeChild(d.lastChild);
        });
      } else {
        // see http://jsperf.com/innerhtml-vs-removechild/15
        while (el.lastChild) el.removeChild(el.lastChild);
      }
      return tooly;
    },

    /**
     * fill DOM element `el` with `content`. Replaces existing content.
     * If called with 1 arg, the first matched element's innerHTML is returned
     * 
     * @param  {String|Object} content
     * @param  {Element} el      
     * @return {String|Object} the first matched el's innerHTML of null when in get mode,
     *                             otherwise `tooly` for chaining
     * @memberOf  tooly
     * @category Dom
     * @static
     */
    html: function(el, content) {
      // get
      if (arguments.length === 1)  {
        if (_type(el) === 'array' && _node(el[0])) {
          return  el[0].innerHTML;
        } else if (_node(el)) {
          return el.innerHTML;
        } else {
          return tooly.select(el).innerHTML;
        }
      }

      // set
      if (!_node(el)) {
        if (_type(el) === 'array') {
          var i = 0, len = el.length;
          for (; i < len; i++) {
            if (_node(el[i])) {
              el[i].innerHTML = content;
            } else {
              el[i] = tooly.select(el[i]);
              el[i].innerHTML = content;
            }
          }
          return tooly;
        } else {
          tooly.select(el).innerHTML = content;
          return tooly;
        }
      }

      // el is node
      el.innerHTML = content;
      return tooly;
    },

    /**
     * @example
     * ```js
     * // as key val pair (key must also be a string)
     * var el = tooly.select('#main');
     * tooly.css(el, 'background', 'red');
     * 
     * // or as hash (notice that hyphenated keys must be quoted)<br>
     * tooly.css(el, {width: '100px', background: 'red', 'font-size': '24px'});
     *
     * // also can take valid css selector string in place of element
     * // below will match the document's first div
     * tooly.css('div', 'border', '2px solid red');
     * ```
     * 
     * @param  {Element|String}  el     the dom element or valid selector string
     * @param  {String|Object}  styles  either a single comma separated key value pair of strings,
     *                                  or object hash
     * @return {Object} tooly for chaining
     * 
     * @memberOf  tooly
     * @category Dom
     * @static
     */
    css: function(/*mixed*/) {
      var eachStyle = function(el, styles) {
        for (var key in styles) {
          if (styles.hasOwnProperty(key)) {
            el.style[key] = styles[key];
          }
        }
      };

      var el = _prepEl(arguments[0]),
          argsLen = arguments.length,
          styles = {}, 
          isNode = true;

      if (argsLen > 1) {
        // single comma sep key-value pair
        if (argsLen === 3) {
          styles[arguments[1]] = arguments[2];
          // hash
        } else {
          styles = arguments[1];
        }
      }

      // set
      if (styles) {
        if (_node(el)) {
          eachStyle(el, styles);
          return tooly;
        } else if (_type(el, 'array')) {
          isNode = false;
          el.forEach(function(el) { eachStyle(el, styles); });
          return tooly;
        }
      }

      // get
      return isNode ? el.style : el[0].style || undefined;
    },

    /**
     * get or set a(n) html attribute(s)
     * 
     * @param  {Element|String|Frankie} element the element
     * @param  {String} a  the attribute to get/set
     * @param  {String|Number|null} the value of the attribute `a` (set)
     * @return {Element|Object|String}
     *
     * @memberOf  tooly
     * @category Dom
     * @static
     */
    attr: function(/*mixed*/) {
      var el = _prepEl(arguments[0]), 
          argsLen = arguments.length,
          attr, // our return value
          a, // the passed attribute or attributes hash
          isArray = _type(el, 'array');

      if ((!isArray && !_node(el)) || argsLen <= 1 || argsLen > 3) {
        return null;
      }

      a = arguments[1];

      if (argsLen === 2) {
        
        if (_type(a, 'object')) {
          // SET (hash)
          for (var prop in a) {
            if (a.hasOwnProperty(prop)) {
              if (isArray) {
                el.forEach(function(d) { d.setAttribute(prop, a[prop]); });
              } else {
                el.setAttribute(prop, a[prop]);
              }
            }
          }
        } else {
          // GET
          attr = (isArray ? el[0] : el).getAttribute(a);
          return (attr === '') ? null : attr;
        }

      } else { // SET (single comma sep key-val pair)
        if (isArray) {
          var value = arguments[2];
          el.forEach(function(d) { d.setAttribute(a, value); });
        } else {
          el.setAttribute(a, arguments[2]);
        }
      }
      return tooly;
    },

    /**
     * The Frankie class - named after the late, great DJ Frankie Knuckles (one of the greatest) 
     * _selectors_ of all time ;) - provides a jQuery style wrapper around most
     * tooly#dom methods except for #select and #selectAll. 
     * Selection instead is done through the Frankie constructor, which will keep
     * an internal reference to a selectAll query on the passed `el`. All dom
     * methods that can be called directly from tooly can instead be called
     * from the Frankie instance without their first argument, for example:
     * `tooly.css('.myDiv', {color:'red'})` and 
     * `tooly.Frankie('.myDiv').css({color:'red'})` are equivalent. It is also
     * important to note that all methods return the instance for easy chainability,
     * expect when either `css()` or `html()` are called without any arguments, which makes
     * them getters. Methods `parent` and `children` will return the instance as well, 
     * instead setting the internal selection reference to the parents or children of the 
     * previous selection, for example, with markup `<div><p></p></div>`, 
     * `tooly.Frankie('p').parent().css('background', 'orange');` would change the div's 
     * background orange.
     * 
     * 
     * Another usage example:
     * @example
     * ```js
     * // alias the Frankie namespace
     * var $ = tooly.Frankie.bind(this);
     * var $divs = $(divs);
     * $divs.css({color:'green'});
     * // multiple yet separate selectors must be comma separated
     * $('div, p')
     *   .addClass('purple')
     *   .addClass('yellow')
     *   .removeClass('g')
     *   .css({'border-radius':'4px'})
     *   .prepend('<h1>---</h1>')
     *   .append('<h1>+++</h1>')
     *   .html('H T M L');
     * ```
     *   
     * @param {Element} el valid css selector string, can contain multiple 
     *                     selectors separated my commas (see the example)
     * @class Frankie
     * @constructor
     * @category Dom
     * @memberOf  tooly
     * @static                    
     */
    Frankie: function(el, context) {
      if (!(this instanceof tooly.Frankie)) {
        return new tooly.Frankie(el, context);
      }
      this.els = _node(el) ? [el] : tooly.selectAll(el, context);
      return this;
    },


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
     * @category  Object
     * @static 
     */
    each: function(obj, iterator, context) {
      return _each(obj, iterator, context);
    },
    
    /**
     * @param  {Function} ctor 
     * @param  {Object|Array} args 
     * @return {Object}
     * 
     * @memberOf  tooly
     * @category  Object
     * @static      
     */
    construct: function(ctor, args) {
      // the stupid name leads to more revealing output in logs
      function ToolySurrogateConstructor() {
        return (_type(args) === 'array') 
          ? ctor.apply(this, args) 
          : ctor.call(this, args);
      }
      ToolySurrogateConstructor.prototype = ctor.prototype;
      return new ToolySurrogateConstructor();
    },

    /**
     * quick and dirty port of [node.extend](https://github.com/dreamerslab/node.extend)
     * which is in turn a port of jQuery.extend, slightly modified for tooly compatibility.
     * Copyright 2011, John Resig
     * Dual licensed under the MIT or GPL Version 2 licenses.
     * http://jquery.org/license
     * 
     * @see  http://api.jquery.com/jquery.extend/
     * 
     * @memberOf  tooly
     * @category  Object
     * @static
     */     
    extend: function() {
      var target = arguments[0] || {},
          i = 1,
          length = arguments.length,
          deep = false,
          options, name, src, copy, copy_is_array, clone;

      // Handle a deep copy situation
      if (_type(target) === 'boolean') {
        deep = target;
        target = arguments[1] || {};
        // skip the boolean and the target
        i = 2;
      }

      // Handle case when target is a string or something (possible in deep copy)
      if (_type(target) !== 'object' && _type(target) !== 'function') {
        target = {};
      }

      for (; i < length; i++) {
        // Only deal with non-null/undefined values
        options = arguments[i]
        if (options != null) {
          if (_type(options) === 'string') {
            options = options.split('');
          }
          // Extend the base object
          for (name in options) {
            src = target[name];
            copy = options[name];

            // Prevent never-ending loop
            if (target === copy) {
              continue;
            }

            // Recurse if we're merging plain objects or arrays
            if (deep && copy && 
                (tooly.isHash(copy) || (copy_is_array = _type(copy) === 'array'))) {
              if (copy_is_array) {
                copy_is_array = false;
                clone = src && _type(src) === 'array' ? src : [];
              } else {
                clone = src && tooly.isHash(src) ? src : {};
              }

              // Never move original objects, clone them
              target[name] = tooly.extend(deep, clone, copy);

            // Don't bring in undefined values
            } else if (typeof copy !== 'undefined') {
              target[name] = copy;
            }
          }
        }
      }

      // Return the modified object
      return target;
    },

    /**
     * Object literal assignment results in creating an an object with Object.prototype
     * as the prototype. This allows us to assign a different prototype while keeping 
     * the convenience of literal declaration.
     * 
     * @param  {Object} prototype
     * @param  {Object} object    
     * @return {Object}
     * 
     * @author Yehuda Katz (slightly modified)
     * @see http://yehudakatz.com/2011/08/12/understanding-prototypes-in-javascript/
     * 
     * @memberOf  tooly
     * @category  Object
     * @static 
     */
    fromPrototype: function(prototype, object) {
      var newObject = tooly.objectCreate(prototype), 
          prop;
      for (prop in object) {
        if (object.hasOwnProperty(prop)) {
          newObject[prop] = object[prop];      
        }
      }
      return newObject;
    },

    /**
     * Helper to perform prototypal inheritance.
     * Note that this method overwrites the child's original prototype.
     * Also note that the child's constructor needs to call `parent.call(this)`
     *
     * @example
     * ```js
     * function Parent() {}
     * Parent.prototype.b = 2;
     * function Child() { Parent.call(this); } // this is a must
     * tooly.inherit(Parent, Child, { a: 1 });
     * var child = new Child();
     * console.log(child.a + child.b); //=> 3
     * // for a more practical example see the tooly.Handler documentation.
     * ```
     * 
     * @param  {Function} parent
     * @param  {Function} child  
     * @param  {Mixed} extend additional members to the Child's prototype 
     * 
     * @memberOf  tooly
     * @category  Object
     * @static
     */
    inherit: function(parent, child, extend) {
      child.prototype = new parent();
      child.prototype.constructor = child;
      for (var prop in extend) {
        if (extend.hasOwnProperty(prop)) {
          child.prototype[prop] = extend[prop];
        }
      }
    },

    /**
     * port of is.hash
     * 
     * Test if `value` is a hash - a plain object literal.
     *
     * @param {Mixed} value value to test
     * @return {Boolean} true if `value` is a hash, false otherwise
     * 
     * @see https://github.com/enricomarino/is/blob/master/index.js
     * @author Enrico Marino (with minor edits)
     * 
     * @memberOf  tooly
     * @category  Object
     * @static
     */
    isHash: function(val) {
      return _type(val) === 'object' && val.constructor === Object && 
        !val.nodeType && !val.setInterval;
    },


    /**
     * perform a get xhr request for JSON file
     * 
     * @param  {String}   jsonFile  url
     * @param  {callback} success   function to operate on response data
     *                              if the request is successful. If so, success
     *                              takes a single data parameter (the response).
     * @param {Boolean}   async     defaults to true
     *
     * @memberOf tooly
     * @category XHR
     * @static
     */
    getJSON: function(jsonFile, success, async) {
      tooly.get(jsonFile, 'json', success, async);
    },

    /**
     * perform a get xhr request
     * 
     * @param  {String}   url       url to resource
     * @param  {String}   respType  the request responseType
     * @param  {callback} success   function to operate on response data
     *                              if the request is successful. If so, success
     *                              takes a single data parameter (the response).
     * @param {Boolean}   async     defaults to true
     *
     * @memberOf tooly
     * @category XHR
     * @static
     */
    get: function(url, respType, success, async) {
      var req = new XMLHttpRequest();
      req.open('get', url, (arguments.length === 3) ? true : async);
      req.reponseType = respType;
      req.onload = function() {
        if (req.readyState == 4) { // done
          if (req.status == 200) {
            success(respType === 'json' ? JSON.parse(req.response) : req.response);
          }
        }
      };
      req.send();
    },


		/**
		 * Function version of ECMAScript6 `String.prototype.endsWith`.
		 * 
		 * @param  {String} str    the string to check
		 * @param  {String} suffix the "endWith" we are seeking
		 * @return {Boolean}       true if str ends with suffix
		 *
		 * @see  http://stackoverflow.com/a/2548133
		 * @memberOf tooly
		 * @category core
		 * @static
		 */
		endsWith: function(str, suffix) {
		  return str.indexOf(suffix, str.length - suffix.length) !== -1;
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
		 * @param  {String} format
		 * @return {String}
		 * 
		 * @see  http://stackoverflow.com/a/4673436/2416000
		 * @memberOf tooly
		 * @category core
		 * @static
		 */
		format: function(format) {
		  var args = Array.prototype.slice.call(arguments, 1);
		  return format.replace(/{(\d+)}/g, function(match, number) { 
				return typeof args[number] != 'undefined' ? args[number] : match;
		  });
		},

		/**
		 * Utility method to convert milliseconds into human readable time
		 * 
		 * @param  {Number} time the time value in milliseconds
		 * @return {String}      `time` formatted as hh:mm:ss
		 * 
		 * @memberOf tooly
		 * @category core
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
		 * @category core
		 * @static
		 */
		formatMoney: function(n) {
		  var number = tooly.type(n, 'number') ? n : +n;
		  return number.toFixed(2).replace(/./g, function(c, i, a) {
				return i && c !== '.' && !((a.length - i) % 3) ? ',' + c : c;
		  });
		},

		/**
		 * Function version of ECMAScript6 `String.prototype.repeat`
		 * 
		 * @param  {String} str   the string to repeat
		 * @param  {Number} n     the number of times to repeat
		 * @return {String}       the string repeated, or an empty string if n is 0
		 * 
		 * @memberOf tooly
		 * @category core
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
		 * @category core
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
		 * @param {Boolean} trailingSlash keeps last slash after relative part if true,
		 *                                though does not add a trailing slash if it wasn't
		 *                                there to begin with
		 * @return {String}                               
		 * 
		 * @memberOf tooly
		 * @category core
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
		 * @category core
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
		 * @category core
		 * @static
		 */
		stripExtension: function(str) {
		  return str.substring(0, str.lastIndexOf('.'));
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
		 * @category core
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
		 * @alias type
		 * @author Angus Croll
		 * @see  http://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator
		 * 
		 * @memberOf tooly
		 * @category core
		 * @static
		 */
		toType: function(obj, klass) {
		  return _type(obj, klass);
		},

		/*! @alias for #toType */
		type: function(o, k) { 
		  return _type(o, k); 
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
		 * @category core
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
		 * @category core
		 * @static
		 */
		rPad: function(v, len, symbol) {
		  var n = len - v.length;
		  return (n > 0) ? v + tooly.repeat(symbol || ' ', n) : v;
		},


    /**
     * Constructor.
     * 
     * @param {Object}  context   (optional) designates the owner of the `handlers` array that holds 
     *                            all callbacks. When blank the Handler instance uses its own internal
     *                            array. If you'd like to keep track of the handlers outside of the
     *                            instance, pass a context such that context.handlers is an array.
     * @class  Handler
     * @constructor
     * @category  Handler
     * @memberOf  tooly
     */
    Handler: function(context) {
      if (!(this instanceof tooly.Handler)) {
        return new tooly.Handler(context);
      }
      this.context = context || this;
      this.handlers = this.context.handlers = {};
      return this;
    },
    

    /**
     * Timer class constructor. Contains various methods for timing
     * of code execution.
     *  
     * @param {String} name [optional] name
     * 
     * @category Timer
     * @class  tooly.Timer
     * @constructor
     * @memberOf tooly
     */
    Timer: function(name) {
      // enable instantiation without new
      if (!(this instanceof tooly.Timer)) {
        return new tooly.Timer(name);
      }
      this.name = name || 'Timer_instance_' + Date.now();
      return this; 
    },


		/**
		 * Class constructor. Typical logging functionality that wraps around console.log
		 * with css coloring and level control. The Logger level hierarchy is as follows:
		 *
		 * - -1: off
		 * - 0: log (no difference from console.log)
		 * - 1: trace
		 * - 2: debug
		 * - 3: info
		 * - 4: warn
		 * - 5: error
		 *
		 * Only calls that are greater or equal to the current Logger.level will be run.
		 *
		 * ## Format
		 * Format strings follow the same usage as node.js or the web interface, depending
		 * on what environment you are in.
		 * - node
		 *   + %s, %j, and %d can be used for 'string', 'json', or 'number'
		 * - browser
		 *   + %s or %o can be used in place of 'string' or 'object'
		 * 
		 * ## Example
		 * ```js
		 * var logger = new tooly.Logger(2, 'TEST_LOGGER');
		 * logger.trace(logger); // will not output
		 * ```
		 * 
		 * All active loggers in the current context can be disabled, regardless of level,
		 * by setting the static `tooly.Logger.off = true`. Setting back to false will resume
		 * logging at each loggers previous level.
		 * 
		 * @param {Number} level set the level of this logger. Defaults to 2 (debug) if no
		 *                       arguments are passed.
		 * @param {String} name  optional name to identify this instance. The name will preceed any
		 *                       output message
		 *
		 * @category Logger
		 * @class  Logger
		 * @constructor
		 * @memberOf  tooly
		 * @static
		 */
		Logger: function(level, name) {
		  var logger = this;
		  tooly.Logger.loggers = tooly.Logger.loggers || [];
		  // enable instantiation without new
		  if (!(logger instanceof tooly.Logger)) {
				logger = new tooly.Logger(level, name);
				tooly.Logger.loggers.push(logger);
		  }
		  logger.level = (level !== undefined) ? level : 2;
		  if (name) logger.name = name;
		  // automatically set this false as its only 
		  // for emergency "must track anonymous function location" purposes
		  logger.traceAnonymous = false;
		  return logger;
		},


  };
})();

tooly.Frankie.prototype = {

  /**
   * @memberOf tooly.Frankie
   * @instance
   */
  get: function(i) {
    return this.els[i];
  },

  /**
   * @memberOf tooly.Frankie
   * @instance
   */
  eq: function(i) {
    // TODO: test parent vs document
    return new tooly.Frankie(this.els[i], this.parent());
  },

  /**
   * @memberOf tooly.Frankie
   * @instance
   */
  zilch: function() {
    return this.els.length === 0;
  },

  /**
   * @memberOf tooly.Frankie
   * @instance
   */
  parent: function() {
    var parents = tooly.parent(this.els),
        frankie = new tooly.Frankie();
    if (parents instanceof Array) {
      frankie.els = parents;
    }
    return frankie;
  },

  /**
   * @memberOf tooly.Frankie
   * @instance
   */
  children: function() {
    var children = tooly.children(this.els),
        frankie = new tooly.Frankie();
    if (children instanceof Array) {
      frankie.els = children;
    }
    return frankie;
  },  

  /**
   * @memberOf tooly.Frankie
   * @instance
   */
  hasClass: function(klass) {
    return tooly.hasClass(this.els, klass);
  },

  /**
   * @memberOf tooly.Frankie
   * @instance
   */
  addClass: function(klass) {
    tooly.addClass(this.els, klass);
    return this;
  },

  /**
   * @memberOf tooly.Frankie
   * @instance
   */
  removeClass: function(klass) {
    tooly.removeClass(this.els, klass);
    return this;
  },

  /**
   * @memberOf tooly.Frankie
   * @instance
   */
  prepend: function(content) {
    tooly.prepend(this.els, content);
    return this;
  },

  /**
   * @memberOf tooly.Frankie
   * @instance
   */
  append: function(content) {
    tooly.append(this.els, content);
    return this;
  },

  /**
   * @memberOf tooly.Frankie
   * @instance
   */
  html: function(content) {
    // set
    if (content) {
      tooly.html(this.els, content);
      return this;
    }
    // get
    return tooly.html(this.els[0]);
  },
  
  /**
   * @memberOf tooly.Frankie
   * @instance
   */  
  css: function() {
    var args = [this.els];
    [].push.apply(args, arguments);
    tooly.css.apply(null, args);
    return this;
  },

  /**
   * @memberOf tooly.Frankie
   * @instance
   */
  attr: function() {
    var args = [this.els];
    [].push.apply(args, arguments);
    var ret = tooly.attr.apply(null, args);
    // return (ret instanceof tooly) ? this : ret;
    return ret;
  }
};

tooly.Handler.prototype = {

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
};


tooly.Timer.prototype = (function() {

  var _start, _end, _elapsed;

  return {

    /**
     * Start the timer
     *
     * @memberOf  tooly.Timer
     * @instance
     * @category Timer
     */
    start: function() { 
      _start = Date.now(); 
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
      _end = Date.now();
      _elapsed = _end - _start;
      return _elapsed; 
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
      return _elapsed;
    },

    /**
     * log results to the console
     *
     * @memberOf  tooly.Timer
     * @instance
     * @category Timer
     */
    log: function() {
      console.log(this.name + ' ' + _elapsed);
    },

    /**
     * "funkyTime" - think "Function Execution Time".
     * Get the total, individual, and average execution times of `fn` called `n` times.
     * `funkyTime`, though technically is an instance method, can be invoked statically -
     * best bound for convenience - use:
     * `var funkyTime = tooly.Timer.prototype.funkyTime.bind(this);`
     *
     * @example
     * ```js
     * // setup code
     * var data = [], i = 0, n = 99000;
     * for (; i < n; i++) data.push(Math.random()*(1/3));
     *
     * // run a sort five times
     * var results = funkyTime(function() {
     *   var rndm = data.sort();
     * }, 5);
     *
     * results;
     * // returns something like:
     * // { stack: [ 692, 720, 730, 722, 735 ],
     * //   total: 735,
     * //   average: 147,
     * //   offset: 15.2 }
     * ```
     * 
     * @param  {Function} fn the function that will be timed  
     * @param  {number}   n  the number of times to run the function (defaults to 1)  
     * @return {Object}      a hash of timing results with the following signature:
     * + stack <Array[Number]>: the time of each iteration 
     * + total <Number>: the total of all iterations
     * + average <Number>: the average of all iterations
     * + offset <Number>: the difference between the total time to run 
     * the iteration loop and the sum of all iteration times - basically
     * the loop and Timer overhead.
     * @memberOf  tooly.Timer
     * @instance
     * @category Timer
     */
    funkyTime: function(fn, n) {
      var tx = tooly.Timer(),
          ix = tooly.Timer(),
          stack = [],
          i = end = avg = 0;
      n = n || 1;
      tx.start();
      for (; i < n; i++) {
        ix.start();
        fn.call();
        stack.push(ix.stop());
      }
      end = tx.stop();
      avg = end/n;
      return { 
        stack: stack,
        total: end,
        average: avg,
        offset: (function() {
          var sum = 0;
          stack.forEach(function(x) { sum += x; });
          return parseFloat((end - (sum/n)).toFixed(2));
        })()
      };
    }
  }
})();


tooly.Logger.prototype = (function() {

  var _cjs = typeof exports === 'object',
      _slice = Array.prototype.slice,
      _push = Array.prototype.push,
      _chalk = _cjs ? require('chalk') : null
      _levels = ['dummy','trace','debug','info','warn','error'],
      _colors = ['gray', // dummy
        'gray',
        'green',
        _cjs ? 'cyan' : 'blue',
        _cjs ? 'yellow' : 'darkorange',
        'red',
        'gray' // last gray for time
      ]; 
      // _colors = {'800080','008000','0000FF','FFA500','FF0000'};
      
  function _log(instance, level, caller, args) {
    if (tooly.Logger.off || instance.level === -1 || level < instance.level || instance.level > 5) {
      return;
    }

    args = _slice.call(args);
    var format = '%s%s', // name, [LEVEL] [HH:mm:ss]
        pargs = []; // final args for console call

    if (_cjs) {
      if (tooly.type(args[0], 'string') && args[0].match(/\%(s|j|d|o)/g)) {
        // let %o work in node too
        format += args.shift().replace(/%o/gi, '%j');
      }
      pargs.unshift(format, _name(instance), _level(level));

    } else { // window
      // TODO: string output in Chrome is more readable within array,  
      // format %s the same way
      
      format = '%c%s%c%s%c%s';
      if (tooly.type(args[0], 'string') && args[0].match(/\%(c|s|o|O|d|i|f)/g)) {
        format += args.shift();
      }
      caller = (caller !== undefined && caller.replace(/\s+/, '') === '') ? '' : caller;
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
    var name = ''; 
    try { 
      name = args.callee.caller.name; 
    } catch(ignored) {
    }
    if (!name && this.traceAnonymous) {
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
      // _chalkify(6, '[' + new Date().toLocaleTimeString() + '] ');
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
})();



return tooly;


}));
