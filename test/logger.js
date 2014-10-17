var tooly = require('../dist/tooly');
// turn off for mocha * tests
var on = 1;

if (on) {
  var logger = new tooly.Logger(0, 'test-logger');
  // var goats = {a: 'djkrush', b: 'djshadow'};
  // logger.log('%d, %j, %s', 99, goats, 'hello world');
  // logger.trace('%d, %j, %s', 99, goats, 'hello world');
  // logger.debug('%d, %j, %s', 99, goats, 'hello world');
  // logger.info('%d, %j, %s', 99, goats, 'hello world');
  // logger.warn('%d, %j, %s', 99, goats, 'hello world');
  // logger.error('%d, %j, %s', 99, goats, 'hello world');

  var obj = { hello: 'world', arr: [1,2,3,4,5], reg: /d+/g };
  // var args = ['object with `o` format %o', obj];
  // logger.debug(tooly.type(args[0], 'string') && args[0].match(/\%(s|j|d|o)/g));
  // var replaced = args.shift();
  // logger.debug('replaced: ' + replaced);
  // logger.debug('>re>re> ' + replaced.replace(/%o/g, '%j'));
  logger.debug('object with `o` format: %o', require('util').inspect(obj));

  var logger2 = new tooly.Logger(0, '2nd-logger');
  logger2.debug('hi');
  tooly.Logger.off = true;

  // should not run
  logger.debug('hello');
  logger2.debug('world');
}