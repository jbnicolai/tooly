
  var _ws = /\s+/;

  /** @private */
  function _between(str) {
    return new RegExp('\\s*' + str + '\\s*(?![\\w\\W])', 'g');
  }

  /** @private */
  function _proc_1(el, args, callback) {
    if (_type(args) === 'array') {
      var ret, 
          i = 0, 
          len = el.length
      for (; i < len; i++) {
        ret = callback(el[i], args);
      }
      return ret;
    }
  }

  /** @private */
  function _proc_2(el, content, callback) {
    if (_type(el) === 'array') {
      var ret, 
          i = 0, 
          len = el.length
      for (; i < len; i++) {
        callback(el[i], content);
      }
    }
  }
  