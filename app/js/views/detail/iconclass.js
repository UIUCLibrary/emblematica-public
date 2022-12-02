IconclassLabelView = Backbone.View.extend({
    initialize: function(iconclass) {
        this.iconclass = iconclass;
    },

    render: function(language, padding) {
        this.$el.html(this.template(this.iconclass));
        this.changeLanguage(language);
        $('#notation', this.el).css('padding-left', padding);
        return this;
    },

    changeLanguage: function(language) {
        if(this.iconclass != undefined && language != undefined) {
            //this.iconclass.CurrentLanguage = language;
            $('#label', this.el).text(this.iconclass.Labels[language]);
        }
        
    }
});

IconclassHierarchyView = IconclassLabelView.extend({
    events: {
        'click #notation' : 'changeSelectedIconclass',
    },

    changeSelectedIconclass: function(event) {
        event.preventDefault();
        this.trigger('changeSelectedIconclass', this.iconclass);
    },

    destroy: function() {
        this.unbind();
        this.remove();
    },
});

IconclassOptionsView = Backbone.View.extend({
    initialize: function(iconclass) {
        //console.log(iconclass);
        this.iconclass = iconclass;
        this.iconclassLabelView = new IconclassLabelView(iconclass);
    },

    events: {
        'click #notation' : 'toggleOptions',
        'click #more-emblems' : 'search'
    },

    render: function(padding) {
        this.$el.append(this.iconclassLabelView.render(padding).el);
        this.iconclass.Notation = this.iconclass.Notation.replace('+', '%2B');
        //console.log (this.iconclass);
        this.$el.append(this.template(this.iconclass));

        $('#browse', this.el).attr('href', 'browse/iconclass/' + 'en/' + this.iconclass.Notation);

        this.hideOptions();
        return this;
    },

    changeLanguage: function(language) {
        if(this.iconclass != undefined && language != undefined) {
            $('#browse', this.el).attr('href', 'browse/iconclass/' + language + '/' + this.iconclass.Notation);
            this.iconclassLabelView.changeLanguage(language);
        }
    
    },

    hideOptions: function() {
        $('.well', this.el).hide();
    },

    toggleOptions: function(event) {
        event.preventDefault();
        $('.well', this.el).toggle();
    },

    /*search: function(event) {
        event.preventDefault();
        router.navigate($(event.target).attr('href'), true);
    },*/

    destroy: function() {
        this.unbind();
        this.remove();
    }
});