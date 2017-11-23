/** serve vcard */

"use strict";
var pkg = require("./package.json");
pkg.config = pkg.config || {};
pkg.config.port = pkg.config.port || "8080";

// Module dependencies (environment)
var express = require("express");
var http = require("http");
var path = require("path");

// Initialization
var app = express();
app.locals.basedir = path.join(__dirname, "/src");
app.set("port", pkg.config.port);
app.use(express.static(path.join(__dirname, "public"), {index: false}));
app.use(express.static(path.join(__dirname, "src"), {index: false}));
app.set("views", path.join(__dirname, "/src"));
app.set("view engine", "pug");
var routes = require(path.join(__dirname, "routes.js"));
app.get("/", routes.indexAction("index"));
app.get("/error", routes.indexAction(404));
app.use(routes.pageNotFoundAction);

// Http server
http.createServer(app).listen(pkg.config.port, function () {
	console.info("Express server listening on port %d", pkg.config.port);
});
