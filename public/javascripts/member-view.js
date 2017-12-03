/* global Backbone */
var app = app || {};

_.templateSettings = {
	interpolate: /\{\{=([^}]*)\}\}/g,
	evaluate: /\{\{(?!=)(.*?)\}\}/g
};

(function ($) {
	"use strict";
	app.memberView = Backbone.View.extend({
		tagName: "li", //we"re using a list tag

		template: _.template($("#item-template").html()),

		//DOM events specific to an item
		events: {
			"blur .edit": "close",
			"click .destroy": "clear",
			"click .confirm-member" : "saveNew",
			"keydown .edit": "revertOnEscape"
		},
		// the member view listens for changes to its model, re-rendering
		initialize: function () {
			this.listenTo(this.model, "change", this.render);
			this.listenTo(this.model, "destroy", this.remove); //we need to listen to the destroy event in order to remove the items from the view
		},
		// Re-render the titles of the member item.
		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			//this.$input = this.$(".edit");
			return this;
		},
		// If you"re pressing "escape" we revert your change by simply leaving
		// the `editing state.
		revertOnEscape: function (ev) {
			var $input = $(ev.target);
			if (ev.which === ESC_KEY) {
				// we reset the input back to the original value.
				$input.val(this.model.get($input.attr("name")));
				$input.blur();
			}
		},
		//we"ve finished editing the field
		close: function (ev) {
			var $input = $(ev.target);
			var value = $input.val().trim(); //we trim the value of the input
			var data = {};
      		data[$input.attr("name")] = value;
      		this.model.set(data);
      		if (!this.model.get("newItem")) {
      			this.model.save();
      		}
		},

		clear: function () {
			this.model.destroy();
		},

		saveNew: function () {
			this.model.save({newItem:false}, {url: '/api/add'}); 
		}
	});
})(jQuery);