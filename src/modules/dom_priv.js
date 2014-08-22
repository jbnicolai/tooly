
  var _ws = /\s+/;

  function _re(str) {
    return new RegExp('\\s*' + str + '\\s*(?![\\w\\W])', 'g');
  }

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

  function _node(el) {
    return el && (el.nodeType === 1 || el.nodeType === 9);
  }
  