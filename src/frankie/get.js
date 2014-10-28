


/**
 * Get the element at index `i` from Frankie's selected elements.
 * Unlike `#eq`, `get` returns the actual HTMLElement.
 * 
 * @memberOf tooly.Frankie
 * @category  Frankie
 * @instance
 */
tooly.Frankie.prototype.get = function(i) {
  return this.els[i];
};
