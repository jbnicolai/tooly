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
     * copy properties from source object to target
     * 
     * @param  {Object} target the destination object
     * @param  {Object} source the object we are copying
     * @return {Obect} target
     */     
    extend: function(target, source) {
      target = target || {};

      for (var prop in source) {
        if (source.hasOwnProperty(prop)) {

          if (tooly.toType(prop) === 'object') {
            target[prop] = extend(target[prop] = source[prop]);
          } else {
            target[prop] = source[prop];
          }
        }
      }
      
      return target;
    },

    /**
     * Object literal assignment results in creating an an object with Object.prototype
     * as the prototype. This allows us to assign a different prototype while keeping the convenience
     * of literal literation.
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
  };  // end return statement
})(); // end IIFE
