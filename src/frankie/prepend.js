


/**
 * Prepend `content` to all elements in the set of matched elements.
 * Note that unlike jQuery, this implementation will clone (instead of moving) 
 * node(s) being appended.
 *
 * @example
 * ```html
 * // jQuery
 * <div class="a"></div>
 * <div class="b"></div>
 * <script>$('.a').prepend('.b');</script>
 * // results in:
 * <div class="a"><div class="b"></div></div>
 * // whereas Frankie results in: 
 * <div class="a"><div class="b"></div></div>
 * <div class="b"></div>
 * ```
 * 
 * @param  {mixed}  content  the content to prepend
 * @return {tooly.Frankie} `this`
 *
 * @memberOf  tooly.Frankie
 * @category  Frankie
 * @instance
 */
tooly.Frankie.prototype.prepend = function(content) {
  _pend(false, this.els, content);
  return this;
};
