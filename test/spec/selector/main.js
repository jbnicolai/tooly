var tooly = require('../dist/tooly');

tooly.Selector = function(el) {
  if (!(this instanceof tooly.Selector)) {
    return new tooly.Selector(selector);
  }
  this.el = tooly.select(el);
}

tooly.Selector.prototype = {
  hasClass: function(klass) {
    return tooly.hasClass(this.el, klass);
  },
  addClass: function(klass) {
    return tooly.addClass(this.el, klass);
  }
};
