var tooly = require('../dist/tooly.js'),
    chai = require('chai'),
    expect = chai.expect;


function Klass() {
  tooly.Handler.call(this);
  this.value = 99;
  this.on('inc', function() { 
    console.log('hello'); 
  });
  return this;
}

tooly.inherit(tooly.Handler, Klass, (function() {
  return {
    inc: function() {
      this.value++;
      this.exec('inc');
    }
  };
})());

var klass = new Klass();
klass.inc(); //=> klass.value === 100
