


var _tag_re;

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
 * //=> <a id="main" class="link--plain" href="music" rel="nofollow">MUSIC!!!</a>
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

  _tag_re = _tag_re || /([^.#]+)|([.#]{1}[^.#]+)/g;
  
  var segs = tag.match(_tag_re),
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
