// code from: https://github.com/ccoenraets/backbone-directory/blob/master/web/js/utils.js
templateLoader = {
    load: function(views, callback) {

        var deferreds = [];

        $.each(views, function(index, view) {
            //console.log(window[view]);
            if (window[view]) {
                deferreds.push($.get('app/html/tpl/' + view + '.html', function(data) {
                    window[view].prototype.template = _.template(data, {});
                }, 'html'));
            } else {
                console.log(view + ' not found');
            }
        });

        $.when.apply(null, deferreds).done(callback);
    }
};

// code from: http://stackoverflow.com/questions/5505085/flatten-a-javascript-object-to-pass-as-querystring
// edited for nested objects
function encodeObjectToURL(obj, prefix) {
    var parts = [];
    for (var i in obj) {
        if (obj.hasOwnProperty(i) && obj[i] != null) {
            if(obj[i] !== null && typeof obj[i] === 'object') {
                parts.push(encodeObjectToURL(obj[i], i))
            }
            else {
                if(prefix != null) {
                    parts.push(prefix + '.' + encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
                }
                else {
                    parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
                }
            }
        }
    }
    return parts.join("&");
}

// delete view
Backbone.View.prototype.close = function(){
    this.remove();
    this.unbind();
}

// delegate events for current view and its child views
Backbone.View.prototype.delegateAllEvents = function() {
    this.delegateEvents();

    if(this.childViews != undefined) {
        for(var i = 0; i < this.childViews.length; i++) {
            this.childViews[i].delegateAllEvents();
        }
    }
}
