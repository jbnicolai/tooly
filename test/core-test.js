var tooly  = require('../dist/tooly.js'),
    chai   = require('chai'),
    expect = chai.expect;

chai.config.stackTrace = false;

describe('tooly', function() {

  describe('#endsWith()', function() {
    expect(tooly.endsWith('lokua.net', 'a.net')).to.be.ok;
  });

  describe('#format()', function() {
    expect(tooly.format('{0}{1}', 'tooly', '.js')).to.equal('tooly.js');
  });

  describe('#formatTime()', function() {
    expect(tooly.formatTime('3600')).to.equal('01:00:00');
  });

  describe('#scale()', function() {
    it('should scale 50 to 0.5', function() {
      expect(tooly.scale(50, 0, 100, 0, 1)).to.equal(0.5);
    });
  });

  describe('- inheritance', function() {
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