var tooly = require('../../dist/tooly'),
    path = require('path'),
    fs = require('fs');

var logger = tooly.Logger(0, 'STRING_CONTAINS');

function contains(source, str, index) {
  return source.indexOf(str, index || 0) > -1;
}

var source = fs.readFileSync(path.resolve(__dirname, '../../dist/tooly.js'), 'utf8');
var str_1 = 'Function Execution Time';
var str_2 = 'OOGA FUCKING BOOGA';

logger.debug(contains(source, str_1));
logger.debug(contains(source, str_2));

