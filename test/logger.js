var tooly = require('../dist/tooly');
var on = 0;

if (on) {
  var logger = new tooly.Logger(0, 'test-logger');
  var goats = {a: 'djkrush', b: 'djshadow'};
  logger.log('%d, %j, %s', 99, goats, 'hello world');
  logger.trace('%d, %j, %s', 99, goats, 'hello world');
  logger.debug('%d, %j, %s', 99, goats, 'hello world');
  logger.info('%d, %j, %s', 99, goats, 'hello world');
  logger.warn('%d, %j, %s', 99, goats, 'hello world');
  logger.error('%d, %j, %s', 99, goats, 'hello world');
}