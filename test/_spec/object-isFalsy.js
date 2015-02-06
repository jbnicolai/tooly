var tooly = require('../../dist/tooly');
var logger = tooly.Logger(0, 'IS_FALSY');

var emptyString = '';
var emptyStringWithWhiteSpaces = ' \n \t  ';
var falseString = 'false';
var falseStringWithSpaces = 'false  ';
var zeroString = '0';
var nullString = 'null';
var undefinedString = 'undefined';
var nullValue = null;
var setUndefined = undefined;
var undefinedValue;
var falseValue = false;
var zero = 0;

function isFalsy(obj) {
  if (obj == void 0 || obj == false) return true;
  if (tooly.type(obj, 'string')) {
    var str = obj.trim();
    return str === '' 
      || str === 'false' 
      || str === 'undefined' 
      || str === 'null';
  }
}

function isTruthy(obj) {
  return !isFalsy(obj);
}

log();

function log() {
  logger.info('should return true');
  logger.debug('emptyString                : %o', isFalsy(emptyString));
  logger.debug('emptyStringWithWhiteSpaces : %o', isFalsy(emptyStringWithWhiteSpaces));
  logger.debug('falseString                : %o', isFalsy(falseString));
  logger.debug('falseStringWithSpaces      : %o', isFalsy(falseStringWithSpaces));
  logger.debug('zeroString                 : %o', isFalsy(zeroString));
  logger.debug('nullString                 : %o', isFalsy(nullString));
  logger.debug('undefinedString            : %o', isFalsy(undefinedString));
  logger.debug('nullValue                  : %o', isFalsy(nullValue));
  logger.debug('setUndefined               : %o', isFalsy(setUndefined));
  logger.debug('undefinedValue             : %o', isFalsy(undefinedValue));
  logger.debug('falseValue                 : %o', isFalsy(falseValue));
  logger.debug('zero                       : %o', isFalsy(zero));
  logger.info('should return false');
  logger.debug('emptyString                : %o', isTruthy(emptyString));
  logger.debug('emptyStringWithWhiteSpaces : %o', isTruthy(emptyStringWithWhiteSpaces));
  logger.debug('falseString                : %o', isTruthy(falseString));
  logger.debug('falseStringWithSpaces      : %o', isTruthy(falseStringWithSpaces));
  logger.debug('zeroString                 : %o', isTruthy(zeroString));
  logger.debug('nullString                 : %o', isTruthy(nullString));
  logger.debug('undefinedString            : %o', isTruthy(undefinedString));
  logger.debug('nullValue                  : %o', isTruthy(nullValue));
  logger.debug('setUndefined               : %o', isTruthy(setUndefined));
  logger.debug('undefinedValue             : %o', isTruthy(undefinedValue));
  logger.debug('falseValue                 : %o', isTruthy(falseValue));
  logger.debug('zero                       : %o', isTruthy(zero));
}
