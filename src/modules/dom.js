//    +------------+
//    | DOM MODULE |
//    +------------+    
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
    hasClass: function(el, klass) {
      if (_type(el, 'array')) {
        var re = _re(klass), i = 0, len = el.length;
        for (; i < len; i++) {
          var _el = _node(el[i]) ? el[i] : tooly.select(el[i]);
          if (_hasClass(_el, klass, re)) return true;
        }
      } 
      return false;
    },

    /**
     * add a css class to element
     * 
     * @param  {Object|Array<Element>|String} el  the node, array of nodes, or valid css selector
     * @param {String} klass the css class to add
     * @return {Object} `tooly` for chaining
     *
     * @memberOf  tooly
     * @module  dom
     * @static
     */
    addClass: function(el, klass) {
      if (_type(el, 'array')) {
        _procEls(el, klass, tooly.addClass);
      } else if (!_node(el)) {
        el = tooly.select(el);
      } else {
        el.className += ' ' + klass;
      }
      _procArgs(el, klass, tooly.addClass);
      return tooly;
    },

    /**
     * remove a css class from an element
     * 
     * @param  {Object|Array<Element>|String} el  the node, array of nodes, or valid css selector
     * @param  {String} klass   the css class to remove
     * @return {Object} `tooly` for chaining
     *
     * @memberOf  tooly
     * @module  dom
     * @static
     */
    removeClass: function(el, klass) {
      if (_type(el, 'array')) {
        _procEls(el, klass, tooly.removeClass);
      } else if (!_node(el)) {
        el = tooly.select(el);
      } else {
        el.className = el.className.replace(_re(klass), ' ');
      }
      _procArgs(el, klass, tooly.removeClass);
      return tooly;
    },

    /**
     * prepend content to HTML element(s)
     * 
     * @param  {Object}  el         the element(s) to prepend content to
     * @param  {String}  content    the content to prepend
     * @return {Object} `tooly` for chaining
     *
     * @memberOf  tooly
     * @module  dom
     * @static
     */
    prepend: function(el, content) {
      if (_type(el, 'array')) {
        _procEls(el, content, _prepend);
        return tooly
      } 
      _prepend(el, content);
      return tooly;
    },

    /**
     * append content to HTML element(s)
     *
     * @param  {Object}  el         the element(s) to append content to
     * @param  {String}  content    the content to append
     * @return {Object} `tooly` for chaining
     *
     * @memberOf  tooly
     * @module  dom
     * @static
     */
    append: function(el, content) {
      if (_type(el, 'array')) {
        _procEls(el, content, _append);
        return tooly
      } 
      _append(el, content);
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

      el.innerHTML = content;
      return tooly;
    },

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
      if (context instanceof tooly.Selector) {
        context = context.eq(0);
      }
      return (context || document).querySelector(selector);
    },

    /*!
     * alias for #select
     */
    sel: function(s, c) {
      return tooly.select(s, c);
    },

    /**
     * wrapper for HTML5 `querySelectorAll`
     * 
     * @param  {String} selector
     * @param  {Object} context       the parent element to start searching from 
     *                                defaults to document if blank 
     * @return {Array<Node>} an array of matched elements or an empty array if no match
     * 
     * @memberOf  tooly
     * @module  dom
     * @static
     */
    selectAll: function(selector, context) {
      if (context instanceof tooly.Selector) {
        context = context.eq(0);
      }
      var list = (context || document).querySelectorAll(selector),
          els = [], i = 0, len = list.length;
      for (; i < len; i++) {
        els[i] = list[i];
      }
      return els;
    },

    /*!
     * alias for #selectAll
     */
    selAll: function(s, c) {
      return tooly.selectAll(s, c);
    },    

    /**
     * select the parent element of `el`.
     * 
     * @param  {Element|String} el the node element or valid css selector string
     *                             representing the element whose parent will be selected
     * @return {Element|null} the parent element of `selector` or null if no parent is found
     *
     * @memberOf  tooly
     * @module  dom
     * @static
     */
    parent: function(el) {
      if (!_node(el)) el = tooly.select(el);
      return el != null ? el.parentNode : null;
    },

    /**
     * select all first-generation child elements of `el`.
     *     
     * @param  {Element|String} el the element or valid css selector string representing
     *                             the element whose children will be returned 
     * @return {Array<Element>|null} an array of children (converted from HTMLCollection) 
     *                                  or null if `el` has no children
     * @memberOf  tooly
     * @module  dom
     * @static
     */
    children: function(el) {
      if (!_node(el)) el = tooly.select(el);
      return el != null 
        ? (function() {
            var childs = el.children, converted = [], i = 0, len = childs.length;
            for (; i < len; i++) {
              converted.push(childs.item(i));
            }
            return converted;
          })()
        : null;
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
    css: function(el, styles) {
      var _keyInStyles = function(el, styles) {
        for (var key in styles) {
          if (styles.hasOwnProperty(key)) {
            el.style[key] = styles[key];
          } 
        }
      };

      if (_type(el, 'array')) {
        if (arguments.length === 3) {
          for (var i = 0, len = el.length; i < len; i++) {
            el[i].style[arguments[1]] = arguments[2];
          }
          return tooly;
        } else {
          for (var i = 0, len = el.length; i < len; i++) {
            _keyInStyles(el[i], styles);
          }
          return tooly;
        }
      } else if (!_node(el)) {
        el = tooly.select(el);
      }

      if (arguments.length === 3) {
        el.style[arguments[1]] = arguments[2];
      } else {
        _keyInStyles(el, styles);
      }
      return tooly;
    },

    /**
     * The Selector class provides a jQuery style wrapper around all 
     * tooly#dom methods except for #select and #selectAll. 
     * Selection instead is done on the Selector constructor, which will keep
     * an internal reference to a selectAll query on the passed `el`. All dom
     * methods that can be called directly from tooly can instead be called
     * from the Selector instance without their first argument, for example:
     * `tooly.css('.myDiv', {color:'red'})` and 
     * `tooly.Selector('.myDiv').css({color:'red'})` are equivalent. It is also
     * important to note that all methods return the instance for easy chainability,
     * expect when either `css()` or `html()` are called without any arguments, which makes
     * them getters. Methods `parent` and `children` will return the instance as well, 
     * instead setting the internal selection reference to the parents or children of the 
     * previous selection, for example, with markup `<div><p></p></div>`, 
     * `tooly.Selector('p').parent().css('background', 'orange');` would change the div's 
     * background orange.
     * 
     * 
     * Another usage example:
     * @example
     * // alias the selector namespace
     * var $ = tooly.Selector;
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
     * @class Selector
     * @module  dom
     * @memberOf  tooly
     * @static                    
     */
    Selector: function(el, context) {
      if (!(this instanceof tooly.Selector)) {
        return new tooly.Selector(el);
      }
      this.el = tooly.selectAll(el, context);
      return this;
    },
