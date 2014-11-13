/*global grunt, module: false */

module.exports = function (grunt) {
	'use strict';

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// jade compile
		jade: {
			compile: {
				options: {
					data: {
						debug: false
					}
				},
				files: {
					'public/index.html': ['views/index.jade'],
					'public/404.html': ['views/404.jade']
				}
			}
		},
		
		// uglify js
		uglify: {
			js: {
				files: {
					'public/mailto.min.js': 'public/mailto.js'
				}
			}
		},

		// concat files
		concat: {
			options: {
				process: function (src, filepath) {
					if (filepath.indexOf('.js') !== -1) {
						src = src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, ''); // use strict statements
						src = src + ';';
					}
					src = src.replace(/\/\*[^\*]*\*\//g, ''); // block comments
					return src;
				}
			},
			js: {
				files: {
					'public/main.min.js': ['public/mailto.min.js']
				}
			},
			css: {
				files: {
					'public/main.min.css': ['public/normalize.min.css', 'public/style.min.css']
				}
			}
		},

		cssmin: {
			minify: {
				expand: true,
				cwd: 'public/',
				src: ['normalize.css', 'style.css'],
				dest: 'public/',
				ext: '.min.css'
			}
		}
	});

	// Load the plugins
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	grunt.registerTask(
		'build',
		'Builds the project',
		['uglify:js', 'concat:js', 'cssmin:minify', 'concat:css', 'jade:compile']
	);
	grunt.registerTask(
		'minify',
		'Creates minified files (no HTML)',
		['uglify:js', 'concat:js', 'cssmin:minify', 'concat:css']
	);


	// Default task(s).
	grunt.registerTask('default', ['build']);

};
