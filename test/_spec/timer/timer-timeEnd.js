function timer(name, cb) {
  if (console.time) {
    console.time(name);
    cb();
    console.timeEnd(name);
  }
}

var arr = [];
for (var i = 0; i < 75999999; i++) {
  arr.push(i * -1);
}

timer('chached counter and length', function() {
  var i = 0, len = arr.length;
  for (; i < len; i++) {
    var j = i;
  }
});

timer('normal loop', function() {
  for (var i = 0; i < arr.length; i++) {}
});

timer('cached length', function() {
  for (var i = 0, len = arr.length; i < len; i++) {}
});