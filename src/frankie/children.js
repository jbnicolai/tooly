


/**
 * Create a new Frankie instance from all first-generation child elements of 
 * the current set of matched elements;
 *     
 * @return {tooly.Frankie} new Frankie instance
 * 
 * @memberOf  tooly.Frankie
 * @category  Frankie
 * @instance
 */
tooly.Frankie.prototype.children = function() {
  var frank = new tooly.Frankie();
  this.els.forEach(function(x) { 
    var c = x.children;
    if (_node(c)) {
      frank.els.push(c);
    } else if (_type(c) === 'htmlcollection') {
      [].push.apply(frank.els, [].slice.call(c).map(function(v) { return v; }));
    }
  });
  return frank;
};
