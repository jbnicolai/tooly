//    +------------+
//    | DOM MODULE |
//    +------------+    

    /**
     * wrapper for HTML5 `querySelector`
     * 
     * @param  {String}  selector valid css selector string
     * @param  {Element} context  the parent element to start searching from 
     *                            defaults to document if blank 
     * @return {Element|null} the first matched element or null if no match
     * 
     * @alias sel
     * @memberOf  tooly
     * @module  dom
     * @static
     */
    select: function(selector, context) {
      return (_node(context) ? context : document).querySelector(selector);
    },

    /**
     * wrapper for HTML5 `querySelectorAll`
     * 
     * @param  {String}  selector
     * @param  {Element} context   the parent element to start searching from 
     *                             defaults to document if blank 
     * @return {Array<Node>} an array of matched elements or an empty array if no match
     * 
     * @memberOf  tooly
     * @module  dom
     * @static
     */
    selectAll: function(selector, context) {
      return _toArray((_node(context) ? context : document).querySelectorAll(selector));
    },

    /**
     * select all parents element of `elements`.
     * 
     * @param  {Element|String} elements the node element or valid css selector string
     *                             representing the element whose parent will be selected
     * @return {Element|undefined} the parent element of `selector` or 
     *                                 undefined if no parent is found
     *
     * @memberOf  tooly
     * @module  dom
     * @static
     */
    parent: function(elements) {
      var el = _prepEl(elements),
          parents = [];
      if (_node(el)) {
        return el.parentNode;
      } else if (_type(el, 'array')) {
        return _sortUnique(
          el.map(function(l) { 
            return l.parentNode; 
          })
        );
      }
      return;
    },

    /**
     * select all first-generation child elements of `elements`.
     *     
     * @param  {Element|String} elements the element or valid css selector string representing
     *                             the element whose children will be returned 
     * @return {Array<Element>|undefined} an array of child elements or undefined 
     *                                       if `elements` has no children
     * @memberOf  tooly
     * @module  dom
     * @static
     */
    children: function(elements) {
      var el = _prepEl(elements);
      if (_node(el)) {
        return el.children;
      } else if (_type(el, 'array')) {
        return el.map(function(l) {
          return l.children;
        });
      }
      return;
    },    

    /**
     * check if an element has a css class
     * 
     * @param  {Object|Array<Element>|String} el  the node, array of nodes, or valid css selector
     * @param  {String}   klass   the css class to compare
     * @return {Boolean} true if `el` has `klass`
     *
     * @memberOf  tooly
     * @module  dom
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
     * @param  {Object|Array[Element]|String} element  the node, array of nodes, or valid css selector
     * @param {String|Array[String]} klass the css class(es) to add
     * @return {Object} `tooly` for chaining
     *
     * @memberOf  tooly
     * @module  dom
     * @static
     */
    addClass: function(element, klass) {
      var el = _prepEl(element);
      if (_node(el)) {
        _addToClassName(el, klass);
      } else if (_type(el, 'array')) {
        el.forEach(function(el) { 
          _addToClassName(el, klass); 
        });
      }
      return tooly;
    },

    /**
     * remove a css class from an element
     * 
     * @param  {Object|Array<Element>|String} element  the node, array of nodes, or valid css selector
     * @param  {String} klass   the css class to remove
     * @return {Object} `tooly` for chaining
     *
     * @memberOf  tooly
     * @module  dom
     * @static
     */
    removeClass: function(element, klass) {
      var el = _prepEl(element);
      // "or-ize" for multiple klasses match in regexp
      klass = '(' + klass.split(_ws).join('|') + ')';
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
     * prepend `html` to HTML element(s)
     * 
     * @param  {Object}  element  the element(s) to prepend `html` to
     * @param  {String}  html  the html to prepend
     * @return {Object} `tooly` for chaining
     *
     * @memberOf  tooly
     * @module  dom
     * @static
     */
    prepend: function(element, html) {
      var el = _prepEl(element), parent;
      function prepend(el) {
        el.insertAdjacentHTML('afterbegin', html);
      }
      if (_node(el)) {
        prepend(el);
      } else if (_type(el, 'array')) {
        el.forEach(prepend); 
      } 
      return tooly;
    },

    /**
     * append `html` to HTML element(s)
     *
     * @param  {Object}  element  the element(s) to append content to
     * @param  {String}  html     the content to append
     * @return {Object} `tooly` for chaining
     *
     * @memberOf  tooly
     * @module  dom
     * @static
     */
    append: function(element, html) {
      var el = _prepEl(element), parent;
      function append(el) {
        // http://jsperf.com/insertadjacenthtml-perf/14
        el.insertAdjacentHTML('beforeend', html);
      }
      if (_node(el)) {
        append(el);
      } else if (_type(el, 'array')) {
        el.forEach(append); 
      } 
      return tooly;
    },

    /**
     * fill DOM element `el` with `content`. Replaces existing content.
     * If called with 1 arg, the first matched element's innerHTML is returned
     * 
     * @param  {String|Object} content
     * @param  {Element} el      
     * @return {String|Object} the first matched el's innerHTML of null when in get mode,
     *                             otherwise `tooly` for chaining
     * @memberOf  tooly
     * @module  dom
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
     * // as key val pair (key must also be a string)
     * var el = tooly.select('#main');
     * tooly.css(el, 'background', 'red');
     * // or as hash (notice that hyphenated keys must be quoted)<br>
     * tooly.css(el, {width: '100px', background: 'red', 'font-size': '24px'});
     *
     * // also can take valid css selector string in place of element
     * // below will match the document's first div
     * tooly.css('div', 'border', '2px solid red');
     * 
     * @param  {Element|String}  el     the dom element or valid selector string
     * @param  {String|Object}  styles  either a single comma separated key value pair of strings,
     *                                  or object hash
     * @return {Object} tooly for chaining
     * 
     * @memberOf  tooly
     * @module  dom
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
     *   
     * @param {Element} el valid css selector string, can contain multiple 
     *                     selectors separated my commas (see the example)
     * @constructor
     * @class Frankie
     * @module  dom
     * @memberOf  tooly
     * @static                    
     */
    Frankie: function(el, context) {
      if (!(this instanceof tooly.Frankie)) {
        return new tooly.Frankie(el, context);
      }
      this.el = _node(el) ? [el] : tooly.selectAll(el, context);
      return this;
    },
