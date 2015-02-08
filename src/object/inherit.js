


/**
 * Helper to perform prototypal inheritance.
 * Note that this method overwrites the child's original prototype.
 * Also note that the child's constructor needs to call `parent.call(this)`
 *
 * TODO: eliminate the need for `parent.call(this)` in Child constructor.
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
 * @param  {Function} Parent
 * @param  {Function} Child  
 * @param  {Object}   extension add additional members to the Child.prototype
 * 
 * @memberOf  tooly
 * @category  Object
 * @static
 */
tooly.inherit = function(Parent, Child, extension) {
  Child.prototype = new Parent();
  Child.prototype.constructor = Child;
  for (var prop in extension) {
    if (extension.hasOwnProperty(prop)) {
      Child.prototype[prop] = extension[prop];
    }
  }
};
