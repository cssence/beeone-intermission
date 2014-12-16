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
					'<%= pkg.paths.dist %>/index.html': ['views/index.jade'],
					'<%= pkg.paths.dist %>/404.html': ['views/404.jade']
				}
			}
		},

		// copy assets that are to-be-hosted
		copy: {
			assets: {
				files: [
					{expand: true, flatten: true, src: ['static/favicon.ico'], dest: '<%= pkg.paths.dist %>/'},
					{expand: true, flatten: true, src: ['static/bg.jpg'], dest: '<%= pkg.paths.dist %>/'},
					{expand: true, flatten: true, src: ['static/avatar*.png'], dest: '<%= pkg.paths.dist %>/'},
					{expand: true, flatten: true, src: ['static/crossdomain.xml'], dest: '<%= pkg.paths.dist %>/'},
					{expand: true, flatten: true, src: ['static/browserconfig.xml'], dest: '<%= pkg.paths.dist %>/'},
					{expand: true, flatten: true, src: ['static/robots.txt'], dest: '<%= pkg.paths.dist %>/'},
					{src: ['LICENSE'], dest: '<%= pkg.paths.dist %>/'}
				]
			}
		},

		// clean staging directory
		clean: {
			build: ['<%= pkg.paths.stage %>'],
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
					'<%= pkg.paths.stage %>/main.min.js': ['<%= pkg.paths.stage %>/mailto.min.js']
				}
			},
			css: {
				files: {
					'<%= pkg.paths.stage %>/main.min.css': ['<%= pkg.paths.stage %>/normalize.min.css', '<%= pkg.paths.stage %>/style.min.css']
				}
			}
		},

		// uglify js
		uglify: {
			js: {
				files: {
					'<%= pkg.paths.stage %>/mailto.min.js': 'static/mailto.js'
				}
			}
		},

		// minify css
		cssmin: {
			minify: {
				expand: true,
				cwd: 'static/',
				src: ['normalize.css', 'style.css'],
				dest: '<%= pkg.paths.stage %>/',
				ext: '.min.css'
			}
		}

	});

	// Load the plugins
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	grunt.registerTask(
		'build',
		'Prepares project deployment (minification, concatenation)',
		['clean:build', 'uglify:js', 'concat:js', 'cssmin:minify', 'concat:css']
	);
	grunt.registerTask(
		'release',
		'Deploys the project (copy assets and generate HTML)',
		['clean:build', 'uglify:js', 'concat:js', 'cssmin:minify', 'concat:css', 'jade:compile', 'copy:assets']
	);

	// Default task(s).
	grunt.registerTask('default', ['release']);

};
