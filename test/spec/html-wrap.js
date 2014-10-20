var tooly = require('../../dist/tooly');
var logger = tooly.Logger(0, 'STRING_FORMAT');

var _type = tooly.type;

function tagify(el, html) {
  var re = /(^[a-z]+)|[^\s]+[a-z]+(-\w+)?=["'].*["']|[.#-_a-z][-\w]+/gi,
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
    '>', html, closingTag
  ].join('');
}

var html = tagify('div #my-id .my-class-1 .my-class-2 data-ref="ref with space"', 
  'hello world');
logger.debug('\n' + html);

var img = tagify('img src="http://me.io/whatever.jpg"');
logger.debug('\n' + img);

var content = 'Hello World. Goodnight Universe.';
var html = tagify('div #my-id .class-one .class-two data-mood="perculatory"', content);
logger.debug(html);


