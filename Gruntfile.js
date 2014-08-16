'use strict';


module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    mochaTest: {
      test: {
        options: {
          reporter: 'list',
          colors: true
        },
        src: ['test/*.js']
      }
    },

    umd: {
      build: {
        src: 'src/tooly.js',
        dest: 'dist/tooly.js',
        objectToExport: 'tooly',
        amdModuleId: 'tooly',
        indent: '  '
      }
    },

    uglify: {
      build: {
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
      build: {
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
      tasks: ['build']
    }
  });

  
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-banner');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-umd');

  grunt.registerTask('build', ['umd:build', 'usebanner:build', 'uglify:build', 'usebanner:post']);
  grunt.registerTask('test', ['mochaTest:test']);
};