//    +--------+
//    | OBJECT |
//    +--------+

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
 * @category Object
 * @static
 */
scale: function(n, oldMin, oldMax, min, max) {
  return (((n-oldMin)*(max-min)) / (oldMax-oldMin)) + min; 
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
 * @category Object
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
 * Extensively check if `obj` is "falsy". 
 * <br>
 * ### isFalsy returns true for the following:
 * ```js
 * var undefinedValue;
 * var nullValue             = null;
 * var setUndefined          = undefined;
 * var falseValue            = false;
 * var zero                  = 0;
 * var emptyString           = ''; // same for ' \n\t   \n'
 * var falseString           = 'false';
 * var zeroString            = '0';
 * var nullString            = 'null';
 * var undefinedString       = 'undefined';
 * ```
 * Note that in the cases of falsy strings, the check is 
 * done after a call to `String.trim`, so surrounding 
 * whitespace is ignored: 
 * `isFalsy('\n\t false   \n') //=> true`
 * 
 * @param  {mixed}  obj the object to check
 * @return {Boolean}     true if `obj` is "falsy"
 *
 * @alias #falsy
 * @see  #isTruthy
 * @memberOf tooly
 * @category Object
 * @static
 */
isFalsy: function(obj) {
  // no-strict void 0 covers null as well
  if (obj == void 0 || obj == false) return true;
  if (tooly.type(obj, 'string')) {
    var str = obj.trim();
    return str === '' 
      || str === 'false' 
      || str === 'undefined' 
      || str === 'null';
  }
},

/*! alias for #isFalsy */
falsy: function(obj) {
  return isFalsy(obj);
},

/**
 * Opposite of `isFalsy`.
 * 
 * @param  {mixed}  obj the object to check
 * @return {Boolean}     true if `obj` is "truthy"
 *
 * @alias #truthy
 * @see  #isFalsy
 * @memberOf tooly
 * @category Object
 * @static
 */
isTruthy: function(obj) {
  return !isFalsy(obj);
},

/*! alias for #isTruthy */
truthy: function(obj) {
  return !isFalsy(obj);
},
