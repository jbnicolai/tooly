tooly.Frankie.prototype = {

  get: function(i) {
    return this.els[i];
  },

  eq: function(i) {
    // TODO: test parent vs document
    return new tooly.Frankie(this.els[i], this.parent());
  },

  /**
   * Check if this Frankie's `el` member is populated
   * 
   * @return {Boolean} true if the el member is null, undefined, or empty
   */
  zilch: function() {
    return this.els.length === 0;
  },

  parent: function() {
    var parents = tooly.parent(this.els),
        frankie = new tooly.Frankie();
    if (parents instanceof Array) {
      frankie.els = parents;
    }
    return frankie;
  },

  children: function() {
    var children = tooly.children(this.els),
        frankie = new tooly.Frankie();
    if (children instanceof Array) {
      frankie.els = children;
    }
    return frankie;
  },  

  hasClass: function(klass) {
    tooly.hasClass(this.els, klass);
    return this;
  },

  addClass: function(klass) {
    tooly.addClass(this.els, klass);
    return this;
  },

  removeClass: function(klass) {
    tooly.removeClass(this.els, klass);
    return this;
  },

  prepend: function(content) {
    tooly.prepend(this.els, content);
    return this;
  },

  append: function(content) {
    tooly.append(this.els, content);
    return this;
  },

  html: function(content) {
    // set
    if (content) {
      tooly.html(this.els, content);
      return this;
    }
    // get
    return tooly.html(this.els[0]);
  },
  
  css: function() {
    var args = [this.els];
    [].push.apply(args, arguments);
    tooly.css.apply(null, args);
    return this;
  },

  attr: function() {
    var args = [this.els];
    [].push.apply(args, arguments);
    var ret = tooly.attr.apply(null, args);
    console.log(tooly.toType(ret));
    // return (ret instanceof tooly) ? this : ret;
    return ret;
  }
};