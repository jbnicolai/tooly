


/**
 * Class constructor. Simple event handling, best when inherited. Execute named functions
 * by triggering a Handler reference of the same name.
 *
 * ### Example
 * ```js
 * var handler = new tooly.Handler();
 *
 * function world() { 
 *   console.log('world!'); 
 * }
 * 
 * function hello() { 
 *   console.log('hello '); 
 *   handler.trigger('hello');
 * }
 * 
 * handler.on('hello', function() { 
 *   world(); 
 * });
 * 
 * hello(); //=> "hello world!";
 * ```
 *
 * Using [#inherit](`tooly.inherit`), you can add all Handler functionality to your class
 * without having to use the handler reference:
 *
 * ```js
 * function MyClass(name) {
 *   // initialize the parent class
 *   tooly.Handler.call(this);
 *   this.name = name;
 *   this.init();
 *   return this;
 * }
 * 
 * // add all of the tooly.Handler.prototype methods to MyClass.prototype.
 * // third argument also augments MyClass.prototype
 * tooly.inherit(MyClass, tooly.Handler, {
 * 
 *   init: function() {
 *     this.on('load', function() {
 *       console.log(this.name + ' loaded');
 *     });
 *   },
 *   
 *   load: function() {
 *     // whatever...
 *   }
 * });
 *
 * var instance = new MyClass("let's drink a lot of Malort and get "); 
 * instance.load(); //=> "let's drink a lot of Malort and get loaded"
 * ```
 * 
 * @param {Object}  context   (optional) designates the owner of the `handlers` array that holds 
 *                            all callbacks. When blank the Handler instance uses its own internal
 *                            array. If you'd like to keep track of the handlers outside of the
 *                            instance, pass a context such that context.handlers is an array.
 * @class  tooly.Handler
 * @constructor
 * @category  Handler
 * @memberOf  tooly
 * @static
 */
tooly.Handler = function(context) {
  if (!(this instanceof tooly.Handler)) {
    return new tooly.Handler(context);
  }
  this.context = context || this;
  this.handlers = this.context.handlers = {};
  return this;
};
    