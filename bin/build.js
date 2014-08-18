var parser = require('nomnom'),
    fs = require('fs'),
    colors = require('colors'),
    moddir = './src/modules/',
    fileNames = fs.readdirSync(moddir),
    modules = {},   // { <file name sans `.js`> : <file contents> }
    includes = {},  // flags which modules to include / exclude
    output = '',    // final output string
    choices = ['core', 'dom', 'object'],
    _ = require('underscore'),
    path = require('path'),
    dest = './dist/tooly-custom.js';

parser.option('output', {
  abbr: 'o',
  metavar: 'FILE',
  default: dest,
  help: 'specify output file',
  callback: function(arg) {
    // TODO: validate
    dest = arg;
  }
});    

parser.command('include')
  .option('modules', {
    abbr: 'm',
    list: true,
    choices: choices,
    help: 'module(s) to include',
  })
  .callback(function(args) {
    validate(args._.slice(1));
    getIncludes(args._);
  })
  .help('include only the following list of modules in the build.');

parser.command('exclude')
  .option('modules', {
    abbr: 'm',
    list: true,
    choices: choices,
    help: 'module(s) to exclude.'
  })
  .callback(function(args) {
    args = args._.slice(1);
    validate(args);
    args.push('include');
    getIncludes(args);
  })
  .help('build with all modules EXCEPT those in the following list.');

parser.parse();

function validate(args) {

  args.filter(function(el, i) {
    if (choices.indexOf(el) === -1) {

      console.error('\n%s%s\n%s%s',
        'Invalid argument: '.red,
        (el + '').cyan,
        'supported modules: ', 
        (choices.join(' ') + '').cyan
      );

      process.exit(1);
    }
  });
}


// map file contents to name keys
for (var i = 0; i < fileNames.length; i++) {
  var key = fileNames[i].replace('.js', '');
  var val = fs.readFileSync(moddir + fileNames[i], 'utf8');
  modules[key] = val;
}

function getIncludes(args) {
  for (var i = 0; i < args.length; i++) {
    includes[args[i]] = true;
  }
}

function includeWhat(key) {
  if (includes[key] && includes.include || !includes[key] && !includes.include) {
    return true;
  }
  return false;
}

var returnHeader = '\n  return {\n\n';

// start the declaration
output += modules['__header'];

// private modules
output += (includeWhat('dom'))  ? modules['dom_priv'] : '';

// public modules
output += returnHeader;
output += (includeWhat('dom')) ? modules['dom']  : '';
output += (includeWhat('object')) ? modules['object']  : '';
output += (includeWhat('core')) ? modules['core'] : '';

// close return statement and IIFE wrap
output += modules['_footer'];

fs.writeFile(dest, output, function() {

  console.log('\n%s\n%s %s',
    'Custom build completed successfully.'.green,
    'File saved to:',
    (path.resolve(__dirname, '..', dest)).cyan
  );

});
