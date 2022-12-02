templateLoader.load(["HeaderView", "FooterView", "ContentView",
	"SearchFieldView", "EmblemResultView", "BookResultView",
	"SidebarFacetView", "SidebarBookDetailView", "SidebarEmblemDetailView",
	"IconclassLabelView", "IconclassOptionsView", "BrowseIconclassView",
	"LanguageView", "EmblemDetailView"],
    function () {
        router = new Router();
        //Backbone.history.start({ pushState: true, root: "/portal/" });
        Backbone.history.start({ pushState: true, root: "/" });
    });