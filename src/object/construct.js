/**
 * @param  {Function} ctor 
 * @param  {Object|Array} args 
 * @return {Object}
 * 
 * @memberOf  tooly
 * @category  Object
 * @static      
 */
tooly.construct = function(ctor, args) {
  // the stupid name leads to more revealing output in logs
  function ToolySurrogateConstructor() {
    return (_type(args) === 'array') 
      ? ctor.apply(this, args) 
      : ctor.call(this, args);
  }
  ToolySurrogateConstructor.prototype = ctor.prototype;
  return new ToolySurrogateConstructor();
};

