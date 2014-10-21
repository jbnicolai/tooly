//    +-----+
//    | DOM |
//    +-----+

/**    
 * wrapper for HTML5 `querySelector`
 * 
 * @param  {String}  selector valid css selector string
 * @param  {HTMLElement|String|Array<HTMLElement>|NodeList|Frankie} context  
 *         the parent element to start searching from defaults to document if blank 
 * @return {HTMLElement|null} the first matched element or null if no match is found
 * 
 * @memberOf  tooly
 * @category Dom
 * @static
 */
select: function(selector, context) {
  var parent;
  if (context) {
    parent = _prepEl(context);
    if (_type(parent, 'array')) parent = parent[0];
  }  
  return (_node(parent) ? parent : document).querySelector(selector);
},

/**
 * wrapper for HTML5 `querySelectorAll`
 * 
 * @param  {String}  selector  a valid selector string
 * @param  {HTMLElement|String|Array<HTMLElement>|NodeList|Frankie} context  
 *         the parent element to start searching from defaults to `document` if blank 
 * @return {Array<HTMLElement>} an array of matched elements or an empty array if no match is found
 * 
 * @memberOf  tooly
 * @category Dom
 * @static
 */
selectAll: function(selector, context) {
  var parent;
  if (context) {
    parent = _prepEl(context);
    if (_type(parent, 'array')) parent = parent[0];
  }
  return _toArray((_node(parent) ? parent : document).querySelectorAll(selector));
},

/**
 * select all parents element of `elements`.
 * 
 * @param  {HTMLElement|String|Array<HTMLElement>|NodeList|Frankie} elements 
 *         the node element or valid css selector string 
 *         representing the element whose parent will be selected
 * @return {HTMLElement|undefined} 
 *         the parent element of `selector` or undefined if no parent is found
 *
 * @memberOf  tooly
 * @category Dom
 * @static
 */
parent: function(elements) {
  var el = _prepEl(elements),
      parents = [];
  if (_node(el)) {
    return el.parentNode;
  } else if (_type(el, 'array')) {
    return _sortUnique(el.map(function(l) { return l.parentNode; }));
  }
  return;
},

/**
 * select all first-generation child elements of `elements`.
 *     
 * @param  {HTMLElement|String|Array<HTMLElement>|NodeList|Frankie} elements 
 *         the element or valid css selector string representing the 
 *         element whose children will be returned 
 * @return {Array<HTMLElement>|undefined} an array of child elements or undefined 
 *                                       if `elements` has no children
 * @memberOf  tooly
 * @category Dom
 * @static
 */
children: function(elements) {
  var el = _prepEl(elements);
  if (_node(el)) {
    return el.children;
  } else if (_type(el, 'array')) {
    return el.map(function(l) { return l.children; });
  }
  return;
},    

/**
 * check if an element has a css class
 * 
 * @param  {HTMLElement|String|Array<HTMLElement>|NodeList|Frankie} el  
 *         the node, array of nodes, or valid css selector
 * @param  {String}   klass   the css class to compare
 * @return {Boolean} true if `el` has `klass`
 *
 * @memberOf  tooly
 * @category Dom
 * @static
 */
hasClass: function(element, klass) {
  var el = _prepEl(element);
  if (_node(el)) {
    return _hasClass(el, klass, _classReg(klass));
  }
  if (_type(el, 'array')) {
    var re = _classReg(klass);
    return el.some(function(l, i, r) { 
      return _hasClass(r[i], klass, re); 
    });
  }
  return false;
},

/**
 * add a css class to element
 * 
 * @param  {HTMLElement|String|Array<HTMLElement>|NodeList|Frankie} element  
 *         the node, array of nodes, or valid css selector
 * @param {String|Array<String>} klass the css class(es) to add
 * @return {Object} `tooly` for chaining
 *
 * @memberOf  tooly
 * @category Dom
 * @static
 */
addClass: function(element, klass) {
  var el = _prepEl(element);
  if (_node(el)) {
    _addToClassName(el, klass);
  } else if (_type(el, 'array')) {
    el.forEach(function(el) { _addToClassName(el, klass); });
  }
  return tooly;
},

/**
 * remove a css class from an element
 * 
 * @param  {HTMLElement|String|Array<HTMLElement>|NodeList|Frankie} element  
 *         the node, array of nodes, or valid css selector
 * @param  {String} klass   the css class to remove
 * @return {Object} `tooly` for chaining
 *
 * @memberOf  tooly
 * @category Dom
 * @static
 */
removeClass: function(element, klass) {
  var el = _prepEl(element);
  // "or-ize" for multiple klasses match in regexp
  klass = '(' + klass.split(_ws_re).join('|') + ')';
  function replace(el) {
    el.className = el.className.replace(_classReg(klass), ' ').trim();
  };
  if (_node(el)) {
    replace(el);
  } else if (_type(el, 'array')) {
    el.forEach(replace);
  }
  return tooly;
},

/**
 * prepend `content` to HTML `element`(s)
 * 
 * @param  {HTMLElement|String|Array<HTMLElement>|NodeList|Frankie}  element  
 *         the element(s) to prepend `content` to
 * @param  {String}  content  the content to prepend
 * @return {Object} `tooly` for chaining
 *
 * @memberOf  tooly
 * @category Dom
 * @static
 */
prepend: function(element, html) {
  return _pend(false, element, html);
},

/**
 * append `content` to HTML `element`(s)
 *
 * `#append` can take any of the following as arguments:
 *
 * @param  {HTMLElement|String|Array<HTMLElement>|NodeList|Frankie}  element  
 *         the element(s) to append content to
 * @param  {String}  content     the content to append
 * @return {Object} `tooly` for chaining
 *
 * @memberOf  tooly
 * @category Dom
 * @static
 */
append: function(element, content) {
  return _pend(true, element, content);
}, 

/**
 * remove all child nodes from `element`.
 * __TODO__: remove listeners?
 * 
 * @param  {HTMLElement|String|Array<HTMLElement>|NodeList|Frankie} element 
 *         the element to clear of all children
 * @return {Object}  `tooly` for chaining
 *
 * @memberOf  tooly
 * @category Dom
 * @static
 */
empty: function(element) {
  var el = _prepEl(element);
  // see http://jsperf.com/innerhtml-vs-removechild/15
  function remove(x) { while (x.lastChild) x.removeChild(x.lastChild); }
  _type(el, 'array') ? el.forEach(remove) : remove(el);
  return tooly;
},

/**
 * fill DOM element `el` with `content`. Replaces existing content.
 * If called with 1 arg, the first matched element's innerHTML is returned
 * 
 * @param  {HTMLElement|String|Array<HTMLElement>|NodeList|Frankie} el      
 * @param  {HTMLElement|String|Array<HTMLElement>|NodeList|Frankie} content
 * @return {String|Object} the first matched el's innerHTML or null when in get mode,
 *                             otherwise `tooly` for chaining
 * @memberOf  tooly
 * @category Dom
 * @static
 */
html: function(el, content) {
  // get
  if (arguments.length === 1)  {
    if (_type(el) === 'array' && _node(el[0])) {
      return  el[0].innerHTML;
    } else if (_node(el)) {
      return el.innerHTML;
    } else {
      return tooly.select(el).innerHTML;
    }
  }

  // set
  if (!_node(el)) {
    if (_type(el) === 'array') {
      var i = 0, len = el.length;
      for (; i < len; i++) {
        if (_node(el[i])) {
          el[i].innerHTML = content;
        } else {
          el[i] = tooly.select(el[i]);
          el[i].innerHTML = content;
        }
      }
      return tooly;
    } else {
      tooly.select(el).innerHTML = content;
      return tooly;
    }
  }

  // el is node
  el.innerHTML = content;
  return tooly;
},

/**
 * @example
 * ```js
 * // as key val pair (key must also be a string)
 * var el = tooly.select('#main');
 * tooly.css(el, 'background', 'red');
 * 
 * // or as hash (notice that hyphenated keys must be quoted)<br>
 * tooly.css(el, {width: '100px', background: 'red', 'font-size': '24px'});
 *
 * // also can take valid css selector string in place of element
 * // below will match the document's first div
 * tooly.css('div', 'border', '2px solid red');
 * ```
 * 
 * @param  {HTMLElement|String|Array<HTMLElement>|NodeList|Frankie}  el     
 *         the dom element or valid selector string
 * @param  {String|Object}  styles  
 *         either a single comma separated key value pair of strings, or object hash
 * @return {Object} `tooly` for chaining
 * 
 * @memberOf  tooly
 * @category Dom
 * @static
 */
css: function(/*mixed*/) {
  var eachStyle = function(el, styles) {
    for (var key in styles) {
      if (styles.hasOwnProperty(key)) {
        el.style[key] = styles[key];
      }
    }
  };

  var el = _prepEl(arguments[0]),
      argsLen = arguments.length,
      styles = {}, 
      isNode = true;

  if (argsLen > 1) {
    // single comma sep key-value pair
    if (argsLen === 3) {
      styles[arguments[1]] = arguments[2];
      // hash
    } else {
      styles = arguments[1];
    }
  }

  // set
  if (styles) {
    if (_node(el)) {
      eachStyle(el, styles);
      return tooly;
    } else if (_type(el, 'array')) {
      isNode = false;
      el.forEach(function(el) { eachStyle(el, styles); });
      return tooly;
    }
  }

  // get
  return isNode ? el.style : el[0].style || undefined;
},

/**
 * get or set a(n) html attribute(s)
 * 
 * @param  {HTMLElement|String|Array<HTMLElement>|NodeList|Frankie} element the element
 * @param  {String} a  the attribute to get/set
 * @param  {String|Number|null} the value of the attribute `a` (set)
 * @return {HTMLElement|Object|String}
 *
 * @memberOf  tooly
 * @category Dom
 * @static
 */
attr: function(/*mixed*/) {
  var el = _prepEl(arguments[0]), 
      argsLen = arguments.length,
      attr, // our return value
      a, // the passed attribute or attributes hash
      isArray = _type(el, 'array');

  if ((!isArray && !_node(el)) || argsLen <= 1 || argsLen > 3) {
    return null;
  }

  a = arguments[1];

  if (argsLen === 2) {
    
    if (_type(a, 'object')) {
      // SET (hash)
      for (var prop in a) {
        if (a.hasOwnProperty(prop)) {
          if (isArray) {
            el.forEach(function(d) { d.setAttribute(prop, a[prop]); });
          } else {
            el.setAttribute(prop, a[prop]);
          }
        }
      }
    } else {
      // GET
      attr = (isArray ? el[0] : el).getAttribute(a);
      return (attr === '') ? null : attr;
    }

  } else { // SET (single comma sep key-val pair)
    if (isArray) {
      var value = arguments[2];
      el.forEach(function(d) { d.setAttribute(a, value); });
    } else {
      el.setAttribute(a, arguments[2]);
    }
  }
  return tooly;
},

/**
 * The Frankie class - named after the late, great DJ Frankie Knuckles (one of the greatest) 
 * _selectors_ of all time ;) - provides a jQuery style wrapper around most
 * tooly#dom methods except for #select and #selectAll. 
 * Selection instead is done through the Frankie constructor, which will keep
 * an internal reference to a selectAll query on the passed `el`. All dom
 * methods that can be called directly from tooly can instead be called
 * from the Frankie instance without their first argument, for example:
 * `tooly.css('.myDiv', {color:'red'})` and 
 * `tooly.Frankie('.myDiv').css({color:'red'})` are equivalent. It is also
 * important to note that all methods return the instance for easy chainability,
 * expect when either `css()` or `html()` are called without any arguments, which makes
 * them getters. Methods `parent` and `children` will return the instance as well, 
 * instead setting the internal selection reference to the parents or children of the 
 * previous selection, for example, with markup `<div><p></p></div>`, 
 * `tooly.Frankie('p').parent().css('background', 'orange');` would change the div's 
 * background orange.
 * 
 * 
 * Another usage example:
 * @example
 * ```js
 * // alias the Frankie namespace
 * var $ = tooly.Frankie.bind(this);
 * var $divs = $(divs);
 * $divs.css({color:'green'});
 * // multiple yet separate selectors must be comma separated
 * $('div, p')
 *   .addClass('purple')
 *   .addClass('yellow')
 *   .removeClass('g')
 *   .css({'border-radius':'4px'})
 *   .prepend('<h1>---</h1>')
 *   .append('<h1>+++</h1>')
 *   .html('H T M L');
 * ```
 *   
 * @param {String|HTMLElement} el 
 *        valid css selector string, can contain multiple 
 *        selectors separated my commas (see the example)
 * @param {HTMLElement|String|Array<HTMLElement>|NodeList|Frankie} 
 *        context a parent context to search for the supplied `el` argument.
 * @class Frankie
 * @constructor
 * @category Dom
 * @memberOf  tooly
 * @static                    
 */
Frankie: function(el, context) {
  if (!(this instanceof tooly.Frankie)) {
    return new tooly.Frankie(el, context);
  }
  this.els = _node(el) ? [el] : tooly.selectAll(el, context);
  return this;
},
