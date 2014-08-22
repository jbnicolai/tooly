// --- begin dom module    
    /**
     * check if an element has a css class
     * 
     * @param  {(Object|Array)} el  such that el or each index of el has nodeType === 1
     * @param  {String}   klass   the css class to add
     * @return {Boolean} true if `el` has `klass`
     * @throws {TypeError} If el is not of nodeType: 1
     */
    hasClass: function(el, klass) {
      if (!_node(el)) return false;
      if (_proc_1(el, klass, tooly.hasClass)) return true;
      // if (el.nodeType === 1) {
        var re = _re(klass),
            classes = el.className.split(_ws),
            len = classes.length,
            i = 0;
        for (; i < len; i++) {
          if (classes[i].match(re) == klass) return true;
        }
        return false;
      // }
    },

    /**
     * add a css class to element
     * 
     * @param  {(Object|Array)} el  such that el or each index of el has nodeType === 1
     * @param {String} klass the css class to add
     * @return {Object} `tooly` for chaining
     */
    addClass: function(el, klass) {
      if (!_node(el)) return tooly;
      _proc_1(el, klass, tooly.addClass);
      el.className += ' ' + klass;
      return tooly;
    },

    /**
     * remove a css class from an element
     * 
     * @param  {(Object|Array)} el  such that el or each index of el has nodeType === 1
     * @param  {String} klass   the css class to remove
     * @return {Object} `tooly` for chaining
     */
    removeClass: function(el, klass) {
      if (!_node(el)) return tooly;
      _proc_1(el, klass, tooly.removeClass);
      el.className = el.className.replace(_re(klass), ' ');
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
      if (!_node(el)) return tooly;
      _proc_2(el, content, tooly.prepend);
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
      if (!_node(el)) return tooly;
      _proc_2(el, content, tooly.append);
      el.innerHTML += content;
      return tooly;
    },

    /**
     * fill DOM element `el` with `content`. Replaces existing content.
     * If called with 1 arg, th elements innerHTML is returned
     * 
     * @param  {(String|Object)} content
     * @param  {Element} el      
     * @return {Object|String} tooly for chaining, or el.innerHTML, or undefined if el is null
     */
    html: function(el, content) {
      if (!_node(el)) return tooly;
      if (arguments.length === 1)  {
        return (_type(el) === 'array') ? el[i].innerHTML : el.innerHTML;
      }
      _proc_1(el, content, tooly.html);
      el.innerHTML = content;
      return tooly
    },

    /**
     * wrapper for HTML5 `querySelector`
     * 
     * @param  {String} selector
     * @param  {Object} context,  the parent element to start searching from 
     *                            defaults to document if blank 
     * @return {Element|null}     the first matched element or null if no match
     */
    select: function(selector, context) {
      context = context || document;
      return context.querySelector(selector);
    },

    /**
     * wrapper for HTML5 `querySelectorAll`
     * 
     * @param  {String} selector
     * @param  {Object} context,      the parent element to start searching from 
     *                                defaults to document if blank 
     * @return {Array.<Element>|null} an array of matched elements or an empty array if no match
     */
    selectAll: function(selector, context) {
      var list = (context || document).querySelectorAll(selector),
          els = [],
          i = 0, len = list.length;
      for (; i < len; i++) {
        els[i] = list[i];
      }
      return els;
    },
// --- end dom module