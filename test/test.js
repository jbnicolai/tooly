var tooly  = require('../dist/tooly.js'),
    chai   = require('chai'),
    expect = chai.expect;

chai.config.stackTrace = false;

describe(tooly, function() {

  describe('#endsWith()', function() {
    expect(tooly.endsWith('lokua.net', 'a.net')).to.be.ok;
  });

  describe('#format()', function() {
    expect(tooly.format('{0}{1}', 'tooly', '.js')).to.equal('tooly.js');
  });

  describe('#formatTime()', function() {
    expect(tooly.formatTime('3600')).to.equal('01:00:00');
  });

  var orig = function() {};
  orig.prototype = { a: 1, b: 2, c: 3 };
  var copy = tooly.objectCreate(orig);

  describe('copy = #objectCreate(orig)', function() {
    it('copy proto meths should match original\'s', function() {
      expect(copy.prototype.a).to.equal(1);
      expect(copy.prototype.b).to.equal(2);
      expect(copy.prototype.c).to.equal(3);
      expect(copy.prototype.a).to.equal(orig.prototype.a);
      expect(copy.prototype.b).to.equal(orig.prototype.b);
      expect(copy.prototype.c).to.equal(orig.prototype.c);
    });
  });

  describe('#propsOf(copy.prototype)', function() {
    it('should eql [a,b,c]', function() {
      expect(tooly.propsOf(copy.prototype)).to.eql(['a', 'b', 'c']);
    });
  });

  describe('#propCount()', function() {
    it('should equal 3', function() {
      expect(tooly.propCount(copy.prototype)).equal(3);
    });
  });

  describe('#scale()', function() {
    it('should scale 50 to 0.5', function() {
      expect(tooly.scale(50, 0, 100, 0, 1)).to.equal(0.5);
    });
  });

  describe('#fromProto', function() {
    it('should create a new "class" with inherited prototype', function() {

      function Parent() {
        this.arr = [];
      }
      Parent.prototype = { 
        push: function(item) { 
          this.arr.push(item); 
        }
      };

      function Child() {
        Parent.call(this);
      }
      Child.prototype = tooly.objectCreate(Parent.prototype, {
        push: {
          value: function() { // override
            Parent.prototype.push.apply(this, arguments);
          }
        }
      });
      Child.prototype.constructor = Child;

      var kid = new Child();
      kid.push(100);
      kid.push(200);

      expect(kid.arr.length).to.equal(2);
    });
  });
});