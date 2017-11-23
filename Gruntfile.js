/*global grunt, module: false */

module.exports = function (grunt) {
	"use strict";

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),

		// minify css
		cssmin: {
			main: {
				files: [{
					expand: true,
					cwd: "static/",
					src: ["*.css", "!*.min.css"],
					dest: "public/",
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
					dest: "public/",
					ext: ".js"
				}]
			}
		},

		// jade compile
		jade: {
			compile: {
				files: {
					"public/index.html": ["static/index.jade"],
					"public/404.html": ["static/error.jade"]
				}
			}
		},

		// inline css/js
		assets_inline: {
			html: {
				options: {
					assetsDir: "public/",
					cssDir: "public/",
					jsDir: "public/",
					deleteOriginals: true,
					includeTag: "?inline",
				},
				files: [{
					expand: true,
					cwd: "public/",
					src: ["*.html"],
					dest: "public/"
				}]
			},
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
		"Deploys the project (generate HTML and inline assets)",
		["build", "jade:compile", "assets_inline:html"]
	);

	// Default task(s).
	grunt.registerTask("default", ["release"]);

};
