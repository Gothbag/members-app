/* global Backbone */
var app = app || {};

(function () {

	var Members = Backbone.Collection.extend({
		model: app.Member,
		url: "/api/members"
	});

	app.members = new Members();
})();