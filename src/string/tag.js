/**
 * Simple DOM element creation using jade-like syntax for the element
 * declaration and options hash for attributes. The attribute hash can take a content
 * argument for the element's innerHTML property, which itself can be another tag
 *
 * ### Examples
 * ```js
 * tag('a'); //=> <a></a>
 * tag('a.link--plain') //=> <a class="link--plain"></a>
 * tag('a', 'MUSIC!!!') //=> <a>MUSIC!!!</a>
 * tag('a#main.link--plain', { rel: 'nofollow', href: 'music', content: 'MUSIC!!!' })
 * //=> <a href="music" rel="nofollow">MUSIC!!!</a>
 * tag('#main', tag('.sub')) //=> <div id="main"><div class="sub"></div></div>
 * ```
 * 
 * @param  {String}  tag        jade-like element declaration
 * @param  {Object}  attrs      options hash of attributes
 * @param  {Boolean} asString   returns string representation instead of HTMLElement, defaults to false
 * @return {HTMLElement|String} element or string representation
 *
 * @memberOf tooly
 * @category String
 * @static
 */
tooly.tag = function(tag, attrs, asString) {

  var re = /([^.#]+)|([.#]{1}[^.#]+)/g,
      segs = tag.match(re),
      ch = segs[0].charAt(0),
      el = document.createElement(/[#.]/.test(ch) ? 'div' : segs.shift()),
      id = '', 
      classes = [];

  segs.forEach(function(seg) {
    if (seg.charAt(0) === '.') return classes.push(seg.replace('.', ''));
    if (seg.charAt(0) === '#') return id = seg.replace('#', '');
  });

  if (classes.length) el.setAttribute('class', classes.join(' '));
  if (id !== '') el.setAttribute('id', id);

  if (!attrs.nodeType && typeof attrs === 'object') {

    for (var p in attrs) {
      if (attrs.hasOwnProperty(p) && p !== 'content') {
        el.setAttribute(p, attrs[p]);
      }
    }
    if (attrs.hasOwnProperty('content')) {
      if (attrs.content.nodeType === undefined) {
        attrs.content = document.createTextNode(attrs.content);
      }
      el.appendChild(attrs.content);
    }

  } else if (typeof attrs === 'string') {
    el.appendChild(document.createTextNode(attrs));

  } else if (attrs.nodeType && attrs.nodeType === 1 || attrs.nodeType === 9) {
    el.appendChild(attrs);
  }

  return asString ? el.outerHTML : el;
};


// var _tag_re, _void_el_re;

// /**
//  * __Experimental__ - will change in future versions.
//  * Wrap a string with html tags, id, classes, and attributes with 
//  * very simple syntax. Void elements are accounted for.
//  * Warning: has not been tested extensively as of yet.
//  *
//  * ### Examples
//  * ```js
//  * tooly.tag('div #my-id .my-class data-mood="perculatory"', 'Hi');
//  * //=> "<div id="my-id" class="my-class" data-mood="perculatory">Hi</div>"
//  * 
//  * // nested:
//  * tooly.tag('div', tooly.tag('section', '!'));
//  * //=> "<div><section>!</section></div>"
//  * ```
//  * 
//  * @param  {String}  el         String of the format "<tag> [.class[...]] [#id] [attribute[...]]"
//  * @param  {String}  content    [optional] content to be place after the opening HTML tag
//  * @param  {Boolean} asHTML     output HTML if true, String otherwise
//  * @return {String|HTMLElement} HTML tag `el` filled with `content`
//  *
//  * @memberOf tooly
//  * @category String
//  * @static
//  */
// tooly.tag = function(el, content, asHTML) {
//   if (!_tag_re) {
//     _tag_re = /(^[a-z]+\d{1})|[^\s]+[a-z]+(-\w+)?=(["'])(?:(?!\3)[^\\]|\\.)*\3|[.#-_a-z][-\w]+/gi;
//     _void_el_re = /area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr/i; 
//   }
//   var matches = el.match(_tag_re),
//       el = matches.shift(),
//       classes = '', id = '', attrs = '',
//       closingTag, out; 
//   matches.forEach(function(m, i) {
//     var c = m.charAt(0);
//     if (c === '#') {
//       id += m.slice(1) + '"';
//     } else if (c === '.') {
//       classes += ' ' + m.slice(1) + ' ';
//     } else {
//       attrs += ' ' + m;
//     }
//   });
//   closingTag = _void_el_re.test(el) ? '' : '</' + el + '>';
//   out = [
//     '<', el,
//     id ? ' id="' + id : '',
//     classes? ' class="' + classes.trim() + '" ' : '',
//     attrs ? attrs : '',
//     '>', content, closingTag
//   ].join('');
//   if (asHTML) {
//     var d = document.createElement('div');
//     d.innerHTML = out;
//     return d.firstChild;
//   }
//   return out;
// };
