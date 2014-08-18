'use strict';

var parser = require('nomnom');

var customDest = '';

module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    exec: {
      custom: {
        cmd: function() {
          var args = Array.prototype.slice.call(arguments, 0);
          return 'node bin/build '  + args.join(' ');
        }
      }
    },

    shell: {
      main: {
        command: './bin/build-main.sh'
      }
    },

    umd: {
      main: {
        src: 'dist/temp.js',
        dest: 'dist/tooly.js',
        objectToExport: 'tooly',
        amdModuleId: 'tooly',
        indent: '  '
      }
    },

    uglify: {
      main: {
        src: 'dist/tooly.js',
        dest: 'dist/tooly.min.js'
      }
    },

    usebanner: {
      options: {
        position: 'top',
        banner: require('./banner'),
        linebreak: true
      },
      main: {
        files: {
          src: ['dist/tooly.js']
        }
      },
      post: {
        files: {
          src: ['dist/tooly.min.js']
        }
      }
    },

    watch: {
      files: ['src/tooly.js'],
      tasks: ['main']
    }
  });

  
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-banner');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-umd');

  grunt.registerTask('build', ['shell:main']);
  grunt.registerTask('custom', ['shell:custom']);
  grunt.registerTask('main', ['umd:main', 'usebanner:main', 'uglify:main', 'usebanner:post']);
};