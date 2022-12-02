FooterView = Backbone.View.extend({
	el: '#footer',
	initialize: function() {
		this.render();
	},
	render: function () {
		this.$el.html(this.template());
	}
});