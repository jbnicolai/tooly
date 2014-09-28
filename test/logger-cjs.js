var tooly = require('../dist/tooly');

var logger = new tooly.Logger(0, 'test-logger');

var obj = {name: 'peachy', age: '27'};

// logger.log(obj);
// logger.trace(obj);
logger.debug(obj);
// logger.info(obj);
// logger.warn(obj);
// logger.error(obj);