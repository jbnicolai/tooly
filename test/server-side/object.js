var tooly  = require('../../dist/tooly.js'),
    chai   = require('chai'),
    logger = tooly.Logger('OBJECT', { level: 0 }),
    expect = chai.expect;

var undefinedValue;
var nullValue = null;
var setUndefined = undefined;
var falseValue = false;
var zero = 0;
var emptyString = ''; // same for ' \n\t   \n'
var whiteCharsString = ' \n\t   \n';
var falseString = 'false';
var zeroString = '0';
var nullString = 'null';
var undefinedString = 'undefined';    

describe('tooly <Object>', function() {

  describe('construct', function() {
    it('Should construct an object of given type [with no params]', function() {
      var logger = tooly.construct(tooly.Logger);
      expect(logger).to.be.instanceof(tooly.Logger);
      expect(logger.options.level).to.eql(0);
    });
    it('Should do the same with single arg', function() {
      var logger = tooly.construct(tooly.Logger, 'LOGGER');
      expect(logger.name).to.eql('LOGGER');
    });
    it('Should do the same with multiple arguments', function() {
      var logger = tooly.construct(tooly.Logger, 'LOGGER', { level: 1 });
      expect(logger.name).to.eql('LOGGER');
      expect(logger.options.level).to.eql(1);
    });
  });

  describe('extend', function() {

    var dest = { prop1: 1, prop2: 2 };
    var src = { prop3: 3 };
    var obj = tooly.extend({}, dest, src);

    it('should add src props to dest', function() {
      expect(obj).to.have.property('prop1');
      expect(obj).to.have.property('prop2');
      expect(obj).to.have.property('prop3');
    });
    it('should not mutate dest or src when empty obj is real dest', function() {
      expect(src).to.have.property('prop3');
      delete src.prop3;
      expect(src).to.be.empty;
      delete obj.prop1;
      expect(dest).to.have.property('prop1');
    });
    it('should take an arbitrary amount of src object', function() {
      var o = tooly.extend({}, { apple: true }, { banana: false }, { carrot: 999 });
      expect(o).to.have.property('apple');
      expect(o).to.have.property('banana');
      expect(o).to.have.property('carrot');
    });
  });

  describe('falsy', function() {    
    it('should return false for all provided variables', function() {
      expect(tooly.falsy(undefinedValue)).to.be.true;
      expect(tooly.falsy(nullValue)).to.be.true;
      expect(tooly.falsy(setUndefined)).to.be.true;
      expect(tooly.falsy(falseValue)).to.be.true;
      expect(tooly.falsy(zero)).to.be.true;
      expect(tooly.falsy(emptyString)).to.be.true;
      expect(tooly.falsy(whiteCharsString)).to.be.true;
      expect(tooly.falsy(falseString)).to.be.true;
      expect(tooly.falsy(zeroString)).to.be.true;
      expect(tooly.falsy(nullString)).to.be.true;
      expect(tooly.falsy(undefinedString)).to.be.true;
    });
    expect('alias to function the same', function() {
      expect(tooly.isFalsy(undefinedValue)).to.be.true;
      expect(tooly.isFalsy(nullValue)).to.be.true;
      expect(tooly.isFalsy(setUndefined)).to.be.true;
      expect(tooly.isFalsy(falseValue)).to.be.true;
      expect(tooly.isFalsy(zero)).to.be.true;
      expect(tooly.isFalsy(emptyString)).to.be.true;
      expect(tooly.isFalsy(whiteCharsString)).to.be.true;
      expect(tooly.isFalsy(falseString)).to.be.true;
      expect(tooly.isFalsy(zeroString)).to.be.true;
      expect(tooly.isFalsy(nullString)).to.be.true;
      expect(tooly.isFalsy(undefinedString)).to.be.true;      
    });
  });

  describe('fromPrototype', function() {
    it('Should construct object literals with prototype of choice', function() {
      function Cat() {
        this.meow = 'MEOW';
        return this;
      }
      var cat = tooly.fromPrototype(new Cat(), { name: 'Kitty', breed: 'Manx' });
      expect(cat).to.have.property('name');
      expect(cat).to.have.property('breed');
      expect(cat.meow).to.eql('MEOW');
      expect(cat.constructor.toString().split(/\s+/g)[0]).to.eql('function');
    });
  });

  describe('inherit', function() {

    it('Produces a child with parent\'s prototype', function() {
      function Parent() {}
      Parent.prototype.method = function() {};
      function Child() { Parent.call(this); }
      tooly.inherit(Parent, Child);
      var child = new Child();
      expect(child).to.have.property('method');
    });

    it('Should have both parent\'s prototype and new proto extended methods', function() {
      function Parent() {}
      Parent.prototype.method = function() {};
      function Child() { Parent.call(this); }
      tooly.inherit(Parent, Child, { method2: function() {} });
      var child = new Child();
      expect(child).to.have.property('method');
      expect(child).to.have.property('method2');
    });

    it('Should not mutate the parent\'s prototype', function() {
      function Parent() {}
      Parent.prototype.method = function() {};
      function Child() { Parent.call(this); }
      tooly.inherit(Parent, Child, { method2: function() {} });
      var child = new Child();
      var parent = new Parent();
      expect(parent).to.have.property('method');
      expect(parent).to.not.have.property('method2');
    });

  });

  describe('scale', function() {
    it('Should linearly scale numbers from one range to another', function() {
      expect(tooly.scale(5, 0, 10, 0, 100)).to.eql(50);
    });
  });

  describe('truth', function() {
    it('Should return true for all provided values', function() {
      expect(tooly.truthy(1)).to.be.true;
      expect(tooly.truthy([1])).to.be.true;
      expect(tooly.truthy({variable:1})).to.be.true;
      expect(tooly.truthy('a')).to.be.true;
      expect(tooly.truthy(true)).to.be.true;
    });
    it('Should return false for all provided variables', function() {
      expect(tooly.truthy(undefinedValue)).to.be.false;
      expect(tooly.truthy(nullValue)).to.be.false;
      expect(tooly.truthy(setUndefined)).to.be.false;
      expect(tooly.truthy(falseValue)).to.be.false;
      expect(tooly.truthy(zero)).to.be.false;
      expect(tooly.truthy(emptyString)).to.be.false;
      expect(tooly.truthy(whiteCharsString)).to.be.false;
      expect(tooly.truthy(falseString)).to.be.false;
      expect(tooly.truthy(zeroString)).to.be.false;
      expect(tooly.truthy(nullString)).to.be.false;
      expect(tooly.truthy(undefinedString)).to.be.false;
    });
    expect('alias to function the same', function() {
      expect(tooly.isFalsy(undefinedValue)).to.be.false;
      expect(tooly.isFalsy(nullValue)).to.be.false;
      expect(tooly.isFalsy(setUndefined)).to.be.false;
      expect(tooly.isFalsy(falseValue)).to.be.false;
      expect(tooly.isFalsy(zero)).to.be.false;
      expect(tooly.isFalsy(emptyString)).to.be.false;
      expect(tooly.isFalsy(whiteCharsString)).to.be.false;
      expect(tooly.isFalsy(falseString)).to.be.false;
      expect(tooly.isFalsy(zeroString)).to.be.false;
      expect(tooly.isFalsy(nullString)).to.be.false;
      expect(tooly.isFalsy(undefinedString)).to.be.false;      
    });
  });

  describe('type', function() {
    it('Should correctly return lowercase types', function() {
      expect(tooly.type({})).to.eql('object');
      expect(tooly.type([])).to.eql('array');
      expect(tooly.type(Object.create)).to.eql('function');
      expect(tooly.type('')).to.eql('string');
      expect(tooly.type(1)).to.eql('number');
      expect(tooly.type(/\s+/g)).to.eql('regexp');
      expect(tooly.type(false)).to.eql('boolean');
    });
  });
})

