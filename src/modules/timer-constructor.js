//    +-------+
//    | TIMER |
//    +-------+

    /**
     * Timer constructor. 
     * @param {String} name optional name
     * @category Timer
     * @class  tooly.Timer
     * @constructor
     * @memberOf tooly
     */
    Timer: function(name) {
      // enable instantiation without new
      if (!(this instanceof tooly.Timer)) {
        return new tooly.Timer(name);
      }
      this.name = name || 'Timer_instance_' + Date.now();
      return this; 
    },
