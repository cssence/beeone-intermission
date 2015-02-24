/*global grunt, module: false */

module.exports = function (grunt) {
	"use strict";

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		config: grunt.file.readJSON("settings.json"),

		// clean staging directory
		clean: {
			build: ["<%= config.paths.stage %>"]
		},

		// minify css
		cssmin: {
			main: {
				files: {
					"<%= config.paths.stage %>/main.min.css": ["static/style.css"]
				}
			}
		},

		// uglify js
		uglify: {
			main: {
				files: {
					"<%= config.paths.stage %>/main.min.js": "static/mailto.js"
				}
			}
		},

		// jade compile
		jade: {
			compile: {
				files: {
					"<%= config.paths.dist %>/index.html": ["views/index.jade"],
					"<%= config.paths.dist %>/404.html": ["views/error.jade"]
				}
			}
		},

		// copy assets that are to-be-hosted
		copy: {
			assets: {
				files: [
					{expand: true, flatten: true, src: ["static/bg.jpg"], dest: "<%= config.paths.dist %>/"},
					{expand: true, flatten: true, src: ["static/avatar*.png"], dest: "<%= config.paths.dist %>/"},
					{expand: true, flatten: true, src: ["static/browserconfig.xml"], dest: "<%= config.paths.dist %>/"},
					{src: ["LICENSE"], dest: "<%= config.paths.dist %>/"}
				]
			}
		}

	});

	// Load the plugins
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-jade");
	grunt.loadNpmTasks("grunt-contrib-copy");

	grunt.registerTask(
		"build",
		"Prepares project deployment (minification, concatenation)",
		["clean:build", "uglify:main", "cssmin:main"]
	);
	grunt.registerTask(
		"release",
		"Deploys the project (copy assets and generate HTML)",
		["clean:build", "uglify:main", "cssmin:main", "jade:compile", "copy:assets"]
	);

	// Default task(s).
	grunt.registerTask("default", ["release"]);

};
