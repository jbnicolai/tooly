function timer(name, fn) {
  var start = Date.now(), end;
  fn();
  end = Date.now();
  return end - start;
}

var arr = [];
for (var i = 0; i < 75999999; i++) {
  arr.push(i * -1);
}

function a() {
  return timer('chached counter and length', function() {
    var i = 0, len = arr.length;
    for (; i < len; i++) {
      var j = i;
    }
  });
}

function b() {
  return timer('normal loop', function() {
    for (var i = 0; i < arr.length; i++) {}
  });
}

function c() {
  return timer('cached length', function() {
    for (var i = 0, len = arr.length; i < len; i++) {}
  });
}

var x = 0, y = 0, z = 0;
var runs = 20;
for (var i = 0; i < runs; i++) {
  x += a();
  y += b();
  z += c();
}

console.log(x/runs);
console.log(y/runs);
console.log(z/runs);