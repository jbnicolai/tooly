
  var _slice = Array.prototype.slice;

  function _checkCaller(args) {
    var name = args.callee.caller.name;
    if (!name) {
      var ret = '<anonymous>';
      if (tooly.logger.traceAnonymous) {
        return  ret + ' ' + args.callee.caller + '\n';
      }
      return ret;
    }
    return name;
  }

  function _log(level, caller, args) {
    if (level < tooly.logger.level) return;

    var logger = tooly.logger,
        args = _slice.call(args, 0),
        caller = caller + ' \t',
        s = '%c%s%c%s%o',
        callerCSS = 'color: #0080FF; font-style: italic';

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
