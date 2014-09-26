var tooly  = require('../dist/tooly.js');

var arr = [];

for (var i = 0; i < 5999999; i++) {
  arr.push(i * -1);
}

tooly.timer('normal loop', function() {
  for (var i = 0; i < arr.length; i++) {}
});

tooly.timer('cached length', function() {
  for (var i = 0, len = arr.length; i < len; i++) {}
});

var i = 0, len = arr.length, s = '.';
tooly.timer('chached counter and length', function() {
  for (; i < len; i++) {}
});

