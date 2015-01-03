var tooly = require('../dist/tooly');

var logger = new tooly.Logger(0, 'BYPASS?', true);
logger.debug('<<-- timestamp?');
logger.info('<<-- timestamp?');

logger.log('log');
logger.debug('debug');
logger.info('info');
logger.warn('warn');
logger.error('error');