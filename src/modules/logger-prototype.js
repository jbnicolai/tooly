tooly.Logger.prototype = (function() {

  var _cjs = typeof exports === 'object',
      _slice = Array.prototype.slice,
      _push = Array.prototype.push,
      _chalk = _cjs ? require('chalk') : null
      _levels = ['dummy','trace','debug','info','warn','error'],
      _colors = ['gray', // dummy
        'gray',
        'green',
        _cjs ? 'cyan' : 'blue',
        _cjs ? 'yellow' : 'darkorange',
        'red',
        'gray' // last gray for time
      ]; 
      // _colors = {'800080','008000','0000FF','FFA500','FF0000'};
      
  function _log(instance, level, caller, args) {
    if (tooly.Logger.off || instance.level === -1 || level < instance.level || instance.level > 5) {
      return;
    }

    args = _slice.call(args);
    var format = '%s%s', // name, [LEVEL] [HH:mm:ss]
        pargs = []; // final args for console call

    if (_cjs) {
      if (tooly.type(args[0], 'string') && args[0].match(/\%(s|j|d|o)/g)) {
        // let %o work in node too
        format += args.shift().replace(/%o/gi, '%j');
      }
      pargs.unshift(format, _name(instance), _level(level));

    } else { // window
      // TODO: string output in Chrome is more readable within array,  
      // format %s the same way
      
      format = '%c%s%c%s%c%s';
      if (tooly.type(args[0], 'string') && args[0].match(/\%(c|s|o|O|d|i|f)/g)) {
        format += args.shift();
      }
      caller = (caller !== undefined && caller.replace(/\s+/, '') === '') ? '' : caller;
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
    var name = ''; 
    try { 
      name = args.callee.caller.name; 
    } catch(ignored) {
    }
    if (!name && this.traceAnonymous) {
      return  '<anonymous> ' + args.callee.caller + '\n';
    }
    return '<'+name+'> ';
  }

  // helper
  function _name(instance) {
    var name = instance.name || '';
    return (_chalk) ? _chalk.magenta(name) : name;
  }

  // helper
  function _level(level) {
    return _chalkify(level, ' ' + _levels[level].toUpperCase() + ' ') +
      // _chalkify(6, '[' + new Date().toLocaleTimeString() + '] ');
      _chalkify(6, '[' + _dateFormatted() + '] ');
  }

  // helper
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

  // use chalk if node.js
  function _chalkify(level, str) {
    return (!_chalk) ? str : _chalk[ _colors[level] ](str);
  }

  // public API
  return {
    log:   function() { _log(this, 0, _checkCaller(arguments), arguments); },
    trace: function() { _log(this, 1, _checkCaller(arguments), arguments); },
    debug: function() { _log(this, 2, _checkCaller(arguments), arguments); },
    info : function() { _log(this, 3, _checkCaller(arguments), arguments); },
    warn : function() { _log(this, 4, _checkCaller(arguments), arguments); },
    error: function() { _log(this, 5, _checkCaller(arguments), arguments); }
  };
})();