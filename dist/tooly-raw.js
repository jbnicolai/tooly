/**
 * tooly - version 0.0.1 (built: 2014-09-15)
 * js utility functions
 * https://github.com/Lokua/tooly.git
 * Copyright (c) 2014 Joshua Kleckner
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/MIT
 */

/**
 * @namespace  tooly
 * @type {Object}
 */
var tooly = (function() {

  function _type(o) {
    return ({}).toString.call(o).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
  }
  
  var _ws = /\s+/;

  function _re(str) {
    return new RegExp('\\s*' + str + '\\s*(?![\\w\\W])', 'g');
  }

  /**
   * loop over args array
   */
  function _proc_1(el, args, callback) {
    if (_type(args) === 'array') {
      var ret, 
          i = 0, len = el.length;
      for (; i < len; i++) {
        ret = callback(el[i], args);
      }
      return ret;
    }
  }

  /**
   * loop over el array
   */
  function _proc_2(el, content, callback) {
    if (_type(el) === 'array') {
      var ret, 
          i = 0, len = el.length;
      for (; i < len; i++) {
        callback(el[i], content);
      }
    }
  }

  function _node(el) {
    return  el && (el.nodeType === 1 || el.nodeType === 9);
  }
  
  var _slice = Array.prototype.slice;

  function _checkCaller(args) {
    var name = args.callee.caller.name;
    if (!name && tooly.logger.traceAnonymous) {
      return  '<anonymous> '+ args.callee.caller + '\n';
    }
    return name;
  }

  function _log(level, caller, args) {
    if (tooly.logger.level === 0 || level < tooly.logger.level) return;

    var logger = tooly.logger,
        args = args.length > 1 ? _slice.call(args, 0) : args[0],
        caller = (caller.replace(_ws, '') === '') ? '' : caller + ' \t',
        s = '%c%s%c%s%' + (args.length > 1 ? 'o' : 's'),
        callerCSS = 'color: #0080FF; font-style: italic',
        caller = '';

    switch(level) {
      case 0: return;
      case 1: console.trace(s, 'color: #800080;', '[TRACE] ', callerCSS, caller, args); break;
      case 2: console.log  (s, 'color: #008000;', '[DEBUG] ', callerCSS, caller, args); break;
      case 3: console.info (s, 'color: #0000FF;', '[INFO] ',  callerCSS, caller, args); break;      
      case 4: console.warn (s, 'color: #FFA500;', '[WARN] ',  callerCSS, caller, args); break;
      case 5: console.error(s, 'color: #FF0000;', '[ERROR] ', callerCSS, caller, args); break;
      default: return; // level = 0 = off
    }
  }

  return {

//    +------------+
//    | DOM MODULE |
//    +------------+    
    /**
     * check if an element has a css class
     * 
     * @param  {(Object|Array)} el  such that el or each index of el has nodeType === 1
     * @param  {String}   klass   the css class to add
     * @return {Boolean} true if `el` has `klass`
     * @throws {TypeError} If el is not of nodeType: 1
     */
    hasClass: function(el, klass) {
      if (!_node(el)) return false;
      if (_proc_1(el, klass, tooly.hasClass)) return true;
      // if (el.nodeType === 1) {
        var re = _re(klass),
            classes = el.className.split(_ws),
            i = 0, len = classes.length;
        for (; i < len; i++) {
          if (classes[i].match(re) == klass) return true;
        }
        return false;
      // }
    },

    /**
     * add a css class to element
     * 
     * @param  {(Object|Array)} el  such that el or each index of el has nodeType === 1
     * @param {String} klass the css class to add
     * @return {Object} `tooly` for chaining
     */
    addClass: function(el, klass) {
      if (!_node(el)) return tooly;
      _proc_1(el, klass, tooly.addClass);
      el.className += ' ' + klass;
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
      if (!_node(el)) return tooly;
      _proc_1(el, klass, tooly.removeClass);
      el.className = el.className.replace(_re(klass), ' ');
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
      if (!_node(el)) return tooly;
      _proc_2(el, content, tooly.prepend);
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
      if (!_node(el)) return tooly;
      _proc_2(el, content, tooly.append);
      el.innerHTML += content;
      return tooly;
    },

    /**
     * fill DOM element `el` with `content`. Replaces existing content.
     * If called with 1 arg, the first matched element's innerHTML is returned
     * 
     * @param  {(String|Object)} content
     * @param  {Element} el      
     * @return {String} content or the first matched el's innerHTML if content is not passed
     */
    html: function(el, content) {
      // get
      if (arguments.length === 1)  {
        if (_type(el) === 'array' && _node(el[0])) {
          return  el[0].innerHTML;
        } else if (_node(el)) {
          return el.innerHTML;
        } else {
          return;
        }
      }
      
      // set each in
      if (!_node(el) && _type(el) === 'array') {
        for (var i = 0; i < el.length; i++) {
          if (_node(el[i])) el[i].innerHTML = content;
        }
        return content;
      }

      // set
      el.innerHTML = content;
      return content;
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
      return (context || document).querySelector(selector);
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
     * @example
     * // as key val pair (key must also be a string)<br>
     * var el = tooly.select('#main'); <br>
     * tooly.css(el, 'background', 'red'); <br>
     * // or as hash (notice that hyphenated keys must be quoted)<br>
     * tooly.css(el, {width: '100px', background: 'red', 'font-size': '24px'});
     * @param  {Object}         el     the dom element
     * @param  {String|Object}  styles either a single comma separated key value pair of strings,
     *                                 or object hash
     * @return {Object}         el
     */
    css: function(el, styles) {
      if (!_node(el)) return el;
      if (arguments.length === 3) {
        el.style[arguments[1]] = arguments[2];
      } else {
        for (var key in styles) {
          el.style[key] = styles[key];
        }
      }
      return el;
    },


//    +---------------+
//    | OBJECT MODULE |
//    +---------------+
    /**
     * @param  {Function} ctor 
     * @param  {Object|Array} args 
     * @return {Object}      
     */
    construct: function(ctor, args) {
      // the stupid name leads to more revealing output in logs
      function ToolySurrogateConstructor() {
        return (_type(args) === 'array') ? 
          ctor.apply(this, args) : ctor.call(this, args);
      }
      ToolySurrogateConstructor.prototype = ctor.prototype;
      return new ToolySurrogateConstructor();
    },    
    /**
     * quick and dirty port of node.extend by dreamerslab <ben@dreamerslab.com>
     * https://github.com/dreamerslab/node.extend
     * 
     * which is in turn a port of jQuery.extend
     * Copyright 2011, John Resig
     * Dual licensed under the MIT or GPL Version 2 licenses.
     * http://jquery.org/license
     *
     * slightly modified for tooly compatibility.
     * @see  http://api.jquery.com/jquery.extend/ for usage info
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
     * the convenience of literal literation.
     * 
     * @param  {Object} prototype
     * @param  {Object} object    
     * @return {Object}
     * @author Yehuda Katz (slightly modified)
     * @see http://yehudakatz.com/2011/08/12/understanding-prototypes-in-javascript/ 
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
     * alias for #fromPrototype
     */
    fromProto: function(prototype, object) {
      return tooly.fromPrototype(prototype, object);
    },

    /**
     * note - overwrites original child.prototype
     * note - the child's constructor needs to call `parent.call(this)`
     * 
     * @param  {Function} parent
     * @param  {Function} child  
     * @param  {Object} extend additional methods to add to prototype
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
     * @see https://github.com/enricomarino/is/blob/master/index.js
     * @author Enrico Marino
     */
    isHash: function(val) {
      return _type(val) === 'object' && val.constructor === Object && 
        !val.nodeType && !val.setInterval;
    },


    /**
     * function version of ECMA5 Object.create
     * 
     * @param  {Object} o  the object/base prototype
     * @return {Object}    new object based on o prototype
     */
    objectCreate: function(o) {
      var F = function() {};
      F.prototype = o;
      return new F();
    },
    
    /**
     * Equivalent of Object.keys(obj).length
     * 
     * @param  {Object} obj the object whose ownProperties we are counting
     * @return {number}     the number of "ownProperties" in the object
     * @memberOf tooly
     */
    propCount: function(obj) {
      var count = 0;
      for (var o in obj) {
        if (obj.hasOwnProperty(o)) {
          count++;
        }
      }
      return count;
    },

    /**
     * get an array of an object's "ownProperties"
     * 
     * @param  {Object} obj     the object of interest
     * @return {Array.<Object>} the "hasOwnProperties" of obj
     * @memberOf tooly
     */
    propsOf: function(obj) {
      var props = [];
      for (var o in obj) {
        if (obj.hasOwnProperty(o)) {
          props.push(o);
        }
      }
      return props;
    },


//    +------------+
//    | XHR MODULE |
//    +------------+
    /**
     * perform a get xhr request for JSON file
     * 
     * @param  {String}   jsonFile  url
     * @param  {callback} success   function to operate on response data
     *                              if the request is successful. If so, success
     *                              takes a single data parameter (the response).
     * @param {Boolean}   async     defaults to true
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
     */
    get: function(url, respType, success, async) {
      var req = new XMLHttpRequest();
      req.open('get', url, (arguments.length === 3) ? true : async);
      req.reponseType = respType;
      req.onload = function() {
        if (req.readyState == 4) { // done
          if (req.status == 200) success(req.response);
        }
      };
      req.send();
    },


//    +---------------+
//    | LOGGER MODULE |
//    +---------------+
    /**
     * configuration options for logging methods.
     * levels: 0:off, 1:trace, 2:debug, 3:info, 4:warn, 5:error
     * @type {Object}
     */
    logger: {
      level: 1,
      traceAnonymous: false
    },

    trace: function() { _log(1, _checkCaller(arguments), arguments); },
    debug: function() { _log(2, _checkCaller(arguments), arguments); },
    info : function() { _log(3, _checkCaller(arguments), arguments); },
    warn : function() { _log(4, _checkCaller(arguments), arguments); },
    error: function() { _log(5, _checkCaller(arguments), arguments); },


//    +-------------+
//    | CORE MODULE |
//    +-------------+
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
      var args = _slice.call(arguments, 1);
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
    },


//    +----------------+
//    | HANDLER MODULE |
//    +----------------+
    
    /**
     * Constructor.
     * 
     * @class  Handler
     * @constructor
     * @param {Object}  context   (optional) designates the owner of the `handlers` array that holds 
     *                            all callbacks. When blank the Handler instance uses its own internal
     *                            array. If you'd like to keep track of the handlers outside of Handler,
     *                            pass the parent owner of @param `handler` as context.
     */
    Handler: function(context) {
      this.context = context || this;
      this.context.handlers = [];
      this.handlers = this.context.handlers;
      return this;
    },
    

  };
})();

tooly.Handler.prototype = {

  /**
   * Register an event handler for a named function.
   * 
   * @param  {(String|Function)} fn   the function that will call the handler when executed
   * @param  {callback}   handler the handler that we be called by the named function
   * @return {Object} `this` for chaining
   * @memberOf  Handler
   * @instance
   * @method
   */
  on: function(fn, handler) {
    if (this.handlers[fn] === undefined) {
      this.handlers[fn] = [];
    }
    this.handlers[fn].push(handler);
    return this;
  },

  /**
   * executes all handlers attached to the name function.
   * 
   * @param  {(String|Object)} fn the name of the method to execute
   * @return {Object} `this` for chaining
   * @memberOf  Handler
   * @instance
   * @method
   */
  executeHandler: function(fn) {
    var handler = this.handlers[fn] || [],
        len = handler.length,
        i;
    for (i = 0; i < len; i++) {
      handler[i].apply(this.context, []);
    }
    return this;
  },

  /**
   * alias for #executeHandler
   * @see  #executeHandler
   */
  exec: function(fn) {
    return this.executeHandler(fn);
  },

  /**
   * Add callbacks to the list of handlers. The callbacks must be an object collection of 
   * key-value pairs where the identifier key is the name of a function that calls the executeHandler
   * method with the same name as the key, while the value is the callback 
   * function itself. This method should not be used if only registering a single callback, 
   * for that use {@link #on}.
   * 
   * @param  {Object} handlers  collection of callback functions
   * @return {Object} `this` for chaining
   * @memberOf  Handler
   * @instance
   * @method
   */
  registerCallbacks: function(callbacks) {
    var t = this;
    if (callbacks !== undefined) {
      for (var h in callbacks) {
        if (callbacks.hasOwnProperty(h)) {
          t.on(h, callbacks[h]);
        }
      }
    }
    return t;
  },

  toString: function() { 
    return "[Handler ' " + this + " ']"; 
  }
};


