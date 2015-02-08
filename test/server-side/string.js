var tooly  = require('../../dist/tooly.js'),
    chai   = require('chai'),
    logger = tooly.Logger('STRNIG', { level: 0 }),
    expect = chai.expect;

var str = 'http://lokua.net/whatever.html';

describe('tooly <String>', function() {

  describe('contains', function() {
    it('returns true if match is found', function() { 
      expect(tooly.contains(str, 'net')).to.be.true;
    });
    it('returns false when no match is found', function() {
      expect(tooly.contains(str, 'bologna'));
    });
  });

  describe('endsWith', function() {
    it('returns true for match', function() {
      expect(tooly.endsWith('lokua.net', 'a.net')).to.be.true;
    });
    it('returns false for lack', function() {
      expect(tooly.endsWith('lokua.net', '.com')).to.be.false;
    });
  });

  describe('extension', function() {
    it('should return only the file extension (without the dot)', function() {
      expect(tooly.extension(str)).to.equal('html');
    });
  });

  describe('format', function() {
    it('should return strings for %s flags', function() {
      expect(tooly.format('%s%s%s', 'a', ' string', ' with spaces and punctuat!on.'))
        .to.equal('a string with spaces and punctuat!on.');
    });
    it('should handle %f and %i flags', function() {
      expect(tooly.format('%i%d%f%f', 0, 1, 0.3, 0.4)).to.equal('010.30.4');
    });
    it('should handle %o and %j the same', function() {
      var o = {key:0};
      expect(tooly.format('%o,%j', o, o)).to.equal('{"key":0},{"key":0}');
    });
    it('should handle arbitrary combinations', function() {
      var o = {key:0};
      expect(tooly.format('%i%d%f%j%o', 1,2,3.3,o,o)).to.equal('123.3{"key":0}{"key":0}');
    });
  });

  describe('formatMoney', function() {
    it('add some punctuation', function() {
      expect(tooly.formatMoney(10989.34, '$')).to.equal('$10,989.34');
    });
  });

  describe('formatString', function() {
    it('does basic iterpolation', function() {
      expect(tooly.formatString('{0}{1}', 'tooly', '.js')).to.equal('tooly.js');
    });
    it('has working StringFormat alias', function() {
      expect(tooly.stringFormat).to.eql(tooly.formatString);
    });
  });

  describe('formatTime', function() {
    it('converts 3600 to an hour', function() {
      expect(tooly.formatTime('3600')).to.equal('01:00:00');
    });
  });

  describe('leftPad', function() {
    it('should work for aliases', function() {
      tooly.lpad('3000', 10);
      tooly.lPad('3000', 10);
      tooly.leftPad('3000', 10);
      tooly.leftpad('3000', 10);
    });
    it('should default to empty string', function() {
      expect(tooly.leftPad('1', 3)).to.equal('  1');
    });
    it('should pad correctly', function() {
      expect(tooly.lPad('3', 3, '*')).to.equal('**3');
    });
    it('should work for pure numbers too', function() {
      expect(tooly.lPad(3, 3, '*')).to.equal('**3');
    });
  });

  describe('repeat', function() {
    it('repeats', function() {
      expect(tooly.repeat('1', 2)).to.equal('11');
    });
  });

  describe('rightPad', function() {
    it('should work for aliases', function() {
      tooly.rpad('3000', 10);
      tooly.rPad('3000', 10);
      tooly.rightPad('3000', 10);
      tooly.rightpad('3000', 10);
    });
    it('should default to empty string', function() {
      expect(tooly.rpad('1', 3)).to.equal('1  ');
    });
    it('should pad correctly', function() {
      expect(tooly.rpad('3', 3, '*')).to.equal('3**');
    });
    it('should work for pure numbers too', function() {
      expect(tooly.rpad(3, 3, '*')).to.equal('3**');
    });
  });

  describe('sliceRel', function() {
    it('should return only the relative path (default without slashes)', function() {  
      expect(tooly.sliceRel('http://lokua.net/music')).to.eql('music');
    });
    it('should keep first slash', function() {
      expect(tooly.sliceRel('http://lokua.net/music', true)).to.eql('/music');
    });
    it('should keep both slashes', function() {
      expect(tooly.sliceRel('http://lokua.net/music/', true, true)).to.eql('/music/');
    });
    it('should not add a trailing slash if it was not there already', function() {
      expect(tooly.sliceRel('http://lokua.net/music', true, true)).to.eql('/music');
    });
  });

  describe('startWith', function() {
    it('should...you get the idea', function() {
      expect(tooly.startsWith('http://lokua.net', 'http')).to.be.true;
      expect(tooly.startsWith('http://lokua.net', 'https')).to.be.false;
    });
  });
  
  describe('stripExtension', function() {
    it('should slice the extension from html filename', function() {
      expect(tooly.stripExtension(str)).to.equal('http://lokua.net/whatever');
    });
    it('has working stripExt alias', function() {
      expect(tooly.stripExt(str)).to.equal('http://lokua.net/whatever');
    });
  });

  // tooly.tag needs a dom
  // describe('tag', function() {
  // });


});
