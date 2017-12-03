/* global Backbone */
var app = app || {};

(function () {

	var members = Backbone.Collection.extend({
		model: app.member,
		url: "/api/members"
	});

	app.members = new members();
})();