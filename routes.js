/*global require, module */
(function () {
	"use strict";
	module.exports = {
		indexAction: function (template, options) {
			return function (req, res) {
				res.render(typeof template === "string" ? template : "error", options);
			};
		},
		pageNotFoundAction: function (req, res) {
			res.redirect("/error");
		}
	};
}());
