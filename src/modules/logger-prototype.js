tooly.Logger.prototype = (function() {

  var _cjs = typeof exports === 'object',
      _slice = Array.prototype.slice;
  
  function _log(instance, level, caller, args) {
    // test:
    // console.log(arguments);
    // console.log('_cjs? ' + _cjs);
    
    if (instance.level === -1 || level < instance.level) return;

    var format = '%s%s'; // name, level

    if (_cjs) {
      if (tooly.type(args) === 'array') {
        args = (args.length > 1) ? _slice.call(args, 0) : args[0];
        // check if first arg is format string
        if (args[0].match(/\%(s|j|d)/g)) {
          format += args[0];
          args = args.shift();
        }
      }
      switch (level) {
        case 0: console.log(arguments[3]); break;
        case 1: console.trace(format, _name(instance), _level(level), args); break;
        case 2: console.log  (format, _name(instance), _level(level), args); break;
        case 3: console.info (format, _name(instance), _level(level), args); break;
        case 4: console.warn (format, _name(instance), _level(level), args); break;
        case 5: console.error(format, _name(instance), _level(level), args); break;
        case -1:
        default: return; // level = -1 = off
      }
    } else { // window
      args = (args.length > 1) ? _slice.call(args, 0) : args[0];
      var caller = (caller.replace(_ws, '') === '') ? '' : caller + ' \t',
          format = '%c%s%s%c%s' + (tooly.type(args) !== 'string' ? '%o' : '%s'),
          callerCSS = 'color: #0080FF; font-style: italic',
          caller = '';
      switch (level) {
        case 0: console.log(arguments[3]); break;
        case 1: console.trace(format, 'color: #800080;', _name(instance), _level(level), callerCSS, caller, args); break;
        case 2: console.log  (format, 'color: #008000;', _name(instance), _level(level), callerCSS, caller, args); break;
        case 3: console.info (format, 'color: #0000FF;', _name(instance), _level(level), callerCSS, caller, args); break;      
        case 4: console.warn (format, 'color: #FFA500;', _name(instance), _level(level), callerCSS, caller, args); break;
        case 5: console.error(format, 'color: #FF0000;', _name(instance), _level(level), callerCSS, caller, args); break;
        case -1:
        default: return; // level = 0 = off
      }          
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
    return instance.name || '';
  }

  // helper
  function _level(level) {
    var now = new Date().toLocaleTimeString();
    switch (level) {
      case 1: return ' [TRACE] ' + '[' + now + ']';
      case 2: return ' [DEBUG] ' + '[' + now + ']';
      case 3: return ' [INFO] '  + '[' + now + ']';
      case 4: return ' [WARN] '  + '[' + now + ']';
      case 5: return ' [ERROR] ' + '[' + now + ']';
    }
  }

  // public API
  return (function() {
    if (_cjs) {
      return {
        log:   function() { _log(this, 0, '', arguments); },
        trace: function() { _log(this, 1, '', arguments); },
        debug: function() { _log(this, 2, '', arguments); },
        info:  function() { _log(this, 3, '', arguments); },
        warn:  function() { _log(this, 4, '', arguments); },
        error: function() { _log(this, 5, '', arguments); }
      };
    }
    // window
    return {
      log:   function() { _log(this, 0, _checkCaller(arguments), arguments); },
      trace: function() { _log(this, 1, _checkCaller(arguments), arguments); },
      debug: function() { _log(this, 2, _checkCaller(arguments), arguments); },
      info : function() { _log(this, 3, _checkCaller(arguments), arguments); },
      warn : function() { _log(this, 4, _checkCaller(arguments), arguments); },
      error: function() { _log(this, 5, _checkCaller(arguments), arguments); }
    };
  })();
})();