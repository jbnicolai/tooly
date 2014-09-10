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
     *                            array. If you'd like to keep track of the handlers outside of Handler,
     *                            pass the parent owner of @param `handler` as context.
     */
    Handler: function(context) {
      this.context = context || this;
      this.context.handlers = [];
      this.handlers = this.context.handlers;
      return this;
    },
    