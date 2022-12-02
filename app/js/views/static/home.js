HomeView = Backbone.View.extend({
	el: "#content",
	initialize: function(options) {
		this.searchView = options.searchView;
		
		this.childViews = [];
		this.childViews.push(this.searchView);
	},
	render: function () {
		if(!this.template) {
			var _this = this;
			$.get('app/html/static/home.html', function (data) {
		        _this.template = _.template(data, { });
		        _this.renderTemplate();
	    	}, 'html');
    	}
    	else {
    		this.renderTemplate();
    	}
	},

	renderTemplate: function() {
		this.$el.html(this.template);
		$('#welcome', this.el).append(this.searchView.render().el);

    	this.delegateAllEvents();
    	this.animateCarousel();
	},

	/*delegateAllEvents: function() {
		this.searchView.delegateAllEvents();
	},*/

	animateCarousel: function() {
		var jcarousel = $('.jcarousel', this.el);

		jcarousel
		.on('jcarousel:reload jcarousel:create', function () {
		    var carousel = $(this),
		        carouselWidth = carousel.innerWidth(),
		        windowWidth = window.innerWidth;
		    if (windowWidth >= 992) {
		        carouselWidth = carouselWidth / 4;
		    }
		    else if (windowWidth >= 768) {
		        carouselWidth = carouselWidth / 3;
		    } 
		    else if (windowWidth >= 480) {
		        carouselWidth = carouselWidth / 2;
		    }
		    carousel.jcarousel('items').css('width', Math.ceil(carouselWidth) + 'px');
		})
		.jcarousel({
		  wrap: 'circular'
		});

		$('.jcarousel-control-prev')
		  .jcarouselControl({
		      target: '-=1'
		  });

		$('.jcarousel-control-next')
		  .jcarouselControl({
		      target: '+=1'
		  });

		$('.jcarousel').jcarouselAutoscroll({
		    autostart: true
		});
		  
		$('.jcarousel-pagination')
		  .on('jcarouselpagination:active', 'a', function() {
		      $(this).addClass('active');
		  })
		  .on('jcarouselpagination:inactive', 'a', function() {
		      $(this).removeClass('active');
		  })
		  .on('click', function(e) {
		      e.preventDefault();
		  })
		  .jcarouselPagination({
		      perPage: 1,
		      item: function(page) {
		          return '<a href="#' + page + '">' + page + '</a>';
		      }
		  });
	}
});