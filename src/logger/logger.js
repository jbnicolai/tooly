var _cjs = typeof exports === 'object',
    _push = _arrayProto.push,
    _chalk = _cjs ? require('chalk') : null
    _levels = ['dummy','trace','debug','info','warn','error'],
    _colors = [
      'gray', // dummy
      'gray',
      'green',
      _cjs ? 'cyan' : 'blue',
      _cjs ? 'yellow' : 'darkorange',
      'red',
      'gray' // last gray for time
    ],
    _o_re = /%o/gi,
    _j_re = /%j/gi; 
    
function _log(instance, level, caller, args) {
  if (tooly.Logger.off || instance.level === -1 || level < instance.level || instance.level > 5) {
    return;
  }

  var format = '%s%s', // name, [LEVEL] [HH:mm:ss]
      pargs = []; // final args for console call

  args = _slice.call(args);
  _format_re = _format_re || /\%[ojdifsc]/g;

  if (_cjs) {

    // TODO: replace match with RegExp#test
    if (tooly.type(args[0], 'string') && args[0].match(_format_re)) {
      format += args.shift().replace(_o_re, '%j');
    }
    pargs.unshift(format, _name(instance), _level(level));

  } else { // window
    format = '%c%s%c%s%c%s';
    if (tooly.type(args[0], 'string') && args[0].match(_format_re)) {
      format += args.shift().replace(_j_re, '%o');
    }
    caller = (caller !== undefined && caller.replace(_ws_re, '') === '') ? '' : caller;
    var color = 'color:' + _colors[level] + ';',
        purple = 'color:purple', black = 'color:black';
    pargs = [format, purple, _name(instance), color, _level(level), black, caller];
  }

  _push.apply(pargs, args);

  switch (level) {
    case -1: 
      return;

    case 0: 
      console.log(arguments[3]); 
      break;

    case 2: 
      // there is no console.debug, 
      // so the _levels map (default case) doesn't work there
      console.log.apply(console, pargs); 
      break;

    default: 
      // http://stackoverflow.com/
      // questions/8159233/typeerror-illegal-invocation-on-console-log-apply
      try {
        console[ _levels[level] ].apply(console, pargs);
      } catch(e) {
        console.log('[Logger (recovery mode)] ', pargs);
      }
      break;
  }
}

function _checkCaller(args) {
  if (!this.traceAnonymous) return '';
  var name = ''; 
  try { 
    name = args.callee.caller.name; 
  } catch(ignored) {
  }
  if (!name) {
    return  '<anonymous> ' + args.callee.caller + '\n';
  }
  return '<'+name+'> ';
}

function _name(instance) {
  var name = instance.name || '';
  return (_chalk) ? _chalk.magenta(name) : name;
}

function _level(level) {
  return _chalkify(level, ' ' + _levels[level].toUpperCase() + ' ') +
    _chalkify(6, '[' + _dateFormatted() + '] ');
}

function _dateFormatted() {
  function format(n) { return n < 10 ? '0' + n : n }
  var d = new Date();
  return [
    format(d.getHours()),
    format(d.getMinutes()),
    format(d.getSeconds()),
    d.getMilliseconds()
  ].join(':');
}

function _chalkify(level, str) {
  return (!_chalk) ? str : _chalk[ _colors[level] ](str);
}

tooly.Logger.prototype.log   = function() { _log(this, 0, _checkCaller(arguments), arguments); };
tooly.Logger.prototype.trace = function() { _log(this, 1, _checkCaller(arguments), arguments); };
tooly.Logger.prototype.debug = function() { _log(this, 2, _checkCaller(arguments), arguments); };
tooly.Logger.prototype.info  = function() { _log(this, 3, _checkCaller(arguments), arguments); };
tooly.Logger.prototype.warn  = function() { _log(this, 4, _checkCaller(arguments), arguments); };
tooly.Logger.prototype.error = function() { _log(this, 5, _checkCaller(arguments), arguments); };


