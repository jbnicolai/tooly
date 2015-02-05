var tooly = require('../dist/tooly');

var logger = tooly.Logger(-1, 'FUNKY_TIME');

var funkyTime = tooly.funkyTime.bind(this);

var data = [], i = 0, n = 99000;
for (; i < n; i++) {
  data.push(Math.random()*(1/3));
}

var results = funkyTime(function() { data.sort(); }, 5);

logger.info(results);

