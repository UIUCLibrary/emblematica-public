BookSearchResult = Backbone.Model.extend({
    url: "/api/Book/Search",
	search: function(query) {
		this.fetch({ data: query });
	},

	parse: function(response){
        response.From = response.Search.Skip + 1;
        response.To = response.Search.Skip + response.Books.length;

        var urlPath = Backbone.history.getFragment().split('?')[0];
        var query = response.Search;
        
        query.Skip = query.Skip - query.Take;

        response.PrevLink = urlPath + '?' + encodeObjectToURL(query);

        query.Skip = response.To;
        response.NextLink = urlPath + '?' + encodeObjectToURL(query);

        return response;
    }
});

BookDetail = Backbone.Model.extend({
    url: "/api/Book",

/*
bookDetail.set({'BookTitle' : bookDetail.get('Title')});
        bookDetail.set({'BookHasEmblems' : bookDetail.get('HasEmblems')});
        bookDetail.set({'MoreInfoLink' : null});
        bookDetail.set({'PicturaLink' : null});

*/

    initialize: function(id) {
    	this.fetch({ data: 'id=' + id });
    },

    parse: function(response){
        response.BookTitle = response.Title;
        response.BookHasEmblems = response.HasEmblems;
        response.MoreInfoLink = null;
        response.PicturaLink = null;

        return response;
    }
});