var tooly = require('../dist/tooly');

function Parent() {}
Parent.prototype.b = 2;
function Child() { Parent.call(this); } // this is a must
tooly.inherit(Parent, Child, { a: 1 });
var child = new Child();
console.log(child.a + child.b); //=> 3
