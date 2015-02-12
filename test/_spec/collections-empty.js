var tooly = require('../../dist/tooly'),
    logger = tooly.Logger('EMPTY');

tooly.empty = function(el) {
  if (tooly.type(el) === 'object') {
    tooly.each(el, function(v, k) {
      delete el[k];
    });
    return tooly;
  }
  while (el.length) el.pop();
  return tooly;
};

var obj = {a: 1, b: 2, c: 3};
var a = 1, b = 2, c = 3;
var obj2 = {a: a, b: b, c: c};
var arr = [1,2,3];

logger.info(obj, obj2, arr);
tooly.empty(obj).empty(obj2).empty(arr);
logger.info(obj, obj2, arr);
logger.info(a,b,c);