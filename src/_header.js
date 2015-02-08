


var _format_re, // assigned only on first use
    _ws_re = /\s+/,
    _type_re = /\s([a-z]+)/i,
    _arrayProto = Array.prototype,
    _slice = _arrayProto.slice,
    _noop = function() {},
    _identity = function(v) { return v; };

/*!
 * @see  tooly#type
 */
function _type(o, klass) {
  o = ({}).toString.call(o).match(_type_re)[1].toLowerCase();
  return klass ? o === klass.toLowerCase() : o;
}

/*!
 * @see  tooly#each
 */
function _each(obj, fn, context) {
  if (obj.forEach && obj.forEach === _arrayProto.forEach) {
    obj.forEach(fn, context);
  } else {
    var keys = Object.keys(obj), i = 0, len = keys.length;
    for (; i < len; i++) fn.call(context, obj[keys[i]], keys[i], obj);
  }
  return obj;
}

/*!
 * Used internally to convert array-like objects such as HtmlCollection or NodeList into
 * plain old arrays.
 *  
 * @param  {Object} obj An array-like object
 * @return {Array}      `obj` converted
 * @private
 */
function _toArray(obj) {
  return [].map.call(obj, _identity);
}

/**
 * @namespace  tooly
 * @type {Object}
 */
var tooly = {};

/**
 * "No operation". A function with an empty body
 * 
 * @type {Function}
 * @return {undefined}
 *
 * @memberOf tooly
 * @category String
 * @static
 */
tooly.noop = _noop;

/**
 * A function that returns its own single argument
 * 
 * @type {Function}
 * @param {Object} value
 * @return the `value` parameters
 *
 * @memberOf tooly
 * @category String
 * @static
 */
tooly.indentity = _identity;
