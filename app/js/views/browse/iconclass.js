BrowseIconclassView = Backbone.View.extend({
    initialize: function(language, notation) {
        this.notation = notation;
        this.currentLanguage = language;
        this.iconclassViews = [];
    },

    events: {
        'click #language a' : 'changeLanguage'
    },

    render: function() {
        this.$el.html(this.template());
        $('#btn-language', this.el).text(DATA.TWO_LETTER_LANGUAGE_CODE[this.currentLanguage]);

        if(this.notation == null) {
            this.renderTopLevel();
            $('#top', this.el).hide();
        }
        else {
            this.renderHierarchy(this.notation);
            $('#top', this.el).attr('href', 'browse/iconclass/' + this.currentLanguage);
        };;
        return this;
    },

    renderTopLevel: function() {
        $('#selected', this.el).hide();

        var _this = this;
        $.ajax({
            url: '/iconclass/api/gettoplevel',
            success: function(data) {
                _this.renderLabels('children', data.Children);
            }
        });
    },

    renderHierarchy: function() {
        var _this = this;
        $.ajax({
            url: '/iconclass/api/getdetails?notations=' + encodeURIComponent(this.notation),
            success: function(data) {
                if(data.length > 0) {
                    var data = data[0];

                    $('#selected', _this.el).css('margin-left', data.Ancestors.length * 10);
                    _this.renderSelectedIconclass(data);

                    _this.renderLabels('ancestors', data.Ancestors);
                    _this.renderLabels('children', data.Children, data.Ancestors.length * 10 + 35);
                }              
            }
        });
    },

    renderLabels: function(view, notations, padding) {
        var _this = this;

        for(var i = 0; i < notations.length; i++) {
            notations[i] = encodeURIComponent(notations[i]);
        }

        $.ajax({
            url: '/iconclass/api/getlabels?notations=' + notations.join('|'),
            success: function(data) {
                for(var i = 0; i < data.length; i++) {
                    
                    if(view == 'ancestors') {
                        padding = i * 10;
                    }

                    _this.renderIconclass(view, data[i], padding);

                }
            }
        });
    },

    renderSelectedIconclass: function(iconclass) {
        var iconclassOptionsView = new IconclassOptionsView(iconclass);
        $('#selected', this.el).append(iconclassOptionsView.render(this.currentLanguage).el);
        //this.iconclassViews.push(iconclassOptionsView);
        this.selectedIconclassView = iconclassOptionsView;
    },

    renderIconclass: function(view, iconclass, padding) {
        var iconclassHierarchyView = new IconclassHierarchyView(iconclass);
        $('#' + view, this.el).append(iconclassHierarchyView.render(this.currentLanguage, padding).el);
        $('.caret', iconclassHierarchyView.el).hide();
        this.listenTo(iconclassHierarchyView, 'changeSelectedIconclass', this.changeSelectedIconclass);
        this.iconclassViews.push(iconclassHierarchyView);
    },

    changeSelectedIconclass: function(iconclass) {
        if(this.selectedIconclassView != undefined) {
            this.selectedIconclassView.destroy();
        }

        for(var i = 0; i < this.iconclassViews.length; i++) {
            this.iconclassViews[i].destroy();
        }

        this.destroy();

        router.navigate('browse/iconclass/' +  this.currentLanguage + '/' + iconclass.Notation, true);
    },

    changeLanguage: function(event) {
        event.preventDefault();
        
        var language = $(event.target).text().trim();
        var languageCode;

        if(language == 'German') {
            languageCode = 'de';
        }
        else if(language == 'French') {
            languageCode = 'fr';
        }
        else if(language == 'Italian') {
            languageCode = 'it';
        }
        else if(language == 'English') {
            languageCode = 'en';
        }

        if(languageCode != this.currentLanguage) {
            if(this.selectedIconclassView != undefined) {
                this.selectedIconclassView.changeLanguage(languageCode);
                this.selectedIconclassView.iconclassLabelView.changeLanguage(languageCode);
            }

            for(var i = 0; i < this.iconclassViews.length; i++) {
                this.iconclassViews[i].changeLanguage(languageCode);
            }

            $('#btn-language', this.el).text(language);

            this.currentLanguage = languageCode;
            $('#top', this.el).attr('href', 'browse/iconclass/' + this.currentLanguage);

            if(this.notation != null) {
                router.navigate('browse/iconclass/' + this.currentLanguage + '/' + this.notation, {replace: true});
            }
            else {
                router.navigate('browse/iconclass/' + this.currentLanguage, {replace: true});
            }
        }
    },

    destroy: function() {
        this.unbind();
        this.remove();
    },
});



/*BrowseIconclassView = Backbone.View.extend({
    initialize: function(iconclass) {
    	this.$el.html(this.template());
        this.iconclassViews = [];
        var _this = this;
        $('#selected', this.el).hide();
    	$.ajax({
            url: '/iconclass/api/gettoplevel',
            success: function(data) {
                $.ajax({
                    url: '/iconclass/api/getlabels?notations=' + data.Children.join('|'),
                    success: function(data) {
                        for(var i = 0; i < data.length; i++) {
                            var iconclassHierarchyView = new IconclassHierarchyView(data[i]);
                            _this.listenTo(iconclassHierarchyView, 'changeSelectedIconclass', _this.changeSelectedIconclass);
                            _this.iconclassViews.push(iconclassHierarchyView);
                            _this.$el.append(iconclassHierarchyView.render(data[i]).el);
                        }
                    }
                });
            }
        });
    },

    render: function() {
    	return this;
    },

    changeSelectedIconclass: function(iconclass) {
        for(var i = 0; i < this.iconclassViews.length; i++) {
            this.iconclassViews[i].destroy();
        }

        this.iconclassViews = [];
        var _this = this;
        $.ajax({
            url: '/iconclass/api/getdetails?notations=' + iconclass.Notation,
            success: function(data) {
                data = data[0];

                $.ajax({
                    url: '/iconclass/api/getlabels?notations=' + data.Ancestors.join('|'),
                    success: function(data) {
                        for(var i = 0; i < data.length; i++) {
                            var iconclassHierarchyView = new IconclassHierarchyView(data[i]);
                            _this.listenTo(iconclassHierarchyView, 'changeSelectedIconclass', _this.changeSelectedIconclass);
                            _this.iconclassViews.push(iconclassHierarchyView);
                            $('#ancestors', _this.el).append(iconclassHierarchyView.render(i * 10).el);
                        }
                    }
                });

                var iconclassOptionsView = new IconclassOptionsView(data);
                //_this.iconclassViews.push(iconclassOptionsView);
                $('#selected', this.el).show();
                $('#selected', _this.el).html(iconclassOptionsView.render().el);


                var childPadding = data.Ancestors.length * 10 + 35;
                $('#selected', _this.el).css('margin-left', data.Ancestors.length * 10);

                $.ajax({
                    url: '/iconclass/api/getlabels?notations=' + data.Children.join('|'),
                    success: function(data) {
                        for(var i = 0; i < data.length; i++) {
                            var iconclassHierarchyView = new IconclassHierarchyView(data[i]);
                            _this.listenTo(iconclassHierarchyView, 'changeSelectedIconclass', _this.changeSelectedIconclass);
                            _this.iconclassViews.push(iconclassHierarchyView);
                            $('#children', _this.el).append(iconclassHierarchyView.render(childPadding).el);
                        }
                    }
                });
            }
        });
    }
});*/