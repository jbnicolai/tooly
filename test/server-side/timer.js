var tooly  = require('../../dist/tooly.js'),
    chai   = require('chai'),
    expect = chai.expect;

describe('tooly.Timer', function() {

  it('should be callable', function() {
    var timer = tooly.Timer();
  });

  it('should create new instance without new', function() {
    var timer = tooly.Timer();
    expect(timer).to.have.property('start');
  });

  it('should create two distinct instances', function() {
    var a = new tooly.Timer();
    var b = new tooly.Timer();
    expect(a).to.not.equal(b);
  });

  it('should auto gen a name', function() {
    var timer = tooly.Timer();
    expect(timer.name).to.be.a('string');
  });

  it('should have settable name', function() {
    var timer = tooly.Timer('peachy');
    expect(timer.name).to.equal('peachy');
  })

  describe('#stop', function() {
    it('should return a number', function() {
      var timer = tooly.Timer();
      timer.start();
      var n = timer.stop();
      expect(n).to.be.a('number');
    });
  });

});

