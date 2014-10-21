var Benchmark = require('benchmark'),
    tooly = require('../../dist/tooly');
var logger = new tooly.Logger(0, 'REGEXP_BENCH');
function format(fmt) {
  var args = Array.prototype.slice.call(arguments, 1);
  return fmt.replace(/\%[cojdifs]+/gi, function(m) {
    var x = args.shift();
    if (x !== undefined) {
      switch(m) {
        case '%o': // fallthrough
        case '%j': x = JSON.stringify(x); break;
        case '%d': // fallthrough
        case '%i': x = x | 0; break;
        case '%f': x = parseFloat(x); break;
        case '%s': // fallthrough
        default: break;
      }      
      return x;
    }
    return m;
  });
}
var re = /\%[cojdifs]+/gi;
function formatCached(fmt) {
  var args = Array.prototype.slice.call(arguments, 1);
  return fmt.replace(re, function(m) {
    var x = args.shift();
    if (x !== undefined) {
      switch(m) {
        case '%o': // fallthrough
        case '%j': x = JSON.stringify(x); break;
        case '%d': // fallthrough
        case '%i': x = x | 0; break;
        case '%f': x = parseFloat(x); break;
        case '%s': // fallthrough
        default: break;
      }      
      return x;
    }
    return m;
  });
}
var re_2;
function formatLazyCached(fmt) {
  var args = Array.prototype.slice.call(arguments, 1);
  if (!re_2) re_2 = /\%[cojdifs]+/gi;
  return fmt.replace(re_2, function(m) {
    var x = args.shift();
    if (x !== undefined) {
      switch(m) {
        case '%o': // fallthrough
        case '%j': x = JSON.stringify(x); break;
        case '%d': // fallthrough
        case '%i': x = x | 0; break;
        case '%f': x = parseFloat(x); break;
        case '%s': // fallthrough
        default: break;
      }      
      return x;
    }
    return m;
  });
}

var suite = new Benchmark.Suite;

suite.add('format', function() {
  format('c: %c, o: %o, j: %j, d: %d, i: %i, f: %f, s: %s,', 
    '_color_', {hello:'world'}, {hello:'joshy'}, 19, 80, 19.86, 'peachyyy');
})
.add('formatCached', function() {
  formatCached('c: %c, o: %o, j: %j, d: %d, i: %i, f: %f, s: %s,', 
    '_color_', {hello:'world'}, {hello:'joshy'}, 19, 80, 19.86, 'peachyyy');
})
.add('formatLazyCached', function() {
  formatLazyCached('c: %c, o: %o, j: %j, d: %d, i: %i, f: %f, s: %s,', 
    '_color_', {hello:'world'}, {hello:'joshy'}, 19, 80, 19.86, 'peachyyy');
})
.on('cycle', function(e, bench) { 
  logger.info('\n' + String(e.target)); 
})
.on('complete', function() {
  logger.debug(this.filter('fastest').pluck('name'));
})
.run(true);
