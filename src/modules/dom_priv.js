
  var _classes_re_cache = {};

  function _classReg(str) {
    if (!_classes_re_cache[str]) {
      _classes_re_cache[str] = new RegExp('\\s*' + str + '\\s*(![\\w\\W])?', 'g');
    }
    return _classes_re_cache[str];
  }

  function _hasClass(el, klass, re) {
    var classes = el.className.split(_ws_re);
    return classes.some(function(c) { return c.match(re) == klass; });
  }

  function _addToClassName(el, klasses) {
    if (!el.className) {
      el.className += klasses ? ' ' + klasses : '';
      return;
    }
    var names = el.className;
    // guard against duplicates
    el.className += ' ' + klasses.split(_ws_re).filter(function(n) {
      return names.indexOf(n) === -1;
    }).join(' ');
  }

  // append || prepend impl
  function _pend(append, element, content) {
    var el = _prepEl(element), html;
    if (!_type(content, 'string')) {
      var type = _type(content);
      html = (_node(content))
        ? content.outerHTML 
        : (content instanceof tooly.Frankie)
          ? content.els
          : (type === 'array' /*&& _node(content[0])*/)
            ? content
            : (type === 'nodelist') 
              ? _toArray(content) 
              : null;
      if (_type(html, 'array')) {
        html = html.map(function(x) { return x.outerHTML; }).join('');
      } else if (!html) {
        return tooly;
      }
    } else {
      html = content;
    }
    function _append(el) {
      // http://jsperf.com/insertadjacenthtml-perf/14
      el.insertAdjacentHTML(append? 'beforeend' : 'afterbegin', html);
    }
    if (_node(el)) {
      _append(el);
    } else if (_type(el, 'array')) {
      el.forEach(_append); 
    } 
    return tooly;
  } 

  function _node(el) {
    return  el && (el.nodeType === 1 || el.nodeType === 9);
  }

  // normalize future dealings to work with only a single node or array of nodes
  // (not nodelist)
  function _prepEl(el) {
    if (el instanceof tooly.Frankie) {
      return el.els;
    } else if (_type(el, 'string')) {
      return tooly.selectAll(el);
    } else if (_type(el, 'nodelist')) {
      return _toArray(el);
    }
    return el;
  }
