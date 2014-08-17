var tooly  = require('../dist/tooly.js'),
    Handler = require('handler/dist/handler'),
    chai   = require('chai'),
    expect = chai.expect;

// goal:
// add prototype methods of Handler to prototype of Bird

describe('#inherit', function() {
  it('...', function() {

    function Bird() {
      this.n = 0;

      Handler.call(this);

      this.on('init', function() {
        this.n++;
      });

      this.init();

      return this;
    }

    Bird.prototype.init = function() {
      this.exec('init');
    };

    var bird = new Bird();
    expect(bird.n).to.equal(1);
    bird.init();
    expect(bird.n).to.equal(2);


  });
});