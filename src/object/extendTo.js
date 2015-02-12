


/**
 * Rather then compete with other util libs, tooly can lend all of its 
 * methods to another object conveniently. In the case of duplicated method names,
 * tooly will forfit its own implementation in favor of the extended.  
 * Extending Lodash/underscore was the prime motivation for this, as it is quite nice
 * to only have to use the `_` char for similar utility purposes.
 *
 * @example
 *  ```js
 *  // as simple as
 *  tooly.extendTo(_);
 *  // or alternatively, in node...
 *  var _ = require('tooly').extendTo(require('lodash'));
 *  ```
 *
 * @param  {Object} dest the destination to add tooly methods to
 *
 * @category  Object
 * @memberOf tooly
 * @static
 */
tooly.extendTo = function(_) {
  for (var p in tooly) {
    if (tooly.hasOwnProperty(p) && !_.hasOwnProperty(p)) {
      _[p] = tooly[p];
    }
  }
};