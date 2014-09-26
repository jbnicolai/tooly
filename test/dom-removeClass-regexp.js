var tooly = require('../dist/tooly.js'),
    Handler = require('handler/dist/handler'),
    chai = require('chai'),
    expect = chai.expect;

describe('removeClass', function() {

  var sel = 'lap-play-pause',
      play = 'lap-play';

  // sel = sel.replace(_between('lap-play'), ' ');
  sel = sel.replace(/\s*lap-play\s*(?![\w\W])/g, ' ');

  it('literal should not match', function() {
    expect(sel).to.equal('lap-play-pause');
  });

  // try again with regexp obj
  sel = 'lap-play-pause';

  function _between(str) {
    // AH! the damn RegExp string needs backslashes escaped!
    return new RegExp('\\s*' + str + '\\s*(?![\\w\\W])', 'g');
  }

  sel = sel.replace(_between(play), ' ');

  it('RegExp obj should not match', function() {
    expect(sel).to.equal('lap-play-pause');
  });

  sel = 'lap-play-pause lap-play';
  sel = sel.replace(_between(play), '');

  it('should match just lap-play', function() {
    expect(sel).to.equal('lap-play-pause');
  });

});