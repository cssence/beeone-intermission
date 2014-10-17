/**
 * Starting point for vCard app
 * http-server
 */
'use strict';

// Module dependencies (environment)
var nconf = require('nconf'),
	express = require('express'),
	http = require('http'),
	path = require('path'),
	errorhandler = require('errorhandler'),
	compression = require('compression'),
	serveStatic = require('serve-static'),
	serveFavicon = require('serve-favicon');

// Read configuration (environment)
nconf.argv().env().file({ file: 'settings.json' }).defaults({
	'env': 'development',
	'port': 8080
});
if (!/[0-9]+/.test(nconf.get('port'))) {
	console.error('Illegal value port! Check your configuration and your settings.json file.');
	process.exit(1);
}

// Initialization
var isDev = 'development' === nconf.get('env').toLowerCase();
var app = express();
app.locals.basedir = path.join(__dirname, '/views');
app.use(serveFavicon(__dirname + '/public/favicon.ico'));
if (isDev) {
	app.use(serveStatic(path.join(__dirname, '/public')));
	app.use(errorhandler({ dumpExceptions: true, showStack: true }));
} else {
	app.use(compression());
	app.use(serveStatic(path.join(__dirname, '/public'), { maxAge: 86400 }));
	app.use(errorhandler());
}
app.set('port', nconf.get('port'));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'jade');

// Routes
var IndexController = require('./routes/index');
app.get('/', IndexController.indexAction(isDev));
app.get('/error', IndexController.indexAction(isDev, '404'));
app.use(IndexController.pageNotFoundAction);

// Http server
http.createServer(app).listen(nconf.get('port'), function () {
	console.info('Express %s server listening on port %d', nconf.get('env'), nconf.get('port'));
});
