


/**
 * @param  {String} klass
 * @return {this}
 *
 * @memberOf  tooly.Frankie
 * @category  Frankie
 * @instance
 */
tooly.Frankie.prototype.toggleClass = function(klass) {
  var i = 0, len = this.els.length, el;
  for (; i < len; i++) {
    el = this.eq(i);
    if (el.hasClass(klass)) {
      el.removeClass(klass);
    } else {
      el.addClass(klass);
    }
  }
  return this;
};
