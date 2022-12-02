HeaderView = Backbone.View.extend({
	el: '#header',
	initialize: function() {
		this.render();
		this.affixNavbar();
		this.toggleDropdown();
	},

	events: {
		'click .nav-link' : 'navigate'
	},

	render: function () {
		this.$el.html(this.template());
	},

	/* fix navbar to top of screen when scrolling */
	affixNavbar: function () {
		$('nav', this.el).affix({
	    	offset: {
	        	top: $('#banner', this.el).height()
	      	}
		}); 
	},
	
	/* toggle dropdown menu when clicked */
	toggleDropdown: function() {
		$('ul.dropdown-menu [data-toggle=dropdown]', this.el).on('click', function(event) {
		   	event.stopPropagation(); 
		    $(this).parent().toggleClass('open');
		});
	},

	navigate: function(event) {
    	event.preventDefault();
    	router.navigate($(event.target).attr('href'), true);
    },
});