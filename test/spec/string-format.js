var tooly = require('../../dist/tooly');
var logger = tooly.Logger(0, 'STRING_FORMAT');

var _type = tooly.type;

function format(format) {
  var args = Array.prototype.slice.call(arguments, 1);
  return format.replace(/\%[ojdifs]+/gi, function(match, i) {
    var x = args.shift();
    if (x !== undefined) {
      var m = match.slice(1);
      if (m === 'o' || m === 'j') x = JSON.stringify(x);
      // if (m === 'd' || m === 'i') x = parseInt(x);
      if (m === 'd' || m === 'i') x = x | 0;
      if (m === 'f') x = parseFloat(x);
      return x;
    }
    return match;
  });
}

function stringFormat(format) {
  var args = Array.prototype.slice.call(arguments, 1);
  return format.replace(/{(\d+)}/g, function(match, number) { 
    return typeof args[number] != 'undefined' ? args[number] : match;
  });
};

var f = format('\n%o\n%j\n%d\n%i\n%f\n%s', 
  {name:'peach'}, {name:'peach'}, 12.2, 12.2, 12.2, 'hello');
logger.debug(f);

var f = format('\n%o\n%j\n%d\n%i\n%f\n%s', 'undefined', {}, 2342.2343);
logger.debug(f);

var funkyTime = tooly.Timer.prototype.funkyTime.bind(this);

var arr = [];
for (var i = 0; i < 8777666; i++) {
  arr[i] = Math.random()*200 + "";
}
var a = funkyTime(function(i) { arr[i] = arr[i] | 0; }, 1);
var b = funkyTime(function(i) { arr[i] = parseInt(arr[i]); }, 1);
logger.debug(a.total);
logger.debug(b.total);