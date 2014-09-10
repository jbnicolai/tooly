//    +---------------+
//    | LOGGER MODULE |
//    +---------------+
    /**
     * configuration options for logging methods.
     * levels: 0:off, 1:trace, 2:debug, 3:info, 4:warn, 5:error
     * @type {Object}
     */
    logger: {
      level: 1,
      traceAnonymous: true
    },

    trace: function() { _log(1, _checkCaller(arguments), arguments); },
    debug: function() { _log(2, _checkCaller(arguments), arguments); },
    info : function() { _log(3, _checkCaller(arguments), arguments); },
    warn : function() { _log(4, _checkCaller(arguments), arguments); },
    error: function() { _log(5, _checkCaller(arguments), arguments); },
