var tooly  = require('../../dist/tooly.js'),
    chai   = require('chai'),
    expect = chai.expect;

function extend() {
  var sources = [].slice.call(arguments),
      target = sources.shift();
  target = target || {};
  tooly.each(sources, function(source) {
    for (var prop in source) {
      if (source.hasOwnProperty(prop)) {
        if (tooly.toType(source[prop]) === 'object') {
          target[prop] = extend(target[prop], source[prop]);
        } else {
          target[prop] = source[prop];
        }
      }
    }
  });
  return target;
}

describe('#extend', function() {

  var obj = extend(
    {
      a: {
        a:'a'
      }
    }, 
    {
      a: {
        b:'b'
      }
    }, 
    {
      b: {
        c: {
          d: {
            e:'e'
          } 
        } 
      }
    }
  );

  console.log(obj);

  it('should at least make it this far', function() {});

  describe('extended object', function() {

    it('should contain b key', function() {
      expect(obj).to.include.keys('b');
    });

    it('should copy deep', function() {
      expect(obj).to.have.deep.property('b.c.d.e', 'e');
    });

  });


});

