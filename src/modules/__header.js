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
