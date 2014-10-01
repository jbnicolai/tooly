var tooly = require('../dist/tooly');

var value = 0;

var handler = new tooly.Handler();

function inc() { 
  value += 10; 
  handler.trigger('inc');
}

function announce() {
  value *= 2
}

handler.on('inc', announce);
inc();
// console.log(value);
