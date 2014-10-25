#!/usr/bin/env node

var parser = require('nomnom'),
    chalk = require('chalk'),
    pkg = require('../package'),
    fs = require('fs'),
    _ = require('lodash');

var includes = ['collections', 'frankie', 'handler', 'logger', 'object', 'string', 'timer', 'xhr'],
    output = './dist/tooly-custom.js', 
    files = {},
    header = code = '',
    nocomment = false;

module.exports = function(opts) {
  build(opts);
};

if (process.argv.slice(2).length) {
  build();
}

function build(opts) {
  if (opts) { // script
    includes = opts.includes || includes;
  } else { // CLI
    parse();
  }
  compile();
  write();
}

function parse() {
  parser.command('include')
    .option('modules', {
      abbr: 'm',
      list: true,
      choices: includes,
      help: 'module(s) to include',
    })
    .callback(function(args) { getIncludes(args._.slice(1)); })
    .help('include only a proceeding list of modules in the build.');
  parser.option('output', {
    abbr: 'o',
    metavar: 'FILE',
    default: output,
    help: 'specify output file',
    callback: function(arg) { output = arg; }
  });
  parser.option('nocomment', {
    abbr: 'n',
    flag: true,
    help: 'omit `custom build...` comment from output',
    callback: function(arg) { nocomment = arg; }
  });
  parser.parse();
}

function getIncludes(args) {
  if (!args.length) {
    // 0 args === default full build
    return;
  }
  args.forEach(function(el, i) {
    if (includes.indexOf(el) === -1) {
      console.error(chalk.red('Invalid argument. Supported categories include:\n') + 
        chalk.green(includes.join('\n')));
      process.exit(1);
    }
  });
  includes = args;
}

function compile() {

  // { folder: [ filename1.js, filename2.js, ... ] }
  files = _.object(includes, includes.map(function(inc, i) {
    // reversed so ctor files with leading '_' show up first
    return fs.readdirSync('./src/' + inc).reverse();
  }));

  code = fs.readFileSync('./src/_header.js', 'utf8');

  _.each(files, function(filenames, dir, arr) {
    code += filenames.map(function(file) {
      return fs.readFileSync('./src/' + dir + '/' + file, 'utf8'); 
    }).join('');
  });
}

function generateCustomComment() {
  if (!nocomment) {
    var custom = ' * CUSTOM BUILD\n * Includes modules: ' + 
      includes.join(', ').toUpperCase();

    fs.writeFile('./bin/.custom-comment', custom, function(err) { 
      if (err) throw err; 
    });
  }
}

function write() {
  generateCustomComment();
  // write the last saved file for setting 'grunt custom -> src'
  fs.writeFile('./bin/.log', output, function(err) {
    // if (err) throw err;
  });
  fs.writeFile(output, code, function(err) {
    if (err) throw err;
    console.log(chalk.magenta('Build complete. \nFile located at ') + chalk.green(output));
  });
}
