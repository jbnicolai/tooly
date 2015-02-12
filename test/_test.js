if (typeof exports === 'object') {
  var chai = require('chai'),
      tooly = require('../dist/tooly');

  var expect = chai.expect,
      assert = chai.assert,
      logger = tooly.Logger('TEST', { level: 0 });

  module.exports = run;   
}

// using override to test `tooly.extendTo` - if toolyOverride is supplied
// and these tests pass, we can assume `extendTo` works (at least for the tooly side).
function run(toolyOverride) {
  if (toolyOverride) tooly = toolyOverride;

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

    describe('empty', function() {
      it('should clear contents of object', function() {
        var obj = {a:1};
        tooly.empty(obj);
        expect(obj).to.be.empty;
      });
      it('should clear array', function() {
        var arr = [1,2,3,4,5,6,7,8,9];
        tooly.empty(arr);
        expect(arr).to.have.length(0);
        expect(arr).to.be.empty;
      });
    });

    describe('sort', function() {
      var data = [{name: 'a'}, {name: 2}, {name: 1}, {name: 'b'}, {name: 'c'}, {name: 'z'}];
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

  describe('tooly.Frankie', function() {

    if (typeof exports === 'object') return;

    describe('#addClass', function() {
      it('should add class to body', function() { 
        expect(tooly.Frankie('body').addClass('klass').attr('class').trim()).to.eql('klass');
      });
      it('should add multiple classes', function() {
        expect(tooly.Frankie('body').addClass('one two three').attr('class').trim()).to.eql('klass one two three');
      });
    });

    describe('#append', function() {
      it('should append "<p id="__test">appended!</p>" to ._1', function() {
        tooly.Frankie('body').append('<p id="__test">appended!</p>');
        expect(tooly.Frankie('body p').els).to.not.be.empty;
      });
    });

    describe('#attr', function() {
      it('should add 99 data-test attr on body (two string arg call) (and GET them back)', function() {
        tooly.Frankie('body').attr('data-test', 99);
        expect(tooly.Frankie('body').attr('data-test')).to.eql('99');
      });
      it('should add hash to body (and GET them back)', function() {
        tooly.Frankie('body').attr({ 'data-test2': 999, width: '100%', height: '100%' });
        expect(tooly.Frankie('body').attr('data-test2')).to.eql('999');
        expect(tooly.Frankie('body').attr('width')).to.eql('100%');
        expect(tooly.Frankie('body').attr('height')).to.eql('100%');
      });
    });

    describe('#children', function() {
      it('should contain 3 elements', function() {
        expect(tooly.Frankie('.abc').children().els).to.have.length(3);
      });
      it('should produce text: el p', function() {
        expect(tooly.Frankie('.abc').children().eq(1).html()).to.eql('el p');
      });
      it('should contain an empty element array when no children are present', function() {
        expect(tooly.Frankie('._8').children().els).to.be.empty;
      });
    });

    describe('#css', function() {
      it('should make background white and retrieve that property', function() {
        tooly.Frankie('body').css('background', '#fff');
        expect(tooly.Frankie('body').css('background').replace(/\s+/g, '')).to.eql('rgb(255,255,255)');
      });
      it('should be able to set via hash', function() {
        tooly.Frankie('body').css({ color: 'rgb(23,23,23)', 'font-family': 'Verdana' });
        expect(tooly.Frankie('body').css('color').replace(/\s+/g, '')).to.eql('rgb(23,23,23)');
        expect(tooly.Frankie('body').css('font-family')).to.eql('Verdana');
      });
    });

    describe('#each', function() {
      it('should iterate 3 times', function() {
        var k = [];
        tooly.Frankie('.abcd').each(function(i) { k.push(i); });
        expect(k).to.have.length(3);
      });
      it('should keep proper "this"', function() {
        tooly.Frankie('.abcd').each(function(i) {
          expect(this).to.be.instanceof(HTMLDivElement);
        })
      })
    });

    describe('#empty', function() {
      it('should remove text from second abcd', function() {
        tooly.Frankie('.abcd:nth-of-type(2)').empty(); // el p
        expect(tooly.Frankie('._6').children().zilch()).to.be.true
      });
    });

    describe('#eq', function() {
      it('should return a Frankie instance', function() {
        expect(tooly.Frankie('.ab').eq(0)).to.be.instanceof(_);
      });
      it('should return the correct index', function() {
        expect(tooly.Frankie('.ab').eq(1).attr('class').replace(/ab|\s+/g, '')).to.eql('_3');
      });
    });

    describe('#find', function() {
      it('should result in containing 3 .abcd elements', function() {
        expect(tooly.Frankie('body').find('.abcd').els).to.have.length(3);
      });
      it('end at square 1 after $(child).parent().find(child)', function() {
        expect(tooly.Frankie('._8').parent().find('._8').html()).to.eql('j dilla');
      }); 
    });

    describe('#get', function() {
      it('should return a raw dom element', function() {
        expect(tooly.Frankie('.ab').get(0)).to.be.instanceof(HTMLDivElement);
      });
      it('should return the correct index', function() {
        expect(tooly.Frankie('.ab').get(1).className.replace(/ab|\s+/g, '')).to.eql('_3');
      });
    });

    describe('#hasClass', function() {
      it('should return true for elements that have the class', function() {
        expect(tooly.Frankie('body').hasClass('one')).to.be.true;
        expect(tooly.Frankie('body').hasClass('two')).to.be.true;
        expect(tooly.Frankie('body').hasClass('three')).to.be.true;
        expect(tooly.Frankie('body').hasClass('klass')).to.be.true;
      });
      it('should return false if element does not have the class', function() {
        expect(tooly.Frankie('body').hasClass('boogie')).to.be.false;
      });
    });

    describe('#html', function() {
      it('should return the innerHTML of ._5 object', function() {
        expect(tooly.Frankie('._5').html()).to.eql('the opus');
      });
      it('should add "from chicago" to the ._5 object', function() {
        var $opus = tooly.Frankie('._5');
        expect($opus.html($opus.html() + ' from chicago').html()).to.eql('the opus from chicago');
      });
    });

    // describe('on', function() {
    //   it('should pass element as `this`', function() {
    //     tooly.Frankie('body').on('click', function() {  
    //       expect(this).to.have.property('nodeType');
    //     });
    //   });
    // });
  });

  describe('tooly.Handler', function() {
    
    var noop = tooly.noop;

    it('Should create a new instance with or without `new`', function() {
      var one = tooly.Handler();
      var two = new tooly.Handler();
      expect(one).to.be.instanceof(tooly.Handler);
      expect(two).to.be.instanceof(tooly.Handler);
      expect(one).to.not.equal(two);
    });
    
    it('Should add a `handlers` object to the class that is inheriting it', function() {
      function Klass() {
        tooly.Handler.call(this);
        return this;
      }
      Klass.prototype = new tooly.Handler();
      var klass = new Klass();
      expect(klass).to.have.property('handlers');
      expect(klass.handlers).to.be.instanceof(Object);
      expect(klass.handlers).to.not.be.instanceof(Array);
    });

    describe('#on', function() {
      it('Should add a name/[func] pair to the handlers object', function() {
        var handler = tooly.Handler();
        handler.on('name', function() { return true; });
        expect(handler.handlers).to.have.property('name');
        expect(handler.handlers.name[0]()).to.be.ok;
      });
      it('Should append additional functions of the same name to existing key', function() {
        var handler = tooly.Handler();
        handler.on('name', noop);
        expect(handler.handlers.name).to.have.length(1);
        handler.on('name', noop);
        handler.on('name', noop);
        expect(handler.handlers.name).to.have.length(3);
      });
    });

    describe('#register', function() {
      it('should add all key/val pairs to handlers object', function() {
        var handler = tooly.Handler();
        handler.register({
          one: noop,
          two: noop,
          tre: noop
        });
        expect(handler.handlers).to.have.property('one');
        expect(handler.handlers).to.have.property('two');
        expect(handler.handlers).to.have.property('tre');
      }); 
    });

    describe('#remove', function() {
      it('Should remove all handlers from given name', function() {
        var handler = tooly.Handler();
        handler.on('name', function() { return true; });
        expect(handler.handlers).to.have.property('name');
        handler.remove('name');
        expect(handler.handlers).to.not.have.property('name');
      });
      it('Should not effect handlers of a different name', function() {
        var handler = tooly.Handler();
        handler.on('1', noop);
        handler.on('2', noop);
        handler.remove('1');
        expect(handler.handlers).to.have.property('2');
        expect(handler.handlers).to.not.have.property('1');
      });
    });

    describe('#removeAll', function() {
      it('Should remove all handlers', function() {
        var handler = tooly.Handler();
        handler.on('1', noop);
        handler.on('2', noop);
        handler.removeAll();
        expect(handler.handlers).to.be.empty;
      });
    });

    describe('#trigger', function() {
      it('Should call a named handler', function() {
        var handler = tooly.Handler(),
            bar = false;
        handler.on('foo', function() {
          bar = true;
        });
        expect(bar).to.be.false;
        handler.trigger('foo');
        expect(bar).to.be.true;
      });
    }); 
  });

  describe('tooly <Object>', function() {
    
    var undefinedValue;
    var nullValue = null;
    var setUndefined = undefined;
    var falseValue = false;
    var zero = 0;
    var emptyString = ''; // same for ' \n\t   \n'
    var whiteCharsString = ' \n\t   \n';
    var falseString = 'false';
    var zeroString = '0';
    var nullString = 'null';
    var undefinedString = 'undefined';    

    describe('construct', function() {
      it('Should construct an object of given type [with no params]', function() {
        var logger = tooly.construct(tooly.Logger);
        expect(logger).to.be.instanceof(tooly.Logger);
        expect(logger.options.level).to.eql(0);
      });
      it('Should do the same with single arg', function() {
        var logger = tooly.construct(tooly.Logger, 'LOGGER');
        expect(logger.name).to.eql('LOGGER');
      });
      it('Should do the same with multiple arguments', function() {
        var logger = tooly.construct(tooly.Logger, 'LOGGER', { level: 1 });
        expect(logger.name).to.eql('LOGGER');
        expect(logger.options.level).to.eql(1);
      });
    });

    describe('extend', function() {

      var dest = { prop1: 1, prop2: 2 };
      var src = { prop3: 3 };
      var obj = tooly.extend({}, dest, src);

      it('should add src props to dest', function() {
        expect(obj).to.have.property('prop1');
        expect(obj).to.have.property('prop2');
        expect(obj).to.have.property('prop3');
      });
      it('should not mutate dest or src when empty obj is real dest', function() {
        expect(src).to.have.property('prop3');
        delete src.prop3;
        expect(src).to.be.empty;
        delete obj.prop1;
        expect(dest).to.have.property('prop1');
      });
      it('should take an arbitrary amount of src object', function() {
        var o = tooly.extend({}, { apple: true }, { banana: false }, { carrot: 999 });
        expect(o).to.have.property('apple');
        expect(o).to.have.property('banana');
        expect(o).to.have.property('carrot');
      });
    });

    describe('falsy', function() {    
      it('should return false for all provided variables', function() {
        expect(tooly.falsy(undefinedValue)).to.be.true;
        expect(tooly.falsy(nullValue)).to.be.true;
        expect(tooly.falsy(setUndefined)).to.be.true;
        expect(tooly.falsy(falseValue)).to.be.true;
        expect(tooly.falsy(zero)).to.be.true;
        expect(tooly.falsy(emptyString)).to.be.true;
        expect(tooly.falsy(whiteCharsString)).to.be.true;
        expect(tooly.falsy(falseString)).to.be.true;
        expect(tooly.falsy(zeroString)).to.be.true;
        expect(tooly.falsy(nullString)).to.be.true;
        expect(tooly.falsy(undefinedString)).to.be.true;
      });
      expect('alias to function the same', function() {
        expect(tooly.isFalsy(undefinedValue)).to.be.true;
        expect(tooly.isFalsy(nullValue)).to.be.true;
        expect(tooly.isFalsy(setUndefined)).to.be.true;
        expect(tooly.isFalsy(falseValue)).to.be.true;
        expect(tooly.isFalsy(zero)).to.be.true;
        expect(tooly.isFalsy(emptyString)).to.be.true;
        expect(tooly.isFalsy(whiteCharsString)).to.be.true;
        expect(tooly.isFalsy(falseString)).to.be.true;
        expect(tooly.isFalsy(zeroString)).to.be.true;
        expect(tooly.isFalsy(nullString)).to.be.true;
        expect(tooly.isFalsy(undefinedString)).to.be.true;      
      });
    });

    describe('fromPrototype', function() {
      it('Should construct object literals with prototype of choice', function() {
        function Cat() {
          this.meow = 'MEOW';
          return this;
        }
        var cat = tooly.fromPrototype(new Cat(), { name: 'Kitty', breed: 'Manx' });
        expect(cat).to.have.property('name');
        expect(cat).to.have.property('breed');
        expect(cat.meow).to.eql('MEOW');
        expect(cat.constructor.toString().split(/\s+/g)[0]).to.eql('function');
      });
    });

    describe('inherit', function() {

      it('Produces a child with parent\'s prototype', function() {
        function Parent() {}
        Parent.prototype.method = function() {};
        function Child() { Parent.call(this); }
        tooly.inherit(Parent, Child);
        var child = new Child();
        expect(child).to.have.property('method');
      });

      it('Should have both parent\'s prototype and new proto extended methods', function() {
        function Parent() {}
        Parent.prototype.method = function() {};
        function Child() { Parent.call(this); }
        tooly.inherit(Parent, Child, { method2: function() {} });
        var child = new Child();
        expect(child).to.have.property('method');
        expect(child).to.have.property('method2');
      });

      it('Should not mutate the parent\'s prototype', function() {
        function Parent() {}
        Parent.prototype.method = function() {};
        function Child() { Parent.call(this); }
        tooly.inherit(Parent, Child, { method2: function() {} });
        var child = new Child();
        var parent = new Parent();
        expect(parent).to.have.property('method');
        expect(parent).to.not.have.property('method2');
      });

    });

    describe('scale', function() {
      it('Should linearly scale numbers from one range to another', function() {
        expect(tooly.scale(5, 0, 10, 0, 100)).to.eql(50);
      });
    });

    describe('truth', function() {
      it('Should return true for all provided values', function() {
        expect(tooly.truthy(1)).to.be.true;
        expect(tooly.truthy([1])).to.be.true;
        expect(tooly.truthy({variable:1})).to.be.true;
        expect(tooly.truthy('a')).to.be.true;
        expect(tooly.truthy(true)).to.be.true;
      });
      it('Should return false for all provided variables', function() {
        expect(tooly.truthy(undefinedValue)).to.be.false;
        expect(tooly.truthy(nullValue)).to.be.false;
        expect(tooly.truthy(setUndefined)).to.be.false;
        expect(tooly.truthy(falseValue)).to.be.false;
        expect(tooly.truthy(zero)).to.be.false;
        expect(tooly.truthy(emptyString)).to.be.false;
        expect(tooly.truthy(whiteCharsString)).to.be.false;
        expect(tooly.truthy(falseString)).to.be.false;
        expect(tooly.truthy(zeroString)).to.be.false;
        expect(tooly.truthy(nullString)).to.be.false;
        expect(tooly.truthy(undefinedString)).to.be.false;
      });
      expect('alias to function the same', function() {
        expect(tooly.isFalsy(undefinedValue)).to.be.false;
        expect(tooly.isFalsy(nullValue)).to.be.false;
        expect(tooly.isFalsy(setUndefined)).to.be.false;
        expect(tooly.isFalsy(falseValue)).to.be.false;
        expect(tooly.isFalsy(zero)).to.be.false;
        expect(tooly.isFalsy(emptyString)).to.be.false;
        expect(tooly.isFalsy(whiteCharsString)).to.be.false;
        expect(tooly.isFalsy(falseString)).to.be.false;
        expect(tooly.isFalsy(zeroString)).to.be.false;
        expect(tooly.isFalsy(nullString)).to.be.false;
        expect(tooly.isFalsy(undefinedString)).to.be.false;      
      });
    });

    describe('type', function() {
      it('Should correctly return lowercase types', function() {
        expect(tooly.type({})).to.eql('object');
        expect(tooly.type([])).to.eql('array');
        expect(tooly.type(Object.create)).to.eql('function');
        expect(tooly.type('')).to.eql('string');
        expect(tooly.type(1)).to.eql('number');
        expect(tooly.type(/\s+/g)).to.eql('regexp');
        expect(tooly.type(false)).to.eql('boolean');
      });
    });
  });

  describe('tooly <String>', function() {

    var str = 'http://lokua.net/whatever.html';

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

  describe('tooly.Timer', function() {

    it('should be callable', function() {
      var timer = tooly.Timer();
    });

    it('should create new instance without new', function() {
      var timer = tooly.Timer();
      expect(timer).to.have.property('start');
    });

    it('should create two distinct instances', function() {
      var a = new tooly.Timer();
      var b = new tooly.Timer();
      expect(a).to.not.equal(b);
    });

    it('should auto gen a name', function() {
      var timer = tooly.Timer();
      expect(timer.name).to.be.a('string');
    });

    it('should have settable name', function() {
      var timer = tooly.Timer('peachy');
      expect(timer.name).to.equal('peachy');
    })

    describe('#stop', function() {
      it('should return a number', function() {
        var timer = tooly.Timer();
        timer.start();
        var n = timer.stop();
        expect(n).to.be.a('number');
      });
    });
  });
}
