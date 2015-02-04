


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
 * Only calls that are greater or equal to the current Logger.options.level will be run.
 *
 * ## Format
 * Format strings follow the same usage as node.js or the web interface, depending
 * on what environment you are in.
 * - node
 *   + %s, %j, and %d can be used for 'string', 'json', or 'number'
 * - browser
 *   + %s or %o can be used in place of 'string' or 'object'
 * 
 * ## Example
 * ```js
 * var logger = new tooly.Logger('TEST_LOGGER', { level: 2 });
 * logger.trace(logger); // will not output
 * ```
 *
 * ## Options
 * + _`level`_: number (default 2: debug)
 * + _`bypassTimestamp`_: boolean (default: false)
 * + _`bypassLine`_: boolean (remove line number from output prefix. default: false)
 * + _`textFormat`_: a css for a `%c` flag, ie. `'color:blue;font-size:22px;'`
 * + _`lineFormat`_: same as textFormat for line number styling
 * 
 * All active loggers in the current context can be disabled, regardless of level,
 * by setting the static `tooly.Logger.off = true`. Setting back to false will resume
 * logging at each loggers previous level.
 * 
 * @param {String} name  optional name to identify this instance. The name will preceed any output message
 * @param {Object} options an object containing this logger's level and other output options
 * 
 * @category Logger
 * @class  tooly.Logger
 * @constructor
 * @memberOf  tooly
 * @static
 */
tooly.Logger = function(name, options) {
  var logger = this;
  tooly.Logger.loggers = tooly.Logger.loggers || [];
  // enable instantiation without new
  if (!(logger instanceof tooly.Logger)) {
    logger = new tooly.Logger(name, options);
    tooly.Logger.loggers.push(logger);
  }
  logger.options = {};
  logger.options.level = options.level !== undefined ? options.level : 2;
  logger.options.bypassTimestamp = options.bypassTimestamp || true;
  logger.options.bypassLine = options.bypassLine || true;
  logger.options.textFormat = options.textFormat || 'color:black;';
  logger.options.lineFormat = options.lineFormat || 'color:gray;font-size:9px;';
  // logger.options.groupFormat = options.groupFormat || 
  //   'color:black;' +
  //   'font-size:18px;' + 
  //   'font-weight:bold;' +
  //   'text-decoration:underline;';
  if (name) logger.name = name;
  return logger;
};
