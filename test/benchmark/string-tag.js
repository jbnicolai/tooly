var Benchmark = require('benchmark'),
    tooly = require('../../dist/tooly');

var _tagReg = /(^[a-z]+)|[^\s]+[a-z]+(-\w+)?=(["'])(?:(?!\3)[^\\]|\\.)*\3|[.#-_a-z][-\w]+/gi;
var _voidElReg = /area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr/i; 
function tagCached(el, content) {
  var matches = el.match(_tagReg),
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
  closingTag = _voidElReg.test(el) ? '' : '</' + el + '>';
  return [
    '<', el,
    id ? ' id="' + id : '',
    classes? ' classes="' + classes.trim() + '" ' : '',
    attrs ? attrs : '',
    '>', content, closingTag
  ].join('');
}
var __tagReg, __voidElReg; 
function tagLazy(el, content) {
  if (!__tagReg) {
    __tagReg = /(^[a-z]+)|[^\s]+[a-z]+(-\w+)?=(["'])(?:(?!\3)[^\\]|\\.)*\3|[.#-_a-z][-\w]+/gi;
    __voidElReg = /area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr/i; 
  }
  var matches = el.match(__tagReg),
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
  closingTag = __voidElReg.test(el) ? '' : '</' + el + '>';
  return [
    '<', el,
    id ? ' id="' + id : '',
    classes? ' classes="' + classes.trim() + '" ' : '',
    attrs ? attrs : '',
    '>', content, closingTag
  ].join('');
}
function tag(el, content) {
  var matches = el.match(/(^[a-z]+)|[^\s]+[a-z]+(-\w+)?=(["'])(?:(?!\3)[^\\]|\\.)*\3|[.#-_a-z][-\w]+/gi),
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
  closingTag = /area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr/i.test(el) 
    ? '' : '</' + el + '>';
  return [
    '<', el,
    id ? ' id="' + id : '',
    classes? ' classes="' + classes.trim() + '" ' : '',
    attrs ? attrs : '',
    '>', content, closingTag
  ].join('');
}     

var suite = new Benchmark.Suite;

suite.add('cached', function() {
  tagCached('div #my-id .my-class data-mood="perculatory"', 'Hi');
})
.add('lazy', function() {
  tagLazy('div #my-id .my-class data-mood="perculatory"', 'Hi');
})
.add('tag', function() {
  tag('div #my-id .my-class data-mood="perculatory"', 'Hi');
})
.on('cycle', function(e) { 
  // console.log(String(e.target)); 
  console.log(String(e.target)); 
})
.on('complete', function() {
  console.log(this.filter('fastest').pluck('name'));
})
.run(true);