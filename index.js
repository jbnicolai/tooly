'use strict';

/**
 * @namespace  utils
 * @type {Object}
 */
module.exports = {

  /**
   * Function version of String.format / sprintf
   * @see  http://stackoverflow.com/a/4673436/2416000
   * @param  {String} format
   * @return {String} 
   * @memberOf utils
   */
  format: function(format) {
    var args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined' ? args[number] : match;
    });
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
   * @memberOf utils
   */
  scale: function(n, oldMin, oldMax, min, max) {
    return (((n-oldMin)*(max-min)) / (oldMax-oldMin)) + min; 
  },

  /**
   * Function version of ECMAScript6 String.prototype.repeat without the silly
   * range error checks etc.
   * 
   * @param  {String} str   the string to repeat
   * @param  {Number} n     the number of times to repeat
   * @return {String}       the string repeated, or an empty string if n is 0
   * @memberOf utils
   */
  repeat: function(str, n) {
    var s = '';
    for (var i = 0; i < n; i++) {
      s += str;
    }
    return s;
  },

  /**
   * Function version of ECMAScript6 String.prototype.endsWith
   * @param  {String} str    the string to check
   * @param  {String} suffix the "endWith" we are seeking
   * @return {Boolean}       true if str ends with suffix
   * @see <a href="http://stackoverflow.com/a/2548133">stackoverflow thread</a>
   * @memberOf utils
   */
  endsWith: function(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
  },

  /**
   * Utility method to convert milliseconds into human readable time format hh:mm:ss
   * 
   * @param  {Number} time - the time value in milliseconds
   * @return {String}      - human readable time
   * @memberOf utils
   */
  formatTime: function(time) {
    var
      h = Math.floor(time / 3600),
      m = Math.floor((time - (h * 3600)) / 60),
      s = Math.floor(time - (h * 3600) - (m * 60));
    if (h < 10) h = '0' + h;
    if (m < 10) m = '0' + m;
    if (s < 10) s = '0' + s;
    return h + ':' + m + ':' + s;
  },

  /**
   * Extracts final relative part of url, optionally keeping forward,
   * backward, or both slashes. By default both front and trailing slashes are removed
   *
   * @param {String}  url           the url or filepath
   * @param {Boolean} preSlash      keeps slash before relative part if true
   * @param {Boolean} trailingSlash keeps last slash after relative part if true
   * @example
   * var url = 'http://momentsound.com/nreleases/m01_garo/';
   * u.sliceRel(url);               //=> m01_garo
   * u.sliceRel(url, false, false); //=> m01_garo
   * u.sliceRel(url, false, true);  //=> m01_garo/
   * u.sliceRel(url, true, true);   //=> /m01_garo/
   * u.sliceRel(url, true, false);  //=> /m01_garo
   *
   * // sliceRel does not add a trailing slash if it wasn't
   * // there to begin with
   * url = 'http://momentsound.com/nreleases/m01_garo';
   * u.sliceRel(url, false, true); //=> m01_garo
   * u.sliceRel(url, true, true);  //=> /m01_garo
   * @memberOf utils
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
   * @param  {Object} obj the object
   * @return {String}     the type of object
   * @author Angus Croll
   * @see  <a href=
   * "http://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/">
   * related article
   * </a>
   * @memberOf utils
   */
  toType: function(obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
  },

  /**
   * Equivalent of Object.keys(obj).length
   * 
   * @param  {Object} obj the object whose ownProperties we are counting
   * @return {number}     the number of "ownProperties" in the object
   * @memberOf utils
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
   * @memberOf utils
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
  }
};