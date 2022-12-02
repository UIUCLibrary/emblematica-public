LanguageView = Backbone.View.extend({
	id: 'language',
	className: 'dropdown',
	initialize: function() {
	},

	events: {
		'click #choices a' : 'changeLanguage'
	},

	render: function() {
		this.$el.html(this.template());
		this.updateLanguage(DEFAULT_LANGUAGE_CODE);
		return this;
	},

	changeLanguage: function(event) {
		event.preventDefault();

		var newLanguage = $(event.target).data('val');
		if(this.selectedLanguage != newLanguage) {
			this.updateLanguage(newLanguage);
		}
	},

	updateLanguage: function(language) {
		$('#selected-language', this.el).text(DATA.TWO_LETTER_LANGUAGE_CODE[language]);
		this.selectedLanguage = language;
	},

	getSelectedLanguage: function() {
		return this.selectedLanguage;
	}
});