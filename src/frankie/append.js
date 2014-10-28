


/**
 * append `content` to all elements in the set of matched elements.
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
