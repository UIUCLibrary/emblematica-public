SearchFieldView = Backbone.View.extend({
	id: 'search-field',
	initialize: function(options) {
		if(options.index == undefined) {
			this.index = 0;
		}
		else {
			this.index = options.index;
		}

		if(options.first == undefined) {
			this.first = true;
		}
		else {
			this.first = options.first;
		}

		if(options.last  == undefined) {
			this.last = false;
		}
		else {
			this.last = options.last;
		}

		this.render();
		this.updateOption(options.searchOption);
	},

	events: {
		'change #emblem-fields input:radio' : 'updateField',
		'click #field' : 'toggleField',
		'click #remove' : 'destroy',
	},

	render: function() {
		this.$el.html(this.template({index : this.index}));
		//$('.fields', this.el).hide();

		if(this.first) {
			$('#and', this.el).remove();
			$('#remove', this.el).remove();
		}
		else {
			$('#option', this.el).remove();
			$('#add', this.el).remove();
			$('#search', this.el).remove();
		}
		/*
		if(this.last) {
			$('#btn-add', this.el).hide();
		}*/
    	return this;
	},

	destroy: function() {
	    this.trigger('removeField', this);
	    this.close();
	},

	updateOption: function(option) {
		this.searchOption = option;

		$('.fields', this.el).hide();
		$('#selected-option', this.el).text(this.searchOption);
	},

	updateField: function(event) {
		$('#btn-field', this.el).html($(event.target).val() + ' <span class="caret"></span>');
	},

	toggleField: function(event) {
		if(this.searchOption == 'Emblems') {
			$('#emblem-fields', this.el).toggle();
		}
		else {
			$('#book-fields', this.el).toggle();
		}
	}
});

SearchView = Backbone.View.extend({
	tagName: 'form',
	id: 'search',
	initialize: function() {
		// default option
		this.searchOption = "Emblems";

		// for unique radio button names
		this.totalSearchFieldViews = 1;

		this.searchFieldViews = [];
		this.searchFieldViews.push(new SearchFieldView({'searchOption' : this.searchOption}));
	},

	events: {
		'click #option a' : 'updateOption',
		'click #add' : 'addField',	
		'click #language a' : 'updateLanguage',
		'click #search' : 'search',
		'submit' : 'search'
	},

	render: function() {
		// show single search field
		this.$el.append(this.searchFieldViews[0].el);
    	return this;
	},

	/* also delegates events from child views */
	delegateAllEvents: function() {
		this.delegateEvents();

		for(var i = 0; i < this.searchFieldViews.length; i++) {
			this.searchFieldViews[i].delegateEvents();	
		} 
	},

	updateOption: function(event) {
		event.preventDefault();

		var selectedOption = $(event.target).text().trim();
		this.searchOption = selectedOption;

		for(var i = 0; i < this.searchFieldViews.length; i++) {
			this.searchFieldViews[i].close();	
		}
		this.searchFieldViews = [];
		this.searchFieldViews.push(new SearchFieldView({'searchOption' : this.searchOption}));
		this.render();

		/*var selectedOption = $(event.target).text().trim();

		// reset fields if search option has changed
		if(this.searchOption != selectedOption) {
			// change first search field to default search (keywords)
			this.searchFieldViews[0].updateOption(this.searchOption);

			// remove other fields
			while(this.searchFieldViews.length > 1) {
				this.searchFieldViews[1].destroy();
			}

			this.searchOption = selectedOption;
		}*/
	},

	addField: function() {
		// maximum of 3 search fields
		if(this.searchFieldViews.length < 3) {
			var last = false;
			if(this.searchFieldViews.length == 2) {
				last = true;
			}

			var searchFieldView = new SearchFieldView({
				'first' : false,
				'last' : last,
				'index' : this.totalSearchFieldViews,
				'searchOption' : this.searchOption});
			this.searchFieldViews.push(searchFieldView);
			this.listenTo(searchFieldView, 'removeField', this.removeField);

			$(this.el).append(searchFieldView.render().el);

			this.totalSearchFieldViews++;
		}
		else {
			alert('Only 3 search fields are allowed.');
		}
	},

	removeField: function(view) {
		for(var i = 0; i < this.searchFieldViews.length; i++) {
			if(this.searchFieldViews[i] == view) {
				this.searchFieldViews.splice(i, 1);
			}	
		}
	},

	updateLanguage: function(event) {
		event.preventDefault();
		$('#iconclass-language', this.el).html($(event.target).text().trim() + ' <span class="caret"></span>');
	},

	search: function(event) {
		event.preventDefault();

		var query = {};
		if(this.searchOption == 'Emblems') {
			for(var i = 0; i < this.searchFieldViews.length; i++) {
				var _this = this;
				//console.log($('#emblem-fields input:radio:checked', this.searchFieldViews[i].el).val());

				/* fix this, no need to do each, see console.log above */
				$('#emblem-fields input:radio', this.searchFieldViews[i].el).each(function () {
					if($(this).is(':checked')) {
						query['query.' + $(this).val()] = $('#term', _this.searchFieldViews[i].el).val();
					}
				});
			}

			router.navigate('search/emblem?' + $.param(query), true);
		}
		else {
			for(var i = 0; i < this.searchFieldViews.length; i++) {
				var _this = this;
				//console.log($('#emblem-fields input:radio:checked', this.searchFieldViews[i].el).val());

				/* fix this, no need to do each, see console.log above */
				$('#book-fields input:radio', this.searchFieldViews[i].el).each(function () {
					if($(this).is(':checked')) {
						query['query.' + $(this).val()] = $('#term', _this.searchFieldViews[i].el).val();
					}
				});
			}

			router.navigate('search/book?' + $.param(query), true);
		}
	}
});