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
    if (instance.level === -1 || level < instance.level || instance.level) return;

    args = _slice.call(args);
    var format = '%s%s', // name, [LEVEL] [HH:mm:ss]
        pargs = []; // final args for console call

    if (_cjs) {
      if (args[0].match(/\%(s|j|d)/g)) {
        format += args.shift();
      }
      pargs.unshift(format, _name(instance), _level(level));

    } else { // window
      // TODO: string output in Chrome is more readable within array,  
      // format %s the same way
      
      format = '%c%s%c%s%c%s';
      if (args[0].match(/\%(c|s|o|O|d|i|f)/g)) {
        format += args.shift();
        // format.replace(/\%(c|s|o|O|d|i|f)/g, function(m) {
        //   for (var i = 0; i < m.length; i++) {
        //     if (i > 5) {
        //       if (m === '%s') {
        //         return '\"' + args[i] + '\"';
        //       } else if (m === '%o') {
        //         return JSON.stringify(args[i]);
        //       }
        //     }
        //   }
        // }); 
      }
      caller = (caller.replace(/\s+/, '') === '') ? '' : caller + ' \t';
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
    return _chalkify(level, ' ' + _levels[level].toUpperCase() + ' ') +
      _chalkify(6, '[' + new Date().toLocaleTimeString() + '] ');
  }

  // use chalk if node.js
  function _chalkify(level, str) {
    return (!_chalk) ? str : _chalk[ _colors[level] ](str);
  }

  // send either string|number or array to _log
  function _parseArgs(args) {
    console.log('_parseArgs >>');
    console.log(args[0]);
    console.log(_slice(args, 0));
    return (args.length === 1) ? args[0] : _slice(args, 0);
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