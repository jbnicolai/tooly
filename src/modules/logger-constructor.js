//    +--------+
//    | LOGGER |
//    +--------+

    /**
     * Class constructor. Typical logging functionality that wraps around console.log
     * with css coloring and level control. The Logger level hierarchy is as follows:
     *
     * - -1: off
     * - 0: log (no difference from console.log)
     * - 1: trace
     * - 2: debug
     * - 3: info
     * - 4: warn
     * - 5: error
     *
     * Only calls that are greater or equal to the current Logger.level will be run.
     *
     * ## Format
     * Format strings follow the same usage as node.js or the web interface, depending
     * on what environment you are in.
     * - node
     *   + %s, %j, and %d can be used for 'string', 'json', or 'number'
     * - browser
     *   + %s or %o can be used in place of 'string' or 'object'
     * 
     * @example
     * ```js
     * var logger = new tooly.Logger(2, 'kompakt');
     * logger.trace(logger); // will not run
     * ```
     * 
     * @param {Number} level set the level of this logger. Defaults to 2 (debug) if no
     *                       arguments are passed.
     * @param {String} name  optional name to identify this instance. The name will preceed any
     *                       output message
     *
     * @module Logger
     * @class  Logger
     * @constructor
     * @memberOf  tooly
     * @static
     */
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
