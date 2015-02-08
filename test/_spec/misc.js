var tooly = require('../../dist/tooly');

var _defaults = {
  level: 0, 
  bypassTimestamp: true,
  bypassLine: true,
  textFormat: 'color:black;',
  lineFormat: 'color:gray;font-size:9px;',
  nameFormat: 'color:magenta'
};

var options = { level: 1 };

for (var prop in _defaults) {
  if (!options.hasOwnProperty(prop)) {
    options[prop] = _defaults[prop];
  }
}

console.log(options);