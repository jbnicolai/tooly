var tooly  = require('../../dist/tooly.js'),
    chai   = require('chai'),
    expect = chai.expect;

describe('tooly <Collections>', function() {

  describe('each', function() {

    it('should increase each val in obj by 100', function() {
      var obj = {'1': 1, '2': 2, '3': 3, '4': 4};
      tooly.each(obj, function(v, k, o) { o[k] = v*100; });
      expect(obj).to.eql({'1': 100, '2': 200, '3': 300, '4': 400});
    });

    it('should do the same for array', function() {
      var arr = [1, 2, 3, 4];
      tooly.each(arr, function(v, i, a) { a[i] = v*100; });
      expect(arr).to.eql([100, 200, 300, 400]);
    });
  });
  
  describe('sort', function() {

    var data = [{name: 'a'}, {name: 2}, {name: 1},{name: 'b'}, {name: 'c'}, {name: 'z'}];

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


});