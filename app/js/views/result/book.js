BookResultView = Backbone.View.extend({
	id: 'book-result',

	initialize: function() {
		_.bindAll(this, "render");
    	this.model.bind('change', this.render);
	},

	events: {
        "click .title " : "navigateLink",
        "click #prev" : "navigateLink",
        "click #next" : "navigateLink",
        "click #view-emblems" : "navigateLink"
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
	},

	/*test: function() {
		event.preventDefault();
		this.model.search($(event.target).attr('href'));
		router.navigate($(event.target).attr('href'), false);
	},*/

    navigateLink: function(event) {
        event.preventDefault();
        router.navigate($(event.target).attr('href'), true);
    }
});

