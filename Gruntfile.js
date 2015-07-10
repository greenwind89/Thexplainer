'use strict'

module.exports = function(grunt) {
  var newItem = 'sentence';
  var newItemUpper = 'Sentence';
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Task configuration will be written here
    copy: {
      gen: {
        src: '**/*.js',
        cwd: '/Users/macbookair/Workspace/WindGate/Thexplainer/server/example',
        dest: '/Users/macbookair/Workspace/WindGate/Thexplainer/temp/newObject',
        expand: true,
        options: {
          process: function (content, srcpath) {
            var temp = content.replace(/goal/g, newItem);
            return temp.replace(/Goal/g, newItemUpper);
          },
        },
        rename: function(dest, src) {
          var name = dest + '/' + src.replace(/goal/, newItem);
          return name.replace(/Goal/, newItemUpper);
        }
      },    
    },

    concat: {
      options: {
        separator: ';', // To support minify
      },
      dist: {
        src: ['client/module/**/main.js', // I want all main file to be loaded first since other components of a module depends on main file
              'client/module/*.js',
              'client/module/**/*.js'],
        dest: 'client/dist/app.js'
      }
    },

    concurrent: {
      dev: {
        tasks: ['nodemon', 'concat:dist', 'less:dev', 'watch' ],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    nodemon: {
      dev: {
        script: 'domdom/server.js',
        options: {
          nodeArgs: ['--debug'],
          env: {
            PORT: '3000'
          },

          delay: 1000,

          callback: function(nodemon) {
            nodemon.on('log', function (event) {
              console.log(event.colour);
            });

            /** Update .rebooted to fire Live-Reload **/
            nodemon.on('restart', function () {
                // Delay before server listens on port
                setTimeout(function() {
                    require('fs').writeFileSync('.rebooted', 'rebooted');
                }, 1000);
            });
                        
          }
        }
      }
    },

    watch: {
      js: {
        files: ['egg/app/**/*.js', '!egg/app/dist/*.js'],
        tasks: ['concat:dist'],
        options: { nospawn: true, livereload: true }
      },
      less: {
        files: ['egg/app/ui/less/*.less'],
        tasks: ['less:dev'],
        options: { nospawn: true, livereload: true }
      }
    },

    less: {
      dev: {
        options: {
          compress: false,
          yuicompress: false,
          strictMath: true,
          strictUnits: true,
          strictImports: true
        },
        files: { 
          "client/dist/app.css": 'client/ui/less/bootstrap.less'
        }
      }, 
    }

  });

  // Loading of tasks and registering tasks will be written here
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-less")
  grunt.loadNpmTasks("grunt-contrib-copy")
  
  grunt.registerTask('dev', ['concurrent:dev']);
  grunt.registerTask('build', ['concat:dist', 'less:dev']);
  grunt.registerTask('genobject', ['copy:gen']);

};


