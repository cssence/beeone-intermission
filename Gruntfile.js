/*global grunt, module: false */

module.exports = function (grunt) {
	'use strict';

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// clean staging directory
		clean: {
			build: ['<%= pkg.paths.stage %>']
		},

		// minify css
		cssmin: {
			main: {
				files: {
					'<%= pkg.paths.stage %>/main.min.css': ['static/normalize.css', 'static/style.css']
				}
			}
		},

		// uglify js
		uglify: {
			main: {
				files: {
					'<%= pkg.paths.stage %>/main.min.js': 'static/mailto.js'
				}
			}
		},

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
		}

	});

	// Load the plugins
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask(
		'build',
		'Prepares project deployment (minification, concatenation)',
		['clean:build', 'uglify:main', 'cssmin:main']
	);
	grunt.registerTask(
		'release',
		'Deploys the project (copy assets and generate HTML)',
		['clean:build', 'uglify:main', 'cssmin:main', 'jade:compile', 'copy:assets']
	);

	// Default task(s).
	grunt.registerTask('default', ['release']);

};
