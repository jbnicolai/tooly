var tooly  = require('../dist/tooly.js'),
    chai   = require('chai'),
    expect = chai.expect;

function extend(target, source) {
  target = target || {};
  for (var prop in source) {
    if (source.hasOwnProperty(prop)) {
      if (tooly.toType(prop) === 'object') {
        target[prop] = extend(target[prop] = source[prop]);
      } else {
        target[prop] = source[prop];
      }
    }
  }
  return target;
}

describe('#extend', function() {

  var obj = extend({
    name: 'peachy',
    address: {
      street: '6620 N. Newgard Ave.',
      zip: '60626'
    }
  }, {
    about: {
      occupation: ['poet', 'journalist', 'expo'],
      height: 'short',
      other: {
        a: '1', 
        b: '2', 
        c: { 
          c1: 11, 
          c2: 22
        }
      }
    }
  });

  it('should at least make it this far', function() {});

  describe('extended object', function() {

    it('should contain name key', function() {
      expect(obj).to.include.keys('name');
    });

    it('should copy deep', function() {
      expect(obj).to.have.deep.property('about.other.c.c1', 11);
    });

  });


});

