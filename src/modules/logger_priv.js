
  var _slice = Array.prototype.slice;

  function _checkCaller(args) {
    var name = args.callee.caller.name;
    if (!name && tooly.logger.traceAnonymous) {
      return  '<anonymous> '+ args.callee.caller + '\n';
    }
    return name;
  }

  function _log(level, caller, args) {
    if (tooly.logger.level === 0 || level < tooly.logger.level) return;

    var logger = tooly.logger,
        args = args.length > 1 ? _slice.call(args, 0) : args[0],
        caller = (caller.replace(_ws, '') === '') ? '' : caller + ' \t',
        s = '%c%s%c%s%' + (args.length > 1 ? 'o' : 's'),
        callerCSS = 'color: #0080FF; font-style: italic',
        caller = '';

    switch(level) {
      case 0: return;
      case 1: console.trace(s, 'color: #800080;', '[TRACE] ', callerCSS, caller, args); break;
      case 2: console.log  (s, 'color: #008000;', '[DEBUG] ', callerCSS, caller, args); break;
      case 3: console.info (s, 'color: #0000FF;', '[INFO] ',  callerCSS, caller, args); break;      
      case 4: console.warn (s, 'color: #FFA500;', '[WARN] ',  callerCSS, caller, args); break;
      case 5: console.error(s, 'color: #FF0000;', '[ERROR] ', callerCSS, caller, args); break;
      default: return; // level = 0 = off
    }
  }
