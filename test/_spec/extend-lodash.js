var tooly = require('../../dist/tooly.js'),
    _ = require('lodash');

tooly.extendTo = function(_) {
  for (var p in tooly) {
    if (tooly.hasOwnProperty(p) && !_.hasOwnProperty(p)) {
      _[p] = tooly[p];
    }
  }
};

tooly.extendTo(_);

require('../_test')( tooly );


