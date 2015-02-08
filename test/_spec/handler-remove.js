var tooly = require('../../dist/tooly.js'),
    logger = tooly.Logger('HANDLER_REMOVE', { level: 0 }); 

tooly.Handler.prototype.remove = function(fn) {
  if (this.handlers[fn] !== undefined) {
    delete this.handlers[fn];
  }
}

var handler = tooly.Handler();

handler.on('name', function() {
  logger.debug('name handler called');
});
handler.on('somethingElse', function() {
  // 
});

logger.debug(handler.handlers);
handler.trigger('name');
handler.remove('name');
logger.debug(handler.handlers);