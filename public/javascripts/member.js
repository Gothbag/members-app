/* global Backbone */
var app = app || {};

(function () {
	"use strict";
	//member model
	app.member = Backbone.Model.extend({
		defaults: {
			name: "Member",
			age: 0,
			newItem: true
		},
		idAttribute: "_id",
		urlRoot: "/api/members"
	});
	
})();