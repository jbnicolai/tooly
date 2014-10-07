
  var _ws = /\s+/;

  function _re(str) {
    return new RegExp('\\s*' + str + '\\s*(![\\w\\W])?', 'g');
  }

  // function _procArgs(el, args, callback) {
  //   if (_type(args) === 'array') {
  //     var ret, i = 0, len = el.length;
  //     for (; i < len; i++) {
  //       ret = callback(el[i], args);
  //     }
  //     return ret;
  //   }
  // }

  // function _procEls(el, content, callback) {
  //   if (_type(el) === 'array') {
  //     var ret, i = 0, len = el.length;
  //     for (; i < len; i++) {
  //       callback(el[i], content);
  //     }
  //   }
  // }

  function _hasClass(el, klass, re) {
    var classes = el.className.split(_ws);
    return classes.some(function(c) {
      return c.match(re) == klass;
    });
  }

  function _addToClassName(el, klasses) {
    if (!el.className) {
      el.className += klasses ? ' ' + klasses : '';
      return;
    }
    var names = el.className;
    // guard against duplicates
    el.className += ' ' + klasses.split(_ws).filter(function(n) {
      return names.indexOf(n) === -1;
    }).join(' ');
  }

  function _node(el) {
    return  el && (el.nodeType === 1 || el.nodeType === 9);
  }

  // function _isPopulatedFrankie(el) {
  //   return el && el instanceof tooly.Frankie && !el.zilch();
  // }

  function _prepEl(el) {
    if (el instanceof tooly.Frankie) {
      return el.el;
    } else if (_type(el, 'string')) {
      return tooly.selectAll(el);
    } else if (_type(el, 'nodelist')) {
      return _toArray(el);
    }
    return el;
  }
