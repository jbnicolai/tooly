/**
 * @namespace  tooly
 * @type {Object}
 */
var tooly = (function() {

  function _type(o, klass) {
    o = ({}).toString.call(o).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
    if (klass) {
      return o === klass.toLowerCase();
    }
    return o;
  }
 
  // convert object or array-like object (arguments, NodeList, HTMLCollection, etc.) 
  // into proper primitive array 
  function _toArray(obj) {
    return [].map.call(obj, function(el) { 
      return el; 
    });
  }

  // http://stackoverflow.com/a/9229821/2416000
  function _unique(obj) {
    var prims = { 'boolean': {}, 'number': {}, 'string': {} }, 
        objs = [];
    return obj.filter(function(item) {
      var type = typeof item;
      return (type in prims) 
        ? prims[type].hasOwnProperty(item) ? false : (prims[type][item] = true)
        : objs.indexOf(item) >= 0 ? false : objs.push(item);
    });
  }

  // modified from http://stackoverflow.com/a/9229821/2416000
  // TODO: this modifies original arr, find unaltering way
  function _sortUnique(arr) {
    return arr.sort().filter(function(item, pos) {
      return !pos || item != arr[pos-1];
    });
  }

  // // deep clone, more performant than jQuery extend, yet with many issues
  // // see http://stackoverflow.com/q/122102/2416000
  // function _clone(obj) {
  //   return JSON.parse(JSON.stringify(obj));
  // }