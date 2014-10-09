'use strict';

module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    umd: {
      main: {
        src: 'dist/tooly-raw.js',
        dest: 'dist/tooly.js',
        objectToExport: 'tooly',
        amdModuleId: 'tooly'/*,
        indent: '  '*/
      },
      custom: {
        src: 'dist/tooly-custom.js',
        objectToExport: 'tooly',
        amdModuleId: 'tooly'
      }
    },

    uglify: {
      main: {
        src: 'dist/tooly.js',
        dest: 'dist/tooly.min.js'
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
      main: {
        files: {
          src: ['dist/tooly.js']
        }
      },
      post: {
        files: {
          src: ['dist/tooly.min.js', 'dist/tooly-raw.js']
        }
      },
      custom: {
        files: {
          src: ['<%= umd.custom.src %>']
        }
      },
      customPost: {
        files: {
          src: ['<%= uglify.custom.dest %>']
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
    'uglify:custom',
    'usebanner:customPost'
  ]);
  grunt.registerTask('main', [
    'umd:main',
    'usebanner:main',
    'uglify:main',
    'usebanner:post'
  ]);
};