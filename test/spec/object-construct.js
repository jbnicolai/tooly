var tooly = require('../../dist/tooly.js');
var logger = tooly.Logger(0, 'TOOLY#CONSTRUCT');

function construct(ctor, args) {
  function F() { 
    return tooly.type(args) === 'array' ? ctor.apply(this, args) : ctor.call(this, args);
  }
  F.prototype = ctor.prototype;
  return new F();
}

function Klass(plug) {
  tooly.Handler.call(this);
  this.plug = plug;
  this.init();
  return this;
}
Klass.prototype.init = function() {
  var klass = this;
  klass.plugin = construct(klass.plug.constructor, klass);
  klass.plugin.init();
};

function Plugin(klass) {
  this.klass = klass;
  return this;
}
Plugin.prototype.init = function() {
  logger.debug(this.klass);
};

var klass = new Klass({ constructor: Plugin });