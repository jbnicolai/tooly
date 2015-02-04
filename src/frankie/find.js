


/**
 * @param  {Mixed} selector  same as #Frankie constructor
 * @return {Frankie}          new Frankie instance
 */
tooly.Frankie.prototype.find = function(selector) {
  var $found = tooly.Frankie(selector),
      $this = this,
      els = [], 
      i = j = 0,
      flen = $found.els.length,
      tlen = $this.els.length,
      el;
  for (; i < flen; i++) {
    el = $found.els[i];
    for (; j < tlen; j++) {
      if ($this.els[j].contains(el)) {
        els.push(el);
      }
    }
  }
  $found.els = els;
  return $found; 
};