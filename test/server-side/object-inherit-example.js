var tooly = require('../../dist/tooly.js');
var expect = require('chai').expect;

describe('inherit', function() {
  function Parent() {}
  Parent.prototype.b = 2;
  function Child() { Parent.call(this); }
  tooly.inherit(Parent, Child, { a: 1 });
  var child = new Child();
  expect(child.a + child.b).to.equal(3);
});
