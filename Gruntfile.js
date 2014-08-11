'use strict';

module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    shell: {
      dev: {
        command: 'component build --dev'
      },
      build: {
        command: 'component build'
      }
    },

    copy: {
      build: {
        src: 'build/build.js',
        dest: 'dist/utils.js'
      }
    },

    uglify: {
      build: {
        src: 'dist/utils.js',
        dest: 'dist/utils.min.js'
      }
    },

    watch: {
      dev: {
        files: ['index.js'],
        tasks: ['shell:dev']
      },
      build: {
        files: ['index.js'],
        tasks: ['shell:build']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['shell:dev']);
  grunt.registerTask('build', ['shell:build', 'copy:build', 'uglify:build']);
};