


/**
 * Find all descendent elements of all elements in the current set.
 * 
 * @param  {Mixed} selector  same as #Frankie constructor
 * @return {Frankie}          new Frankie instance
 */
tooly.Frankie.prototype.find = function(selector) {
  var $found = tooly.Frankie(selector),
      $this = this,
      els = [];
  $found.els.forEach(function(child) {
    $this.els.forEach(function(parent) {
      if (parent.contains(child)) els.push(child);
    });
  });
  $found.els = els;
  return $found; 
};