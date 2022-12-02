EmblemResultView = Backbone.View.extend({
	id: 'emblem-result',

	initialize: function() {
		_.bindAll(this, "render");
    	this.model.bind('change', this.render);
	},

	events: {
    	"click #prev " : "prev",
		"click #next " : "next",
        "click #back-search " : "displaySearchResults",
        "click .emblem " : "displayEmblem"
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
	},

	prev: function(event) {

    	event.preventDefault();

    	var query = this.model.get('Search');
        query.Skip = query.Skip - query.Take;

    	router.navigate('search/emblems?' + encodeObjectToURL(query), true);
    },

	next: function(event) {
    	event.preventDefault();

    	var query = this.model.get('Search');
        query.Skip = this.model.get('To');

    	router.navigate('search/emblems?' + encodeObjectToURL(query), true);
    },

    displayEmblem: function(event) {
        event.preventDefault();
        router.navigate($(event.target.closest("a")).attr('href'), true);
    }
});