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

  // deep clone, more performant than jQuery extend, yet with many issues
  // see http://stackoverflow.com/q/122102/2416000
  function _clone(old, new) {
    return JSON.parse(JSON.stringify(obj));
  }