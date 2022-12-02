SearchFieldView = Backbone.View.extend({
	id: 'search-field',
	initialize: function(options) {
		this.index = options.index;
		this.searchOption = options.searchOption;

		//this.render();
	},

	events: {
		'change .fields input:radio' : 'changeSelectedField',
		'click #change-field' : 'toggleField',
		'click #remove' : 'destroy',
	},

	render: function() {
		this.$el.html(this.template({
			index : this.index
		}));

		this.updateSelectedField(DEFAULT_SEARCH_FIELD);

		if(this.index == 1) {
			$('#selected-option', this.el).text(this.searchOption);
			this.hideAdditionalFieldElements();
		}
		else {
			this.hideFirstFieldElements();
		}

		if(this.searchOption == 'Emblems') {
			this.languageView = new LanguageView();
			$('#iconclass-term', this.el).append(this.languageView.render().el);
		}

    	return this;
	},

	destroy: function() {
	    this.trigger('removeField', this);
	    this.close();
	},

	hideFirstFieldElements: function() {
		$('#option', this.el).remove();
		$('#add', this.el).remove();
		$('#search', this.el).remove();
	},

	hideAdditionalFieldElements: function() {
		$('#and', this.el).remove();
		$('#remove', this.el).remove();
	},

	updateSelectedField: function(field) {
		$('.fields', this.el).hide();
		$('#selected-field', this.el).text(field);

		this.selectedField = field;
	},

	changeSelectedField: function(event) {
		this.updateSelectedField($(event.target).val());
	},

	toggleField: function(event) {
		var searchOption = this.searchOption.toLowerCase();
		$('#' + searchOption, this.el).toggle();
	},

	getSearchParameters: function() {
		var searchTerm = $('#term', this.el).val();

		// if selected field is iconclass term, add selected language
		if(this.selectedField == 'term') {
			searchTerm = searchTerm + '|' + this.languageView.getSelectedLanguage();
		}

		return {'searchField' : this.selectedField,
				'searchTerm' :  searchTerm};
	}
});

SearchView = Backbone.View.extend({
	tagName: 'form',
	id: 'search',
	initialize: function() {
		this.searchOption = DEFAULT_SEARCH_OPTION;
		this.resetFields();
	},

	events: {
		'click #option a' : 'updateOption',
		'click #add' : 'addField',	
		'click #search' : 'search',
		'submit' : 'search'
	},

	render: function() {
    	return this;
	},

	/* also delegates events from child views */
	/*delegateAllEvents: function() {
		this.delegateEvents();

		for(var i = 0; i < this.searchFieldViews.length; i++) {
			this.searchFieldViews[i].delegateEvents();
		} 
	},*/

	/* update search form if search option (book, emblem) has changed */
	updateOption: function(event) {
		event.preventDefault();

		var selectedOption = $(event.target).text().trim();
		
		if(this.searchOption != selectedOption) {
			this.searchOption = selectedOption;
			this.resetFields();
		}
	},

	/* remove all fields and replace with new one */
	resetFields: function() {
		if(this.searchFieldViews != undefined) {
			for(var i = 0; i < this.searchFieldViews.length; i++) {
				this.searchFieldViews[i].close();	
			}
		}

		// variable used for unique radio button names
		this.totalSearchFieldViews = 1;
		this.searchFieldViews = [];
		this.childViews = this.searchFieldViews;

		this.addField();
	},

	/* add additional search field */
	addField: function() {
		if(this.searchFieldViews.length < MAXIMUM_SEARCH_FIELDS) {
			var searchFieldView = new SearchFieldView({
				'index' : this.totalSearchFieldViews,
				'searchOption' : this.searchOption
			});
			this.searchFieldViews.push(searchFieldView);

			this.listenTo(searchFieldView, 'removeField', this.removeField);
			this.$el.append(searchFieldView.render().el);

			this.totalSearchFieldViews++;
		}
		else {
			alert('Only ' + MAXIMUM_SEARCH_FIELDS + ' search fields are allowed.');
		}
	},

	/* remove search field from list */
	removeField: function(view) {
		for(var i = 0; i < this.searchFieldViews.length; i++) {
			if(this.searchFieldViews[i] == view) {
				this.searchFieldViews.splice(i, 1);
			}	
		}
	},

	search: function(event) {
		event.preventDefault();

		var query = {};

		for(var i = 0; i < this.searchFieldViews.length; i++) {
			var searchParameters = this.searchFieldViews[i].getSearchParameters();
			query['query.' + searchParameters.searchField] = searchParameters.searchTerm;		
		}
		router.navigate('search/' + this.searchOption.toLowerCase() + '?' + $.param(query), true);
	}
});