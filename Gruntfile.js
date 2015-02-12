'use strict';

var fs = require('fs');

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  var sourcefile = fs.readFileSync('./bin/.log', { encoding: 'utf8' });

  grunt.initConfig({

    cust: fs.readFileSync('./bin/.custom-comment', { encoding: 'utf8' }),
    pkg: grunt.file.readJSON('package.json'),

    umd: {
      build: {
        src: sourcefile,
        objectToExport: 'tooly',
        amdModuleId: 'tooly',
        template: 'src/umd-template.hbs'
      }
    },

    uglify: {
      options: {
        sourceMap: true/*,
        preserveComments: 'some'*/
      },
      build: {
        src: '<%= umd.build.src %>',
        dest: sourcefile.substring(0, sourcefile.length-2) + 'min.js',
      }
    },

    usebanner: {
      options: {
        position: 'top',
        banner: (sourcefile === 'dist/tooly.js') 
          ? require('./src/banner') 
          : require('./src/banner-custom'),
        linebreak: true
      },
      build: {
        files: {
          src: ['<%= umd.build.src %>']
        }
      },
      post: {
        options: {
          banner: require('./src/banner-min')
        },
        files: {
          src: ['<%= uglify.build.dest %>']
        }
      }
    },

    watch: {
      files: ['src/modules/*.js'],
      tasks: ['build']
    }
  });

  grunt.registerTask('build', ['umd:build', 'usebanner:build', 'uglify:build', 'usebanner:post']);
};
