var tooly = require('../../dist/tooly.js'),
    chai = require('chai'),
    logger = tooly.Logger('HANDLER', { level: 0 }),
    expect = chai.expect;

var noop = tooly.noop;


describe('tooly.Handler', function() {

  it('Should create a new instance with or without `new`', function() {
    var one = tooly.Handler();
    var two = new tooly.Handler();
    expect(one).to.be.instanceof(tooly.Handler);
    expect(two).to.be.instanceof(tooly.Handler);
    expect(one).to.not.equal(two);
  });
  
  it('Should add a `handlers` object to the class that is inheriting it', function() {
    function Klass() {
      tooly.Handler.call(this);
      return this;
    }
    Klass.prototype = new tooly.Handler();
    var klass = new Klass();
    expect(klass).to.have.property('handlers');
    expect(klass.handlers).to.be.instanceof(Object);
    expect(klass.handlers).to.not.be.instanceof(Array);
  });

  describe('#on', function() {
    it('Should add a name/[func] pair to the handlers object', function() {
      var handler = tooly.Handler();
      handler.on('name', function() { return true; });
      expect(handler.handlers).to.have.property('name');
      expect(handler.handlers.name[0]()).to.be.ok;
    });
    it('Should append additional functions of the same name to existing key', function() {
      var handler = tooly.Handler();
      handler.on('name', noop);
      expect(handler.handlers.name).to.have.length(1);
      handler.on('name', noop);
      handler.on('name', noop);
      expect(handler.handlers.name).to.have.length(3);
    });
  });

  describe('#register', function() {
    it('should add all key/val pairs to handlers object', function() {
      var handler = tooly.Handler();
      handler.register({
        one: noop,
        two: noop,
        tre: noop
      });
      expect(handler.handlers).to.have.property('one');
      expect(handler.handlers).to.have.property('two');
      expect(handler.handlers).to.have.property('tre');
    }); 
  });

  describe('#remove', function() {
    it('Should remove all handlers from given name', function() {
      var handler = tooly.Handler();
      handler.on('name', function() { return true; });
      expect(handler.handlers).to.have.property('name');
      handler.remove('name');
      expect(handler.handlers).to.not.have.property('name');
    });
    it('Should not effect handlers of a different name', function() {
      var handler = tooly.Handler();
      handler.on('1', noop);
      handler.on('2', noop);
      handler.remove('1');
      expect(handler.handlers).to.have.property('2');
      expect(handler.handlers).to.not.have.property('1');
    });
  });

  describe('#removeAll', function() {
    it('Should remove all handlers', function() {
      var handler = tooly.Handler();
      handler.on('1', noop);
      handler.on('2', noop);
      handler.removeAll();
      expect(handler.handlers).to.be.empty;
    });
  });

  describe('#trigger', function() {
    it('Should call a named handler', function() {
      var handler = tooly.Handler(),
          bar = false;
      handler.on('foo', function() {
        bar = true;
      });
      expect(bar).to.be.false;
      handler.trigger('foo');
      expect(bar).to.be.true;
    });
  }); 
});

