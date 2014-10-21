_extend(tooly.Frankie.prototype, {

  /**
   * @memberOf tooly.Frankie
   * @instance
   */
  get: function(i) {
    return this.els[i];
  },

  /**
   * @memberOf tooly.Frankie
   * @instance
   */
  eq: function(i) {
    // TODO: test parent vs document
    return new tooly.Frankie(this.els[i], this.parent());
  },

  /**
   * @memberOf tooly.Frankie
   * @instance
   */
  zilch: function() {
    return this.els.length === 0;
  },

  /**
   * @memberOf tooly.Frankie
   * @instance
   */
  parent: function() {
    var parents = tooly.parent(this.els),
        frankie = new tooly.Frankie();
    if (parents instanceof Array) {
      frankie.els = parents;
    }
    return frankie;
  },

  /**
   * @memberOf tooly.Frankie
   * @instance
   */
  children: function() {
    var children = tooly.children(this.els),
        frankie = new tooly.Frankie();
    if (children instanceof Array) {
      frankie.els = children;
    }
    return frankie;
  },  

  /**
   * @memberOf tooly.Frankie
   * @instance
   */
  hasClass: function(klass) {
    return tooly.hasClass(this.els, klass);
  },

  /**
   * @memberOf tooly.Frankie
   * @instance
   */
  addClass: function(klass) {
    tooly.addClass(this.els, klass);
    return this;
  },

  /**
   * @memberOf tooly.Frankie
   * @instance
   */
  removeClass: function(klass) {
    tooly.removeClass(this.els, klass);
    return this;
  },

  /**
   * @memberOf tooly.Frankie
   * @instance
   */
  prepend: function(content) {
    tooly.prepend(this.els, content);
    return this;
  },

  /**
   * @memberOf tooly.Frankie
   * @instance
   */
  append: function(content) {
    tooly.append(this.els, content);
    return this;
  },

  /**
   * @memberOf tooly.Frankie
   * @instance
   */
  empty: function() {
    tooly.empty(this.els);
    return this;
  },

  /**
   * @memberOf tooly.Frankie
   * @instance
   */
  html: function(content) {
    // set
    if (content) {
      tooly.html(this.els, content);
      return this;
    }
    // get
    return tooly.html(this.els[0]);
  },
  
  /**
   * @memberOf tooly.Frankie
   * @instance
   */  
  css: function() {
    var args = [this.els];
    [].push.apply(args, arguments);
    tooly.css.apply(null, args);
    return this;
  },

  /**
   * @memberOf tooly.Frankie
   * @instance
   */
  attr: function() {
    var args = [this.els];
    [].push.apply(args, arguments);
    var ret = tooly.attr.apply(null, args);
    // return (ret instanceof tooly) ? this : ret;
    return ret;
  }
});
