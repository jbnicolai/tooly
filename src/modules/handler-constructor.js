//    +----------------+
//    | HANDLER MODULE |
//    +----------------+
    
    /**
     * Constructor.
     * 
     * @class  Handler
     * @constructor
     * @param {Object}  context   (optional) designates the owner of the `handlers` array that holds 
     *                            all callbacks. When blank the Handler instance uses its own internal
     *                            array. If you'd like to keep track of the handlers outside of the
     *                            instance, pass a context such that context.handlers is an array.
     */
    Handler: function(context) {
      if (!(this instanceof tooly.Handler)) {
        return new tooly.Handler(context);
      }
      this.context = context || this;
      this.handlers = this.context.handlers = {};
      return this;
    },
    