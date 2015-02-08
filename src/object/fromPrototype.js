


/**
 * Object literal assignment results in creating an an object with Object.prototype
 * as the prototype. This allows us to assign a different prototype while keeping 
 * the convenience of literal declaration. Note that the `prototype` parameter should
 * be an instance, as in the return value of `new Klass()`, not `Klass.prototype`.
 * 
 * @param  {Object} prototype
 * @param  {Object} object    
 * @return {Object}
 * 
 * @author Yehuda Katz
 * @see http://yehudakatz.com/2011/08/12/understanding-prototypes-in-javascript/
 * 
 * @memberOf  tooly
 * @category  Object
 * @static 
 */
tooly.fromPrototype = function(prototype, object) {
  var newObject = Object.create(prototype), 
      prop;
  for (prop in object) {
    if (object.hasOwnProperty(prop)) {
      newObject[prop] = object[prop];
    }
  }
  return newObject;
};
