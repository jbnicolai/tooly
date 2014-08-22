/**
 * @namespace  tooly
 * @type {Object}
 */
var tooly = (function() {

  function _type(o) {
    return ({}).toString.call(o).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
  }
  