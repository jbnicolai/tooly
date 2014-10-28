var tooly = require('../dist/tooly.js'),
    chai = require('chai'),
    expect = chai.expect;


describe('Handler', function() {
  function Klass() {
    tooly.Handler.call(this);
    this.value = 99;
    this.on('inc', function() { 
      this.value *= 2;
      return this.value;
    });
    return this;
  }

  tooly.inherit(tooly.Handler, Klass, (function() {
    return {
      inc: function() {
        this.value++;
        this.trigger('inc');
      }
    };
  })());

  var klass = new Klass();
  klass.inc();
  expect(klass.value).to.equal(200);
});
