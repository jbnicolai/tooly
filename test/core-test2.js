var tooly  = require('../dist/tooly.js'),
    Handler = require('handler/dist/handler'),
    chai   = require('chai'),
    expect = chai.expect;

describe('--- tooly(cont)', function() {
  describe('#inherit', function() {

    function Bird() {
      this.n = 0;

      Handler.call(this);

      this.on('init', function() {
        this.n++;
      });

      this.init();

      return this;
    }

    tooly.inherit(Handler, Bird, {
      init: function() {
        this.exec('init');
      }
    });

    var bird = new Bird();

    it('should increment n', function() {
      expect(bird.n).to.equal(1);
    });
    it('should increment n', function() {
      bird.init();
      expect(bird.n).to.equal(2);
    });
  });
});
