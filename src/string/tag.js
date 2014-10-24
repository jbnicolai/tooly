var _tag_re, _void_el_re;
/**
 * __Experimental__ - will change in future versions.
 * Wrap a string with html tags, id, classes, and attributes with 
 * very simple syntax. Void elements are accounted for.
 * Warning: has not been tested extensively as of yet.
 *
 * ### Examples
 * ```js
 * tooly.tag('div #my-id .my-class data-mood="perculatory"', 'Hi');
 * //=> "<div id="my-id" class="my-class" data-mood="perculatory">Hi</div>"
 * 
 * // nested:
 * tooly.tag('div', tooly.tag('section', '!'));
 * //=> "<div><section>!</section></div>"
 * ```
 * 
 * @param  {String}  el         String of the format "<tag> [.class[...]] [#id] [attribute[...]]"
 * @param  {String}  content    [optional] content to be place after the opening HTML tag
 * @param  {Boolean} asHTML     output HTML if true, String otherwise
 * @return {String|HTMLElement} HTML tag `el` filled with `content`
 *
 * @memberOf tooly
 * @category String
 * @static
 */
tooly.tag = function(el, content, asHTML) {
  if (!_tag_re) {
    _tag_re = /(^[a-z]+\d{1})|[^\s]+[a-z]+(-\w+)?=(["'])(?:(?!\3)[^\\]|\\.)*\3|[.#-_a-z][-\w]+/gi;
    _void_el_re = /area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr/i; 
  }
  var matches = el.match(_tag_re),
      el = matches.shift(),
      classes = '', id = '', attrs = '',
      closingTag, out; 
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
  closingTag = _void_el_re.test(el) ? '' : '</' + el + '>';
  out = [
    '<', el,
    id ? ' id="' + id : '',
    classes? ' classes="' + classes.trim() + '" ' : '',
    attrs ? attrs : '',
    '>', content, closingTag
  ].join('');
  if (asHTML) {
    var d = document.createElement('div');
    d.innerHTML = out;
    return d.firstChild;
  }
  return out;
};
