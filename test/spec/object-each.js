var tooly = require('../../dist/tooly.js');
var logger = tooly.Logger(0, 'EACH_TEST');

var _nativeForEach = Array.prototype.forEach;

// turn off during mocha tests
logger.level = -1;

function each(obj, iterator, context) {
  if (obj == null) return;
  if (_nativeForEach && obj.forEach === _nativeForEach) {
    obj.forEach(iterator, context);
  } else {
    var i = 0, len = obj.length;
    if (len === +len) {
      for (; i < len; i++) {
        iterator.call(context, obj[i], i, obj);
      }
    } else {
      var keys = Object.keys(obj);
      for (len = keys.length; i < len; i++) {
        iterator.call(context, obj[keys[i]], keys[i], obj);
      }
    }
  }
  return obj;
}

var arr = [99, 1, 50, 13, 84];

var newArr = each(arr, function(el, i, arr) {
  logger.debug('el: %j, i: %j, arr: %j', el, i, arr);
});
logger.debug('newArr: %j', newArr);

var thisArg = 1000;
newArr = each(arr, function(el, i, arr) {
  arr[i] += this;
}, thisArg);
logger.debug('newArr+thisArg: %j', newArr);

var obj = { a: 99, b: 1, c: 50, d: 13, e: 84 };
each(obj, function(v, k, o) {
  o[k] = v*100;
});
logger.debug('obj: %j', obj);
