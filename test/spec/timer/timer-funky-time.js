var tooly = require('../../../dist/tooly.js');

// why have two timers?
function funkyTime(fn, n) {
  var tx = tooly.Timer(),
      ix = tooly.Timer(),
      stack = [],
      i = end = avg = 0;
  tx.start();
  for (; i < n; i++) {
    ix.start();
    fn.call();
    stack.push(ix.stop());
  }
  end = tx.stop();
  avg = end/n;
  return { 
    stack: stack,
    total: end,
    average: avg,
    offset: (function() {
      var sum = 0;
      stack.forEach(function(x) { sum += x; });
      return parseFloat((end - (sum/n)).toFixed(2));
    })()
  };
}

var data = [], i = 0, n = 99000;
for (; i < n; i++) {
  data.push(Math.random()*(1/3));
}

var results = funkyTime(function() {
  var rndm = data.sort();
}, 5);

console.log(results);