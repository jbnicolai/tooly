// --- begin object module    
    /**
     * copy properties from source object to target
     * 
     * @param  {Object} target the destination object
     * @param  {Object} source the object we are copying
     * @return {Obect} target
     */     
    extend: function(target, source) {
      target = target || {};

      for (var prop in source) {
        if (source.hasOwnProperty(prop)) {

          if (tooly.toType(prop) === 'object') {
            target[prop] = extend(target[prop] = source[prop]);
          } else {
            target[prop] = source[prop];
          }
        }
      }
      
      return target;
    },

    /**
     * Object literal assignment results in creating an an object with Object.prototype
     * as the prototype. This allows us to assign a different prototype while keeping the convenience
     * of literal literation.
     * 
     * @param  {Object} prototype
     * @param  {Object} object    
     * @return {Object}
     * @author Yehuda Katz (slightly modified)
     * @see http://yehudakatz.com/2011/08/12/understanding-prototypes-in-javascript/ 
     */
    fromPrototype: function(prototype, object) {
      var newObject = tooly.objectCreate(prototype),
          prop;
     
      for (prop in object) {
        if (object.hasOwnProperty(prop)) {
          newObject[prop] = object[prop];      
        }
      }
     
      return newObject;
    },

    /**
     * alias for #fromPrototype
     */
    fromProto: function(prototype, object) {
      return tooly.fromPrototype(prototype, object);
    },

    /**
     * note - overwrites original child.prototype
     * note - the child's constructor needs to call `parent.call(this)`
     * 
     * @param  {Function} parent
     * @param  {Function} child  
     * @param  {Object} extend additional methods to add to prototype
     */
    inherit: function(parent, child, extend) {

      child.prototype = new parent();
      child.prototype.constructor = child;

      for (var prop in extend) {
        if (extend.hasOwnProperty(prop)) {
          child.prototype[prop] = extend[prop];
        }
      }
    },

    /**
     * function version of ECMA5 Object.create
     * 
     * @param  {Object} o  the object/base prototype
     * @return {Object}    new object based on o prototype
     */
    objectCreate: function(o) {
      var F = function() {};
      F.prototype = o;
      return new F();
    },
    
    /**
     * Equivalent of Object.keys(obj).length
     * 
     * @param  {Object} obj the object whose ownProperties we are counting
     * @return {number}     the number of "ownProperties" in the object
     * @memberOf tooly
     */
    propCount: function(obj) {
      var count = 0;
      for (var o in obj) {
        if (obj.hasOwnProperty(o)) {
          count++;
        }
      }
      return count;
    },

    /**
     * get an array of an object's "ownProperties"
     * 
     * @param  {Object} obj     the object of interest
     * @return {Array.<Object>} the "hasOwnProperties" of obj
     * @memberOf tooly
     */
    propsOf: function(obj) {
      var props = [];
      for (var o in obj) {
        if (obj.hasOwnProperty(o)) {
          props.push(o);
        }
      }
      return props;
    },
// --- end object module    