



var _format_re, // assigned only on first use
    _ws_re = /\s+/,
    _type_re = /\s([a-z]+)/i,
    _arrayProto = Array.prototype,
    _slice = _arrayProto.slice;

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

function _toArray(obj) {
  return [].map.call(obj, function(el) { return el; });
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

// modified from http://stackoverflow.com/a/9229821/2416000
// TODO: this modifies original arr, find unaltering way
function _sortUnique(arr) {
  return arr.sort().filter(function(item, pos) {
    return !pos || item != arr[pos-1];
  });
}




/**
 * @namespace  tooly
 * @type {Object}
 */
var tooly = { version: '0.0.4' };



