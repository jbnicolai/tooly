var tooly  = require('../../dist/tooly.js'),
    chai   = require('chai'),
    logger = tooly.Logger('OBJECT', { level: 0 }),
    expect = chai.expect;

describe('tooly <Object>', function() {

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
})

