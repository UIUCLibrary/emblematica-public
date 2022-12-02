Router = Backbone.Router.extend({
    routes: {
        "" : "home",
        "index.html" : "home",

        "browse/books" : "browseBooks",
        "browse/emblems" : "browseEmblems",
        "browse/iconclass(/:language)(/)(:notation)" : "browseIconclass",

        "search/books" : "searchBooks",
        "search/emblems" : "searchEmblems",

        "detail/book/:id" : "showBookDetail",
        "detail/book/:id/emblems" : "showBookEmblems",
        "detail/emblem/:id" : "showEmblemDetail",

        "about/project" : "project",
        "about/history" : "history",
        "about/collections" : "collections",
        "about/research" : "research",
        "about/additional-resources" : "additionalResources",

        "help/what-emblem" : "whatEmblem",
        "help/what-iconclass" : "whatIconclass",
        "help/tips" : "tips",
        "help/sitemap" : "sitemap",
        "help/conditions" : "conditions"
    },

    initialize: function() {
        //console.log('here');
    	this.headerView = new HeaderView();
    	this.footerView = new FooterView();
    	this.contentView = new ContentView();

        this.currentPage = null;
        this.page = null;
        this.bind('route', this._pageView);
        //console.log(Backbone.history);
    },

    _pageView: function() {
        var path = Backbone.history.getFragment();
        //console.log(path);
        //ga('send', 'pageview', {page: "/" + path});
        ga('send', 'pageview', "/" + path);
    }, 

    home: function() {
        if(!this.searchView) {
            this.searchView = new SearchView();
        }

    	if(!this.homeView) {
    		this.homeView = new HomeView({
                'searchView' : this.searchView
            });
    	}
        
        this.homeView.render();
        this.currentPage = 'home';
        this.page = this.homeView;
        document.title = "Emblematica Online";
    },

    browseBooks: function(query) {
        if(!this.bookSearchResult) {
            this.bookSearchResult = new BookSearchResult();
            this.bookResultView = new BookResultView({model : this.bookSearchResult});
            this.sidebarFacetView = new SidebarFacetView({model : this.bookSearchResult});
        }

        if(this.query != 'book?' + query) {
            this.bookSearchResult.search(query);
            this.query = 'book?' + query;
        }

        if(this.currentPage != 'bookbrowse') {
            this.contentView.renderDynamicContent([this.bookResultView.el]);
            this.contentView.renderDynamicSidebar(this.sidebarFacetView.el);
            this.sidebarFacetView.delegateEvents();
            this.bookResultView.delegateEvents();

            this.currentPage = 'bookbrowse';
        }

        document.title = "Browse Books";
    },

    browseEmblems: function(query) {
        if(!this.emblemSearchResult) {
            this.emblemSearchResult = new EmblemSearchResult();
            this.emblemResultView = new EmblemResultView({model : this.emblemSearchResult});
            this.sidebarFacetView = new SidebarFacetView({model : this.emblemSearchResult});
        }

        if(this.query != 'emblem?' + query) {
            this.emblemSearchResult.search(query);
            this.query = 'emblem?' + query;
        }

        if(this.currentPage != 'emblembrowse') {
            this.contentView.renderDynamicContent([this.emblemResultView.el]);
            this.contentView.renderDynamicSidebar(this.sidebarFacetView.el);
            
            this.sidebarFacetView.delegateEvents();
            this.emblemResultView.delegateEvents();

            this.currentPage = 'emblembrowse';
        }

        document.title = "Browse Emblems";
    },

    searchBooks: function(query) {
        if(!this.searchView) {
            this.searchView = new SearchView();
        }

        if(!this.bookSearchResult) {
            this.bookSearchResult = new BookSearchResult();
            this.bookResultView = new BookResultView({model : this.bookSearchResult});
            this.sidebarFacetView = new SidebarFacetView({model : this.bookSearchResult});
        }

        if(this.query != 'book?' + query) {
            this.bookSearchResult.search(query);
            this.query = 'book?' + query;
        }

        if(this.currentPage != 'booksearch') {
            this.contentView.renderDynamicContent([this.searchView.el, this.bookResultView.el]);
            this.contentView.renderDynamicSidebar(this.sidebarFacetView.el);
            
            this.searchView.delegateAllEvents();
            this.sidebarFacetView.delegateEvents();
            this.bookResultView.delegateEvents();

            this.currentPage = 'booksearch';
        }

        document.title = "Search Results";
    },

    searchEmblems: function(query) {
        if(!this.searchView) {
            this.searchView = new SearchView();
        }

        if(!this.emblemSearchResult) {
            this.emblemSearchResult = new EmblemSearchResult();
            this.emblemResultView = new EmblemResultView({model : this.emblemSearchResult});
            this.sidebarFacetView = new SidebarFacetView({model : this.emblemSearchResult});
        }

        if(this.query != 'emblem?' + query) {
            this.emblemSearchResult.search(query);
            this.query = 'emblem?' + query;
        }

        if(this.currentPage != 'emblemsearch') {
            this.contentView.renderDynamicContent([this.searchView.el, this.emblemResultView.el]);
            this.contentView.renderDynamicSidebar(this.sidebarFacetView.el);

            this.searchView.delegateAllEvents();
            this.sidebarFacetView.delegateEvents();
            this.emblemResultView.delegateEvents();

            this.currentPage = 'emblemsearch';
        }

        document.title = "Search Results";
    },

    showBookDetail: function(id) {
        // if there is existing book detail instance, remove it

        var bookDetail = new BookDetail(id);
        var bookDetailView = new BookDetailView({model : bookDetail});

        var sidebarBookDetailView = new SidebarBookDetailView({model : bookDetail, query : this.query});

        this.contentView.renderDynamicContent([bookDetailView.el]);
        this.contentView.renderDynamicSidebar(sidebarBookDetailView.el);
        this.currentPage = 'bookdetail';

        //document.title = "Search Results";
    },

    showBookEmblems: function(id) {
        var emblemSearchResult = new EmblemSearchResult();
        emblemSearchResult.search('query.bookID=' + id);

        var emblemResultView = new EmblemResultView({model : emblemSearchResult});

        this.contentView.renderDynamicContent([emblemResultView.el]);

        var bookDetail = new BookDetail(id);
        //var sidebarBookDetailView = new SidebarBookDetailView({model : bookDetail, query : this.query});
        
        var sidebarEmblemDetailView = new SidebarEmblemDetailView({model : bookDetail, query : this.query});

        this.contentView.renderDynamicSidebar(sidebarEmblemDetailView.el);

        /* delegateAllEvents(); */

        this.currentPage = 'bookemblems';
    },

    showEmblemDetail: function(id) {
        var emblemDetail = new EmblemDetail(id);
        var emblemDetailView = new EmblemDetailView({model : emblemDetail});
   
        var sidebarEmblemDetailView = new SidebarEmblemDetailView({model : emblemDetail, query : this.query});

        this.contentView.renderDynamicContent([emblemDetailView.el]);
        this.contentView.renderDynamicSidebar(sidebarEmblemDetailView.el);
        this.currentPage = 'emblemdetail';
    },

    browseIconclass: function(language, notation) {
        if(language == null) {
            language = 'en';
        }

        var browse = new BrowseIconclassView(language, notation);
        this.contentView.renderDynamicContent([browse.render().el]);
        this.contentView.renderDynamicSidebar('');

        this.currentPage = 'browseiconclass';

        document.title = "Iconclass";
    },

    /* Static Pages */
    /* Decision: do not save static pages in memory
       Reason:  it is uncommon for the same page to be accessed multiple times
                and it does not put a huge load on the server if that happens
    */

    project: function() {
        this.contentView.renderStaticContent('About', 'project');
        this.currentPage = 'project';

        document.title = "Emblematica Online Project";
    },

    history: function() {
        this.contentView.renderStaticContent('About', 'history');
        this.currentPage = 'history';

        document.title = "Project History";
    },

    collections: function() {
        this.contentView.renderStaticContent('About', 'collections');
        this.currentPage = 'collections';

        document.title = "Our Collections";
    },

    research: function() {
        this.contentView.renderStaticContent('About', 'research');
        this.currentPage = 'research';

        document.title = "Research Outcomes";
    },

    additionalResources: function() {
        this.contentView.renderStaticContent('About', 'additional-resources');
        this.currentPage = 'additional-resources';

        document.title = "Additional Resources";
    },

    whatEmblem: function() {
        this.contentView.renderStaticContent('Help', 'what-emblem');
        this.currentPage = 'what-emblem';

        document.title = "What is an Emblem?";
    },

    whatIconclass: function() {
        this.contentView.renderStaticContent('Help', 'what-iconclass');
        this.currentPage = 'what-iconclass';

        document.title = "What is Iconclass?";
    },

    tips: function() {
        this.contentView.renderStaticContent('Help', 'tips');
        this.currentPage = 'tips';

        document.title = "Search Tips";
    },

    sitemap: function() {
        this.contentView.renderStaticContent('Help', 'sitemap');
        this.currentPage = 'sitemap';

        document.title = "Site Map";
    },

    conditions: function() {
        this.contentView.renderStaticContent('Help', 'conditions');
        this.currentPage = 'conditions';

        document.title = "Conditions";
    }
});