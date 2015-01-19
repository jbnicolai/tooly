var tooly = require('../dist/tooly');

var logger = new tooly.Logger('NODE', { 
  level: 0, 
  bypassTimestamp: false,
  bypassLine: false
});

logger.log('log');
logger.debug('debug');
logger.info('info');
logger.warn('warn');
logger.error('error');