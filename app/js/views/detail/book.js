/*BookDetailView = Backbone.View.extend({
    initialize: function() {
        _.bindAll(this, 'render');
        this.model.bind('change', this.render);
    },

    render: function() {
        var _this = this;
        $.ajax({
            url: '/spinetransform/book?url=' + this.model.get('SpineXML'),
            success: function(data) {
                _this.$el.html(data);
            }
        });
    }
});
*/

BookDetailView = Backbone.View.extend({
    initialize: function() {
        _.bindAll(this, 'render');
        this.model.bind('change', this.render);
    },

    events: {
        'click .name>a' : 'displayNameInfo'
    },

    render: function() {
        var _this = this;
        $.ajax({
            url: '/spinetransform/book?url=' + this.model.get('SpineXML'),
            success: function(data) {
                _this.$el.html(data);
                $('.name', _this.$el).each(function() {

                    var resource = $(this).attr('resource');                  
                    var element = $(this);

                    if (typeof resource !== typeof undefined && resource !== false) {
                        var service = 'VIAF';
                        var resource_id = resource.replace('http://viaf.org/viaf/', '').replace('/', '');
                        if(resource.startsWith("http://d-nb")) {
                            service = 'DNB';
                            resource_id = resource.replace('http://d-nb.info/gnd/', '').replace('/', '');
                        }
                        $.ajax({
                            url: '/' + service + 'Proxy/api/name?url=' + resource,
                            headers: { 
                                Accept : "application/json",
                            },
                            success: function(data) {
                                element.append('<a href="" class="btn btn-info btn-xs" data-toggle="modal" data-target="#' + resource_id  + '">More info</a>');

                                var modal = '<div class="modal fade" id="'+ resource_id + '" role="dialog">' +
                                    '<div class="modal-dialog modal-md">' +
                                      '<div class="modal-content">' +
                                        '<div class="modal-header">' +
                                          '<button type="button" class="close" data-dismiss="modal">×</button>' +
                                          '<h4 class="modal-title">' + data.Name + '</h4>' +
                                        '<div class="modal-body font-14">';

                                if(data.Gender != 'unknown') {
                                    modal = modal +
                                            '<p><b>Gender: </b>' +
                                            '<span>' + data.Gender + '</span>' +
                                            '</p>';
                                }

                                if(data.BirthDate != 'unknown') {
                                    modal = modal +
                                            '<p><b>Birth Date: </b>' +
                                            '<span>' + data.BirthDate + '</span>' +
                                            '</p>';
                                }

                                if(data.DeathDate != 'unknown') {
                                    modal = modal +
                                            '<p><b>Death Date: </b>' +
                                            '<span>' + data.DeathDate + '</span>' +
                                            '</p>';
                                }

                                if(data.DNBLinks.length > 0) {
                                    modal = modal + '<p><b>Deutsche Nationalbibliothek:</b></p>';
                                    for(var i = 0; i < data.DNBLinks.length; i++) {
                                        modal = modal + '<p><a href="' + data.DNBLinks[i] + '">' + data.DNBLinks[i] + '</a></p>';
                                    }
                                }

                                if(data.BNFLinks.length > 0) {
                                    modal = modal + '<p><b>Bibliothèque nationale de France:</b></p>';
                                    for(var i = 0; i < data.BNFLinks.length; i++) {
                                        modal = modal + '<p><a href="' + data.BNFLinks[i] + '">' + data.BNFLinks[i] + '</a></p>';
                                    }
                                }

                                if(data.Wikipedia.length > 0) {
                                    modal = modal + '<p><b>Wikipedia:</b></p>';
                                    for(var i = 0; i < data.Wikipedia.length; i++) {
                                        modal = modal + '<p><a href="' + data.Wikipedia[i] + '">' + data.Wikipedia[i] + '</a></p>';
                                    }
                                }

                                if(data.VIAFLink != null) {
                                    modal = modal + '<p><b>Virtual International Authority File:</b></p>';
                                    modal = modal + '<p><a href="' + data.VIAFLink + '">' + data.VIAFLink + '</a></p>';
                                }
                                            
                                modal = modal + 
                                        '</div>' +
                                        '<div class="modal-footer">' +
                                          '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>' +
                                        '</div>' +
                                      '</div>' +
                                    '</div>' +
                                '</div>';

                                element.append(modal);
                                _this.delegateEvents();
                            }
                        });
                        
                    }
                });
            }
        });
    },

    displayNameInfo: function(event) {
        //console.log($(event.target).next().toggle());
        event.preventDefault();
    }
});