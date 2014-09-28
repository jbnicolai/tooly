var tooly = require('../dist/tooly');

var logger = new tooly.Logger(2, 'test-logger');
var goats = {a: 'djkrush', b: 'djshadow'};

logger.log(goats);
logger.trace(goats);
logger.debug('%d%j%s', 99, goats, 'hello world');
logger.debug('hello world');
// logger.info('%d, %j, %s', 99, goats, '...');
// logger.warn(goats);
// logger.error(goats);