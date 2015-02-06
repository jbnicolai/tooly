


/**
 * Append `content` to all elements in the set of matched elements.
 * Note that unlike jQuery, this implementation will clone (instead of moving) 
 * node(s) being appended.
 *
 * @example
 * ```html
 * // jQuery
 * <div class="a"></div>
 * <div class="b"></div>
 * <script>$('.b').append('.a');</script>
 * // results in:
 * <div class="b"><div class="a"></div></div>
 * // whereas Frankie results in: 
 * <div class="a"></div>
 * <div class="b"><div class="a"></div></div>
 * ```
 * 
 * @param  {mixed}  content  the content to append
 * @return {tooly.Frankie} `this`
 *
 * @memberOf  tooly.Frankie
 * @category  Frankie
 * @instance
 */
tooly.Frankie.prototype.append = function(content) {
  _pend(true, this.els, content);
  return this;
};
