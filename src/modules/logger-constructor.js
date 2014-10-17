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
     * var logger = new tooly.Logger(2, 'TEST_LOGGER');
     * logger.trace(logger); // will not output
     * ```
     * All active loggers in the current context can be disabled, regardless of level,
     * by setting the static `tooly.Logger.off = true`. Setting back to false will resume
     * logging at each loggers previous level.
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
      var logger = this;
      tooly.Logger.loggers = tooly.Logger.loggers || [];
      // enable instantiation without new
      if (!(logger instanceof tooly.Logger)) {
        logger = new tooly.Logger(level, name);
        tooly.Logger.loggers.push(logger);
      }
      logger.level = (level !== undefined) ? level : 2;
      if (name) logger.name = name;
      // automatically set this false as its only 
      // for emergency "must track anonymous function location" purposes
      logger.traceAnonymous = false;
      return logger;
    },
