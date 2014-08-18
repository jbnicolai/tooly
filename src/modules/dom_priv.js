
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
  