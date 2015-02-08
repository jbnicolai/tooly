var tooly = require('../../dist/tooly.js');
var logger = tooly.Logger('TOOLY#CONSTRUCT');

function construct(ctor) {
  var args = arguments,
      len = args.length;
  function F() {
    if (len > 2)  {
      return ctor.apply(this, [].slice.call(args, 1));
    } else if (len === 2) {
      return ctor.call(this, args[1]);
    }
    return ctor.call(this);
  }
  F.prototype = ctor.prototype;
  return new F();
};

var log = construct(tooly.Logger);
logger.debug(log, '\n'+ log.name);

log = construct(tooly.Logger, 'TES2');
logger.debug(log, '\n'+ log.name);

log = construct(tooly.Logger, 'TEST3', { level: 1 });
logger.debug(log, '\n'+ log.name);

var arr = construct(Array);
logger.debug(arr);

arr = construct(Array, 3);
logger.debug(arr);

arr = construct(Array, 1, 2, 3);
logger.debug(arr);

