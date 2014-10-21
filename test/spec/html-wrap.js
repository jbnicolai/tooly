var tooly = require('../../dist/tooly');
var _ = require('lodash');
var logger = tooly.Logger(0, 'HTML_WRAP');

function tagify(el, content) {
  var re = /(^[a-z]+)|[^\s]+[a-z]+(-\w+)?=(["'])(?:(?!\3)[^\\]|\\.)*\3|[.#-_a-z][-\w]+/gi,
      void_re = /area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr/i,
      matches = el.match(re),
      el = matches.shift(),
      classes = '', id = '', attrs = '',
      closingTag; 
  matches.forEach(function(m, i) {
    var c = m.charAt(0);
    if (c === '#') {
      id += m.slice(1) + '"';
    } else if (c === '.') {
      classes += ' ' + m.slice(1) + ' ';
    } else {
      attrs += ' ' + m;
    }
  });
  closingTag = void_re.test(el) ? '' : '</' + el + '>';
  return [
    '<', el,
    id ? ' id="' + id : '',
    classes? ' classes="' + classes.trim() + '" ' : '',
    attrs ? attrs : '',
    '>', content, closingTag
  ].join('');
}

// var _re, _void_re;
// 
var _re = /(^[a-z]+)|[^\s]+[a-z]+(-\w+)?=(["'])(?:(?!\3)[^\\]|\\.)*\3|[.#-_a-z][-\w]+/gi;
var _void_re = /area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr/i;

function cached(el, content, test) {
  // if (test && typeof test === 'function') test.call();
  // if (!_re) {
  //   _re = /(^[a-z]+)|[^\s]+[a-z]+(-\w+)?=(["'])(?:(?!\3)[^\\]|\\.)*\3|[.#-_a-z][-\w]+/gi;
  //   _void_re = /area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr/i;
  // }
  var matches = el.match(_re),
      el = matches.shift(),
      classes = '', id = '', attrs = '',
      closingTag; 
  matches.forEach(function(m, i) {
    var c = m.charAt(0);
    if (c === '#') {
      id += m.slice(1) + '"';
    } else if (c === '.') {
      classes += ' ' + m.slice(1) + ' ';
    } else {
      attrs += ' ' + m;
    }
  });
  closingTag = _void_re.test(el) ? '' : '</' + el + '>';
  return [
    '<', el,
    id ? ' id="' + id : '',
    classes? ' classes="' + classes.trim() + '" ' : '',
    attrs ? attrs : '',
    '>', content, closingTag
  ].join('');
}

_.times(5, function() {

  var a = tooly.funkyTime(function(i) {
    tagify('div', tagify('section', tagify('div .inner', 'hello world' + i*2)));
  }, 299888);
  
  var b = tooly.funkyTime(function(i) {
    cached('div', tagify('section', tagify('div .inner', 'hello world' + i*2)));
  }, 299888);
  
  logger.debug('tagged' + ', ' + a.total);
  logger.debug('cached' + ', ' + b.total);

});