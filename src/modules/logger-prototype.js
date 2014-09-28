tooly.Logger.prototype = (function() {

  var _cjs = typeof exports === 'object',
      _slice = Array.prototype.slice,
      _chalk = _cjs ? require('chalk') : null
      _levels = ['dummy','trace','debug','info','warn','error'],
      _colors = ['dummy',
        'gray',
        'green',
        _cjs ? 'cyan' : 'blue',
        _cjs ? 'yellow' : 'darkorange',
        'red',
        'gray' // last gray for time
      ]; 
      // _colors = {'800080','008000','0000FF','FFA500','FF0000'};
      
  function _log(instance, level, caller, args) {
    if (instance.level === -1 || level < instance.level) return;

    var format = '%s%s', // name, [LEVEL] [HH:mm:ss]
        pargs = []; // final args for console call

    if (_cjs) {
      if (tooly.type(args) === 'array') {
        args = (args.length > 1) ? _slice.call(args, 0) : args[0];
        if (args[0].match(/\%(s|j|d)/g)) {
          format += args.shift();
        }
        Array.prototype.push.apply(pargs, args);
      } else {
        pargs.push(args);
      }
      pargs.unshift(format, _name(instance), _level(level));

    } else { // window
      args = (args.length > 1) ? _slice.call(args, 0) : args[0];
      format = '%c%s%c%s%c%s' + (tooly.type(args) !== 'string' ? '%o' : '%s');
      var caller = (caller.replace(/\s+/, '') === '') ? '' : caller + ' \t',
          color = 'color:' + _colors[level] + ';';
      pargs = [format, 'color:purple', _name(instance), color, _level(level), 'color:black', caller, args];
    }

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
    var name = args.callee.caller.name;
    if (!name && this.traceAnonymous) {
      return  '<anonymous> ' + args.callee.caller + '\n';
    }
    return name;
  }

  // helper
  function _name(instance) {
    var name = instance.name || '';
    return (_chalk) ? _chalk.magenta(name) : name;
  }

  // helper
  function _level(level) {
    var now = _chalkify(6, '[' + new Date().toLocaleTimeString() + ']');
    return _chalkify(level, ' ' + _levels[level].toUpperCase() + ' ') + now + ' ';
  }

  // use chalk if node.js
  function _chalkify(which, str) {
    if (!_chalk) return str;
    return _chalk[ _colors[which] ](str);
    return str;
  }

  // send either string|number or array to _log
  function _parseArgs(args) {
    if (args.length === 1) return args[0];
    return Array['slice'] ? Array.slice : _slice.call(args, 0);
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