var tooly = require('../dist/tooly');

function test(param) {
  param = param || 'DEFAULT';
  console.log(param);
}

console.log('running without param...');
test();
console.log('running with param...');
test('HELLO PARAM!');
