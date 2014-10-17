/*global require: false, module: false */
(function () {
	'use strict';

	var IndexController = {
		indexAction: function (isDev, errorCode) {
			return function (req, res) {
				res.render(errorCode === undefined ? 'index' : errorCode, { 'verbose': isDev });
			};
		},
		pageNotFoundAction: function (req, res) {
			res.redirect('/error');
		}
	};

	module.exports = IndexController;
}());
