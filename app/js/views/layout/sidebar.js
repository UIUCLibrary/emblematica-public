SidebarFacetView = Backbone.View.extend({
	initialize: function() {
		_.bindAll(this, 'render');
    	this.model.bind('change', this.render);
    	this.shown = [];
	},

	events: {
		'click .more' : 'showMoreFacets',
		'click .filter': 'filter',
		'click .reset': 'reset'
		//'click [type="checkbox"]': 'filter'
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));

		this.showTopN(10);
	},

	showTopN: function(n) {
		var more = [];

		for (var facet in this.model.toJSON().Facets) {
			var count = 0;
			$( '.' + facet, this.el).each(function( index ) {
  				if(index >= n) {
  					$(this).hide();
  				}
  				count++;
			});

			if(count > n) {
				this.shown[facet] = n;
			}
			else {
				this.shown[facet] = count;
				$('#more-' + facet , this.el).hide();
			}
		}
	},

	// show 5 more facets by default
	showMoreFacets: function(event) {
		event.preventDefault();

		var facet = $(event.target).attr('id').replace('more-', '');
		
		var i = this.shown[facet];
		do {
			if($('#' + facet + '-' + i).html() == undefined) {
				$(event.target).hide();
				break;
			}
			else {
				$('#' + facet + '-' + i).show();
			}
			i++;
		} while(i < this.shown[facet] + 5);
		this.shown[facet] = i;

	},

	filter: function(event) {
		//need to know type
    	var query = this.model.get('Search');
    	var facet = $(event.target).parent().attr('class');
        
        if(query.Filter == null) {
        	query.Filter = {};
        }

        query.Filter[facet] = $(event.target).val();
        query.Skip = 0;

        var urlPath = Backbone.history.getFragment().split('?')[0];
        router.navigate(urlPath + '?' + encodeObjectToURL(query), true);
	},

	reset: function(event) {
		var query = this.model.get('Search');
		var facet = $(event.target).val();

        query.Filter[facet] = null;
        query.Skip = 0;

        var urlPath = Backbone.history.getFragment().split('?')[0];
		router.navigate(urlPath + '?' + encodeObjectToURL(query), true);
	}
});

SidebarBookDetailView = Backbone.View.extend({
	initialize: function(options) {
		this.query = options.query;

		_.bindAll(this, 'render');
    	this.model.bind('change', this.render);
	},

	events: {
		'click #back' : 'back'
	},

	render: function() {
		document.title = this.model.get('Title');
		var model = this.model.toJSON();

		if(this.query != undefined) {
			model.FromSearch = true;
		}
		else {
			model.FromSearch = false;
		}
		
		this.$el.html(this.template(model));
	},

	back: function(event) {
		event.preventDefault();

		if(this.query.startsWith('emblem')) {
			this.query = 'emblems' + this.query.substring(6, this.query.length);
		}
		else {
			this.query = 'books' + this.query.substring(4, this.query.length);
		}

		router.navigate('search/' + this.query, true);
	}
});

SidebarEmblemDetailView = Backbone.View.extend({
	initialize: function(options) {
		this.query = options.query;

		_.bindAll(this, 'render');
    	this.model.bind('change', this.render);
	},

	events: {
		'click #back' : 'back'
	},

	render: function() {
		if(this.model.get('Motto') == null) {
			document.title = 'Viewing emblems from ' + this.model.get('BookTitle');
		}
		else {
			document.title = this.model.get('Motto');
		}
		var model = this.model.toJSON();

		if(this.query != undefined) {
			model.FromSearch = true;
		}
		else {
			model.FromSearch = false;
		}
		
		this.$el.html(this.template(model));
	},

	back: function(event) {
		event.preventDefault();

		if(this.query.startsWith('emblem')) {
			this.query = 'emblems' + this.query.substring(6, this.query.length);
		}
		else {
			this.query = 'books' + this.query.substring(4, this.query.length);
		}

		router.navigate('search/' + this.query, true);
	}
})