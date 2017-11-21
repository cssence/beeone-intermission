/*global grunt, module: false */

module.exports = function (grunt) {
	"use strict";

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		config: grunt.file.readJSON("settings.json"),

		// minify css
		cssmin: {
			main: {
				files: [{
					expand: true,
					cwd: "static/",
					src: ["*.css", "!*.min.css"],
					dest: "<%= config.paths.dist %>/",
					ext: ".css"
				}]
			}
		},

		// uglify js
		uglify: {
			main: {
				files: [{
					expand: true,
					cwd: "static/",
					src: ["*.js", "!*.min.js"],
					dest: "<%= config.paths.dist %>/",
					ext: ".js"
				}]
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

		// inline css/js
		assets_inline: {
			html: {
				options: {
					assetsDir: "<%= config.paths.dist %>/",
					cssDir: "<%= config.paths.dist %>/",
					jsDir: "<%= config.paths.dist %>/",
					deleteOriginals: true,
					includeTag: "?inline",
				},
				files: [{
					expand: true,
					cwd: "<%= config.paths.dist %>/",
					src: ["*.html"],
					dest: "<%= config.paths.dist %>/"
				}]
			},
		},

		// copy assets that are to-be-hosted
		copy: {
			assets: {
				files: [
					{expand: true, flatten: true, src: ["static/avatar*.png"], dest: "<%= config.paths.dist %>/"},
					{expand: true, flatten: true, src: ["static/logo.png"], dest: "<%= config.paths.dist %>/"},
					{expand: true, flatten: true, src: ["static/map.png"], dest: "<%= config.paths.dist %>/"},
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
	grunt.loadNpmTasks("grunt-assets-inline");

	grunt.registerTask(
		"build",
		"Prepares project deployment (minification, concatenation)",
		["uglify:main", "cssmin:main"]
	);
	grunt.registerTask(
		"release",
		"Deploys the project (copy assets and generate HTML)",
		["build", "jade:compile", "copy:assets", "assets_inline:html"]
	);

	// Default task(s).
	grunt.registerTask("default", ["release"]);

};
