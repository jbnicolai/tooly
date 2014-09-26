//    +-------+
//    | TIMER |
//    +-------+

    Timer: function(name) {
      // enable instantiation without new
      if (!(this instanceof tooly.Timer)) {
        return new tooly.Timer(name);
      }
      this.name = name || 'Timer_instance_' + Date.now();
      return this; 
    },
