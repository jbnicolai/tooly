var tooly  = require('../dist/tooly.js'),
    chai   = require('chai'),
    expect = chai.expect;

var str = 'http://lokua.net/whatever.html';

describe('tooly#stripExt', function() {
  it('should slice the extension from html filename', function() {
    expect(tooly.stripExtension(str)).to.equal('http://lokua.net/whatever');
  });
});    
describe('tooly#ext', function() {
  it('should return only the file extension (without the dot)', function() {
    expect(tooly.ext(str)).to.equal('html');
  });
});  