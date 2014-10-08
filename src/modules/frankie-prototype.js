tooly.Frankie.prototype = {

  get: function(i) {
    return this.el[i];
  },

  eq: function(i) {
    // TODO: test parent vs document
    return new tooly.Frankie(this.el[i], this.parent());
  },

  /**
   * Check if this Frankie's `el` member is populated
   * 
   * @return {Boolean} true if the el member is null, undefined, or empty
   */
  zilch: function() {
    return this.el.length === 0;
  },

  parent: function() {
    var parents = tooly.parent(this.el),
        frankie = new tooly.Frankie();
    if (parents instanceof Array) {
      frankie.el = parents;
    }
    return frankie;
  },

  children: function() {
    var children = tooly.children(this.el),
        frankie = new tooly.Frankie();
    if (children instanceof Array) {
      frankie.el = children;
    }
    return frankie;
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
    // set
    if (content) {
      tooly.html(this.el, content);
      return this;
    }
    // get
    return tooly.html(this.el);
  },
  
  css: function() {
    var args = [this.el];
    [].push.apply(args, arguments);
    tooly.css.apply(null, args);
    return this;
  }
};