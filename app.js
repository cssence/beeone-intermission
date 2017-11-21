/*jslint nomen: true */
/*global require: false, console: false, __dirname: false, process: false */

/** http-server for vCard app */
(function (console, require, process, dirname) {
	"use strict";

	var	nconf, express, http, path, serveStatic, app, mainController;

	// Module dependencies (environment)
	nconf = require("nconf");
	express = require("express");
	http = require("http");
	path = require("path");
	serveStatic = require("serve-static");

	// Read configuration (environment)
	nconf.argv().env().file({file: path.join(dirname, "/settings.json")}).defaults({
		"env": "development",
		"port": 8080
	});
	if (!/[0-9]+/.test(nconf.get("port"))) {
		console.error("Illegal value port! Check your configuration and your settings.json file.");
		process.exit(1);
	}

	// Initialization
	app = express();
	app.locals.basedir = path.join(dirname, "/views");
	app.use(serveStatic(path.join(dirname, "/static")));
	app.set("port", nconf.get("port"));
	app.set("views", path.join(dirname, "/views"));
	app.set("view engine", "jade");

	// Routes
	mainController = require("./routes/index");
	app.get("/", mainController.indexAction("index"));
	app.get("/error", mainController.indexAction(404));
	app.use(mainController.pageNotFoundAction);

	// Http server
	http.createServer(app).listen(nconf.get("port"), function () {
		console.info("Express %s server listening on port %d", nconf.get("env"), nconf.get("port"));
	});
}(console, require, process, __dirname));
