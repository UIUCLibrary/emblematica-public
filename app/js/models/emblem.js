EmblemSearchResult = Backbone.Model.extend({
    url: "/api/Emblem/Search",
    initialize: function() {
    	this.on('change', function() {
			this.set({
				From: this.get('Search').Skip + 1,
				To: this.get('Search').Skip + this.get('Emblems').length
			});
		}, this);
    },
	search: function(query) {
		this.fetch({ data: query });
	},

	parse: function(response) {
		response.Facets.Iconclass = [];
		$.each(response.Emblems, function(index, emblem) {
			if(emblem.Motto != null) {
				emblem.Motto = emblem.Motto.split(/\s+/).slice(0,15).join(" ");
			}	
		});
		//str.split(/\s+/).slice(1,5).join(" ");
		/* UNCOMMENT THIS FOR ICONCLASS FACETS

		var n = 1;
		if (response.Search.Filter != null && response.Search.Filter.Iconclass != null) {
			n = response.Search.Filter.Iconclass.length + 1;
		}
		//console.log(response.Facets.Iconclass);
		response.Facets.Iconclass = this.aggregateIconclassFacets(response.Facets.Iconclass, n);\

		*/

		//console.log(response.Facets.Iconclass);
		// sort iconclass counts
		/*var sortedIconclassFacets = [];
		for (var iconclass in aggregatedIconclassFacets)
		      sortedIconclassFacets.push([iconclass, aggregatedIconclassFacets[iconclass]])
		sortedIconclassFacets.sort(function(a, b) {return b[1] - a[1] })

		var aggregatedIconclassFacetObjects = [];
		$.each(sortedIconclassFacets, function(index, iconclass) {
			aggregatedIconclassFacetObjects.push({'Key' : iconclass[0], 'Value' : iconclass[1]});
		});
		
		response.Facets.Iconclass = aggregatedIconclassFacetObjects;*/
        return response;
    },

    aggregateIconclassFacets: function(facet, n) {
    	//console.log(n);
    	var aggregatedIconclassFacets = [];
    	$.each(facet, function(index, iconclass) {
    		console.log(iconclass['Key'].substring(0, n));
    		if (aggregatedIconclassFacets.indexOf(iconclass['Key'].substring(0, n)) == -1) {
    			aggregatedIconclassFacets.push(iconclass['Key'].substring(0, n));
    			console.log(aggregatedIconclassFacets);
    		}
    	});
    	aggregatedIconclassFacets.sort();
    	console.log(aggregatedIconclassFacets);
    	var aggregatedIconclassFacetObjects = [];
    	$.each(aggregatedIconclassFacets, function(index, iconclass) {
    		aggregatedIconclassFacetObjects.push({'Key' : iconclass, 'Value' : 0});
    	});
    		//then create object array (key, value = 0)
    		//then return object

			/*if(aggregatedIconclassFacets[iconclass['Key'][0]] == null) {
				aggregatedIconclassFacets[iconclass['Key'][0]] = iconclass['Value'];
			}
			else {
				aggregatedIconclassFacets[iconclass['Key'][0]] = 
					aggregatedIconclassFacets[iconclass['Key'][0]] + iconclass['Value'];
			}*/
		

		return aggregatedIconclassFacetObjects;
    }
});

EmblemDetail = Backbone.Model.extend({
    url: "/api/Emblem",

    initialize: function(id) {
    	this.fetch({ data: 'id=' + id });
    }
});