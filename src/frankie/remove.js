


/**
 * // TODO
 * 
 * @param  {mixed} element        the element(s) to remove from the instance's array of elements
 *                                as well as the DOM
 * @param  {Boolean} returnRemoved If true, the elements will be returned from the function (within)
 *                                 a new Frankie instance 
 *                                 (which will keep them in memory if yo store them in a reference)
 * @return {this|Frankie}         
 */
tooly.Frankie.prototype.remove = function(element, returnRemoved) {
  var ret = [], i, frank = this, len = frank.els.length, els;
  els = _type(element, 'array') 
    ? element
    : _node(element)
      ? _toArray(element)
      : els instanceof tooly.Frankie 
        ? element.els
        : _type(element, 'string')
          ? new tooly.Frankie(element, frank).els
          : null;
  if (els) {
    els.forEach(function(c) { 
      for (i = 0; i < len; i++) {
        var p = frank.els[i];
        if (c.parentNode === p) {
          returnRemoved ? ret.push(p.removeChild(c)) : p.removeChild(c);
          return; // am i needed???
        }
      }
    });
  }
  if (returnRemoved) {
    var f = new Frankie();
    f.els = ret;
    return f;
  }
  return frank;
};
