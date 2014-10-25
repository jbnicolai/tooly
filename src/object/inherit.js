


/**
 * Helper to perform prototypal inheritance.
 * Note that this method overwrites the child's original prototype.
 * Also note that the child's constructor needs to call `parent.call(this)`
 *
 * @example
 * ```js
 * function Parent() {}
 * Parent.prototype.b = 2;
 * function Child() { Parent.call(this); } // this is a must
 * tooly.inherit(Parent, Child, { a: 1 });
 * var child = new Child();
 * console.log(child.a + child.b); //=> 3
 * // for a more practical example see the tooly.Handler documentation.
 * ```
 * 
 * @param  {Function} parent
 * @param  {Function} child  
 * @param  {Mixed} extend additional members to the Child's prototype 
 * 
 * @memberOf  tooly
 * @category  Object
 * @static
 */
tooly.inherit = function(parent, child, extend) {
  child.prototype = new parent();
  child.prototype.constructor = child;
  for (var prop in extend) {
    if (extend.hasOwnProperty(prop)) {
      child.prototype[prop] = extend[prop];
    }
  }
};
