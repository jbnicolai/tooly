//    +------------+
//    | DOM MODULE |
//    +------------+    
    /**
     * check if an element has a css class
     * 
     * @param  {Object|Array<Element>} el  the dom node or array of dom nodes to check for 
     *                                     existence of `klass`
     * @param  {String}   klass   the css class to add
     * @return {Boolean} true if `el` has `klass`
     * @throws {TypeError} If el is not of nodeType: 1
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
     * @param  {Object|Array} el  such that el or each index of el has nodeType === 1
     * @param {String} klass the css class to add
     * @return {Object} `tooly` for chaining
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
     * @param  {Object|Array} el  such that el or each index of el has nodeType === 1
     * @param  {String} klass   the css class to remove
     * @return {Object} `tooly` for chaining
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
     */
    prepend: function(el, content) {
      if (!_node(el)) el = tooly.select(el);
      _procEls(el, content, tooly.prepend);
      el.innerHTML = content + el.innerHTML;
      return tooly
    },

    /**
     * append content to HTML element(s)
     *
     * @param  {Object}  el         the element(s) to append content to
     * @param  {String}  content    the content to append
     * @return {Object} `tooly` for chaining
     */
    append: function(el, content) {
      if (!_node(el)) el = tooly.select(el);
      _procEls(el, content, tooly.append);
      el.innerHTML += content;
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
     * @alias sel
     * @memberOf  tooly
     */
    select: function(selector, context) {
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
     */
    selectAll: function(selector, context) {
      var list = (context || document).querySelectorAll(selector),
          els = [], i = 0, len = list.length;
      for (; i < len; i++) {
        els[i] = list[i];
      }
      return els;
    },

    /**
     * select the parent element of `el`.
     * 
     * @param  {Element|String} el the node element or valid css selector string
     *                             representing the element whose parent will be selected
     * @return {Element|null} the parent element of `selector` or null if no parent is found
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

    /*!
     * alias for #selectAll
     */
    selAll: function(s, c) {
      return tooly.selectAll(s, c);
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
     * @memberOf  tooly
     */
    css: function(el, styles) {
      if (!_node(el)) el = tooly.select(el);
      if (arguments.length === 3) {
        el.style[arguments[1]] = arguments[2];
      } else {
        for (var key in styles) {
          if (styles.hasOwnProperty(key)) {
            el.style[key] = styles[key];
          }
        }
      }
      return tooly;
    },
