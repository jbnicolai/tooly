//    +--------+
//    | LOGGER |
//    +--------+

    Logger: function(level, name) {
      // enable instantiation without new
      if (!(this instanceof tooly.Logger)) {
        return new tooly.Logger(level, name);
      }
      this.level = (level !== undefined) ? level : 2;
      if (name) this.name = name;

      // automatically set this false as its only 
      // for emergency "must track anonymous function location" purposes
      this.traceAnonymous = false;
      
      return this;
    },
