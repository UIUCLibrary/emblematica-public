ContentView = Backbone.View.extend({
	el: '#content',
	renderLayout: function() {
		$('.jcarousel').jcarousel('destroy');
		$(this.el).empty().html(this.template());
	},

	renderHtml: function(html) {
		if($('#main', this.el).html() == undefined) {
			this.renderLayout();
		}
		$('#sidebar .nav', this.el).empty();
        $('#main', this.el).html(html);

        $(".iconclass").hide();

        $('.iconclass-toggle').click(function(event) {
        	event.preventDefault();
        	show = true;
        	if($("#iconclass-" + $(this).attr('id')).is(':visible')) {
        		show = false;
        	}
        	$(".iconclass").hide();        	

        	if(show == true) {
        		$("#iconclass-" + $(this).attr('id')).show();
        	}
        	else{
        		$("#iconclass-" + $(this).attr('id')).hide();
        	}
        	
        });
	},

	renderStaticContent: function(menu, page) {
		if($('#main', this.el).html() == undefined) {
			this.renderLayout();
		}

		var _this = this;
		$.get('app/html/static/' + menu + '/' + page + '.html', function (data) {
	        template = _.template(data, { });
        	$('#main', _this.el).html(template);
        	_this.renderStaticSidebar(menu, page);
    	}, 'html');
	},

	renderStaticSidebar: function(menu, page) {
		$('#sidebar', this.el).empty();

		$('#sidebar', this.el).append('<ul class="nav">');
		$('#sidebar .nav', this.el).append('<li><h1 class="font-16">' + menu + '</h1></li>');

		$('#header nav li a:contains("' + menu + '")').parent().children('.dropdown-menu').children().each(function() {
	 		$('#sidebar .nav', this.el).append('<li><h2 class="font-14">' + $(this).html() + '</h2></li>');
		});

		$($('#main h1', this.el).get().reverse()).each(function() {
	 		$('#sidebar .nav li a[href="' + page + '"]').parent().parent().after('<li><h3 class="font-12"><a href="' 
	 			+ page + "#" + $(this).parent().attr('id') + '">' + $(this).text() + '</a></h3></li>');
		}); 
		$('#sidebar', this.el).append('</ul>');
	},

	renderDynamicContent: function(views) {
		if($('#main', this.el).html() == undefined) {
			this.renderLayout();
		}

		$('#main', this.el).empty();

		$.each(views, function(i, el){
			$('#main', this.el).append(el);
		}, '', this);
	},

	renderDynamicSidebar: function(view) {
		$('#sidebar', this.el).html(view);
	},
});