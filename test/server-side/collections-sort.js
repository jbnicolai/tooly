var tooly  = require('../../dist/tooly.js'),
    chai   = require('chai'),
    expect = chai.expect;

var data = [
  {name: 'a'},{name: 2},{name: 1},
  {name: 'b'},{name: 'c'},{name: 'z'}
];

describe('#sort', function() {
  it('should sort by key default ascending', function() {
    expect(tooly.sort(data, 'name')).to.eql([
      {name: 1},
      {name: 2},
      {name: 'a'},
      {name: 'b'},
      {name: 'c'},
      {name: 'z'}
    ]);
  });
  it('should sort by key descending', function() {
    expect(tooly.sort(data, 'name', true)).to.eql([
      {name: 'z'},
      {name: 'c'},
      {name: 'b'},
      {name: 'a'},
      {name: 2},
      {name: 1}
    ]);
  });
});
