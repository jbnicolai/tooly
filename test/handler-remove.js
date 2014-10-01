var tooly = require('../dist/tooly'),
    expect = require('chai').expect,
    logger = tooly.Logger(2, 'REMOVE-TEST');

describe('tooly.Handler', function() {

  function Main() {
    this.value = 10;
    this.handler = new tooly.Handler(this);
    this.handler.on('announce', function() {
      this.value += 10;
    });
    this.handler.on('jump', function() {
      this.value *= 2;
    });
  }

  Main.prototype.announce = function() {
    this.handler.trigger('announce');
  };

  Main.prototype.jump = function() {
    this.handler.trigger('jump');
  };

  describe('#remove', function() {

    it('should remove the correct handlers', function() {
      var main = new Main();

      main.announce();
      main.announce();
      main.announce();
      main.announce();
      expect(main.value).to.equal(50);

      main.handler.remove('announce');

      main.announce();
      main.announce();
      main.announce();
      main.announce();
      expect(main.value).to.equal(50);

      main.jump();
      expect(main.value).to.equal(100);
    });
  });

  describe('#removeAll', function() {

    it('should remove ALL handlers', function() {
      var main = new Main();
      main.announce();
      main.jump();
      expect(main.value).to.equal(40);
      
      main.handler.removeAll();
      main.announce();
      main.jump();
      expect(main.value).to.equal(40);
    });
  });
});    


