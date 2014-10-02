tooly.Selector.prototype = {

  get: function(i) {
    return this.el[i];
  },

  eq: function(i) {
    // TODO: test parent vs document
    return new tooly.Selector(this.el[i], this.parent());
  },

  /**
   * Check if this Selector's `el` member is populated
   * 
   * @return {Boolean} true if the el member is null, undefined, or empty
   */
  zilch: function() {
    return this.el.length === 0;
  },

  hasClass: function(klass) {
    tooly.hasClass(this.el, klass);
    return this;
  },

  addClass: function(klass) {
    tooly.addClass(this.el, klass);
    return this;
  },

  removeClass: function(klass) {
    tooly.removeClass(this.el, klass);
    return this;
  },

  prepend: function(content) {
    tooly.prepend(this.el, content);
    return this;
  },

  append: function(content) {
    tooly.append(this.el, content);
    return this;
  },

  html: function(content) {
    tooly.html(this.el, content);
    return this;
  },

  parent: function() {
    tooly.parent(this.el);
    return this;
  },

  children: function() {
    tooly.children(this.el);
    return this;
  },
  
  css: function() {
    var args = [this.el];
    Array.prototype.push.apply(args, arguments);
    tooly.css.apply(null, args);
    return this;
  }
};