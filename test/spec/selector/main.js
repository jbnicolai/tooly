// var tooly = require('../dist/tooly');

tooly.Selector = function(el) {
  if (!(this instanceof tooly.Selector)) {
    return new tooly.Selector(el);
  }
  this.el = tooly.selectAll(el);
  return this;
}

tooly.Selector.prototype = {
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
    tooly.prepend(this.el);
    return this;
  },
  append: function(content) {
    tooly.append(this.el);
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


