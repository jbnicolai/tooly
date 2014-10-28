


/**
 * Create a Frankie instance from all parent elements of the set of matched elements.
 * 
 * @return {tooly.Frankie} a new Frankie instance
 *
 * @memberOf  tooly.Frankie
 * @category  Frankie
 * @instance
 */
tooly.Frankie.prototype.parent = function() {
  var frank = new tooly.Frankie();
  var seen = {};
  frank.els = this.els.map(function(x) { 
    return x.parentNode; 
  }).filter(function(x) {
    return seen.hasOwnProperty(x) ? false : (seen[x] = true);
  });
  return frank;
};
