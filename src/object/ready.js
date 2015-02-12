


/**
 * Execute `fn` when dom is ready
 *
 * @param {Function} fn the function to call when dom is loaded
 *
 * @memberOf tooly
 * @category Object
 * @static
 */
tooly.ready = function(fn) {
  var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === 'complete') {
      clearInterval(readyStateCheckInterval);
      if (typeof fn === 'function') fn();
    }
  }, 10); 
};