var tooly = require('../../dist/tooly');

var logger = new tooly.Logger('NODE', { 
  level: 0, 
  bypassTimestamp: false,
  bypassLine: false
});

console.log('ALL LEVELS SHOULD PRINT');
logger.log('log');
logger.trace('trace');
logger.debug('debug');
logger.info('info');
logger.warn('warn');
logger.error('error');

logger.options.level = 5;
console.log('ONLY ERROR SHOULD PRINT');
logger.log('log');
logger.trace('trace');
logger.debug('debug');
logger.info('info');
logger.warn('warn');
logger.error('error');

logger.options.level = 4;
console.log('ONLY [ERROR,WARNING] SHOULD PRINT');
logger.log('log');
logger.trace('trace');
logger.debug('debug');
logger.info('info');
logger.warn('warn');
logger.error('error');

logger.options.level = 3;
console.log('ONLY [ERROR,WARNING,INFO] SHOULD PRINT');
logger.log('log');
logger.trace('trace');
logger.debug('debug');
logger.info('info');
logger.warn('warn');
logger.error('error');

logger.options.level = 2;
console.log('ONLY [ERROR,WARNING,INFO,DEBUG] SHOULD PRINT');
logger.log('log');
logger.trace('trace');
logger.debug('debug');
logger.info('info');
logger.warn('warn');
logger.error('error');

logger.options.level = 1;
console.log('ONLY [ERROR,WARNING,INFO,DEBUG,TRACE] SHOULD PRINT');
logger.log('log');
logger.trace('trace');
logger.debug('debug');
logger.info('info');
logger.warn('warn');
logger.error('error');

logger.options.level = 0;
logger.options.bypassTimestamp = true;
console.log('TIMESTAMPS: FALSE');
logger.log('log');
logger.trace('trace');
logger.debug('debug');
logger.info('info');
logger.warn('warn');
logger.error('error');