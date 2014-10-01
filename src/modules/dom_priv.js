
  var _ws = /\s+/;

  /**
   * @private
   */
  function _re(str) {
    // return new RegExp('\\s*' + str + '\\s*(?![\\w\\W])', 'g');
    return new RegExp('\\s*' + str + '\\s*(![\\w\\W])?', 'g');
  }

  /**
   * loop over args array
   *
   * @private
   */
  function _procArgs(el, args, callback) {
    if (_type(args) === 'array') {
      var ret, i = 0, len = el.length;
      for (; i < len; i++) {
        ret = callback(el[i], args);
      }
      return ret;
    }
  }

  /**
   * loop over el array
   *
   * @private
   */
  function _procEls(el, content, callback) {
    if (_type(el) === 'array') {
      var ret, i = 0, len = el.length;
      for (; i < len; i++) {
        callback(el[i], content);
      }
    }
  }

  function _hasClass(el, klass, re) {
    var classes = el.className.split(_ws),
        i = 0, len = classes.length;
    for (; i < len; i++) {
      if (classes[i].match(re) == klass) {
        return true;
      }
    }
    return false;
  }

  function _prepend(el, content) {
    if (!_node(el)) el = tooly.select(el);
    el.innerHTML = content + el.innerHTML;
  }

  function _append(el, content) {
    if (!_node(el)) el = tooly.select(el);
    el.innerHTML += content;
  }

  /**
   * @private
   */
  function _node(el) {
    return  el && (el.nodeType === 1 || el.nodeType === 9);
  }
  