'use strict';

var child_process = require('child_process');

module.exports = function(grunt) {

  var child;

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    umd: {
      main: {
        src: 'dist/tooly.js',
        dest: 'dist/tooly.js',
        objectToExport: 'tooly',
        amdModuleId: 'tooly'
      },
      slim: {
        src: 'dist/tooly-slim.js',
        dest: 'dist/tooly-slim.js',
        objectToExport: 'tooly',
        amdModuleId: 'tooly'
      },
      custom: {
        src: 'dist/tooly-custom.js',
        objectToExport: 'tooly',
        amdModuleId: 'tooly'
      }
    },

    uglify: {
      options: {
        sourceMap: true,
        preserveComments: 'some'
      },
      main: {
        src: 'dist/tooly.js',
        dest: 'dist/tooly.min.js'
      },
      slim: {
        src: 'dist/tooly-slim.js',
        dest: 'dist/tooly-slim.min.js'
      },
      custom: {
        src: '<%= umd.custom.src %>',
        dest: 'dist/tooly-custom.min.js',
      }
    },

    usebanner: {
      options: {
        position: 'top',
        banner: require('./src/banner'),
        linebreak: true
      },
      slim: {
        files: { src: ['dist/tooly-slim.js']
        }
      },
      slim_post: {
        files: { src: ['dist/tooly-slim.min.js']
        }
      },
      main: {
        files: { src: ['dist/tooly.js']
        }
      },
      post: {
        files: { src: ['dist/tooly.min.js']
        }
      },
      custom: {
        files: { src: ['<%= umd.custom.src %>']
        }
      },
      customPost: {
        files: { src: ['<%= uglify.custom.dest %>']
        }
      }
    },

    watch: {
      files: ['src/modules/*.js'],
      tasks: ['bin']
    }
  });

  
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-banner');
  grunt.loadNpmTasks('grunt-umd');

  grunt.registerTask('custom', [
    'umd:custom',
    'usebanner:custom',
    'uglify:custom'
  ]);
  grunt.registerTask('main', [
    'umd:main',
    'usebanner:main',
    'uglify:main'
  ]);
  grunt.registerTask('slim', [
    'umd:slim',
    'usebanner:slim',
    'uglify:slim'
  ]);
};