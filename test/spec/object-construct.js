var tooly = require('../../dist/tooly.js');
var logger = tooly.Logger(0, 'EACH_TEST');

function construct(constructor, args) {
  function F() {
    return constructor.apply(this, args);
  }
  F.prototype = constructor.prototype;
  return new F();
}

konstruct = function(ctor, args) {
  function F() {
    return (_type(args) === 'array')
      ? ctor.apply(this, args)
      : ctor.call(this, args);
  }
  F.prototype = ctor.prototype;
  return new F();
};

var obj = tooly.construct(tooly.Logger, ['0', 'whatever']);
var obk = construct(tooly.Logger, ['0', 'whatever again']);

logger.debug(obj.prototype, obj.constructor.prototype);
logger.debug(obk.prototype, obk.constructor.prototype);