var _cjs = typeof exports === 'object',
    _push = _arrayProto.push,
    _chalk = _cjs ? require('chalk') : null,
    _levels = ['dummy', 'trace', 'debug', 'info', 'warn', 'error'],
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
    
function _log(instance, level, args) {
  var ilevel = instance.options.level;
  if (tooly.Logger.off || ilevel === -1 || level < ilevel || ilevel > 5) {
    return;
  }

  var format = '%s%s', // <name> <[LEVEL] [HH:mm:ss]>
      pargs = []; // final parsed args for console call

  args = _slice.call(args);
  _format_re = _format_re || /\%[ojdifsc]/g;

  if (_cjs) {
    // TODO: replace match with RegExp#test
    if (tooly.type(args[0], 'string') && args[0].match(_format_re)) {
      format += args.shift().replace(_o_re, '%j');
    }
    pargs.unshift(format, _name(instance), _level(level, instance)/*,
      instance.bypassLine ? '' : _chalk.gray(_getLine(instance)) */);

  } else { // window
    format = '%c%s%c%s%c%s%c';
    if (tooly.type(args[0], 'string') && args[0].match(_format_re)) {
      format += args.shift().replace(_j_re, '%o');
    }
    var color = 'color:' + _colors[level] + ';',
        purple = 'color:purple;';
    pargs = [
      format, 
      purple, _name(instance), 
      color, _level(level, instance), 
      instance.options.lineFormat, _getLine(instance),
      instance.options.textFormat
    ];
  }

  _push.apply(pargs, args);

  switch (level) {
    case -1: 
      return;

    case 0: 
      console.log(arguments[2]); 
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

function _getLine(instance) {
  var error = new Error(),
      stack = error.stack.split('\n'),
      line = stack[stack.length-1];
  line = line.substring(line.lastIndexOf('/')+1, line.length-1);
  return instance.options.bypassLine ? '' : '[' + line + '] ';
}

function _name(instance) {
  var name = instance.name || '';
  return (_chalk) ? _chalk.magenta(name) : name;
}

function _level(level, instance) {
  return _chalkify(level, ' ' + _levels[level].toUpperCase() + ' ') +
    (instance.options.bypassTimestamp ? '' : _chalkify(6, '[' + _dateFormatted() + '] '));
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
  return (!_chalk) ? str : _chalk[ _colors[level] ]( str );
}

tooly.Logger.prototype.group = function() { 
  if (!arguments.length) {
    console.group();
  } else if (arguments.length === 1) {
    console.group(arguments[0]);
  } else {
    console.group.apply(console, _slice.call(arguments, 0));
  }
  return this;
}
tooly.Logger.prototype.groupEnd = function() { 
  console.groupEnd(); 
  return this;
}
tooly.Logger.prototype.log   = function() { _log(this, 0, arguments); return this; };
tooly.Logger.prototype.trace = function() { _log(this, 1, arguments); return this; };
tooly.Logger.prototype.debug = function() { _log(this, 2, arguments); return this; };
tooly.Logger.prototype.info  = function() { _log(this, 3, arguments); return this; };
tooly.Logger.prototype.warn  = function() { _log(this, 4, arguments); return this; };
tooly.Logger.prototype.error = function() { _log(this, 5, arguments); return this; };
