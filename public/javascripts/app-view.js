/* global Backbone */
var app = app || {};

(function ($) {
	"use strict";

	app.AppView = Backbone.View.extend({
		el: ".member-app",

		events: {
			"click .new-member": "addNew"
		},

		initialize: function () {
			this.$input = this.$(".new-member");
			this.$list = $(".member-list");

			this.listenTo(app.members, "add", this.addOne);
			this.listenTo(app.members, "reset", this.addAll);
			this.listenTo(app.members, "all", _.debounce(this.render, 0)); //this throttles calls so if one is called more than once in a short period of time, only one instance will be called


			app.members.fetch({ type: "POST", reset: true}); //reset true prevents the app view from view re-rendered for every model
		},
		// Add a single member item to the list by creating a view for it, and
		// appending its element to the <ul> .
		addOne: function (member) {
			var view = new app.MemberView({model: member});
			this.$list.append(view.render().el);
		},
		//add all members in the members collection at once
		addAll: function () {
			this.$list.html("");
			app.members.each(this.addOne, this);
		},
		addNew: function () {
			var member = new app.Member();
			this.addOne(member);
		}

	});
})(jQuery);