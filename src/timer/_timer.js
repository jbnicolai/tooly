


/**
 * Timer class constructor. Contains basic `start` and `stop` methods for timing
 * of code execution. Also see #funkyTime, which is a static method to time
 * function executions and is simpler to use than manually controlling a timer instance.
 *  
 * @param {String} name [optional] name
 * 
 * @category Timer
 * @class  tooly.Timer
 * @constructor
 * @memberOf tooly
 * @static
 */
tooly.Timer = function(name) {
  // enable instantiation without new
  if (!(this instanceof tooly.Timer)) {
    return new tooly.Timer(name);
  }
  this.name = name || 'Timer_instance_' + Date.now();
  return this; 
};
