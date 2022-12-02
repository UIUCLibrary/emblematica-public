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

// for newberry experiment
function multiPix(show, hide) {
  // ***hide single image
  var oldRows = document.getElementById('detail').getElementsByClassName('row');
  oldRows[1].style.display = "none";  
  // *** toggle visibility of multi-image views
  var newRows = document.getElementById('schema').getElementsByClassName('row');
  newRows[show].style.display = "block" ;
  newRows[hide].style.display = "none" ;
}

function otherVersE (e1, e2) {
  var sideBar = document.getElementById('sidebar').getElementsByTagName('div')[0] ;
  var newDiv = document.createElement('div') ;
    newDiv.setAttribute("id", "otherVersions") ;
    newDiv.setAttribute("class", "well") ;
  var newSubDiv0 = document.createElement('div') ;
    newSubDiv0.setAttribute("style", "font-weight:bold;") ;
    newSubDiv0.appendChild(document.createTextNode("Other Versions")) ;
    newDiv.appendChild(newSubDiv0) ;
  var newSubDiv1 = document.createElement('div') ;
    newSubDiv1.setAttribute("style", "text-indent: 10%") ;
    var link1 = document.createElement('a') ;
    link1.setAttribute("href", "http://emblematica.library.illinois.edu/detail/emblem/E" + e1) ;
    link1.appendChild(document.createTextNode("Emblem" + " " + e1)) ;
    newSubDiv1.appendChild(link1) ;
    newDiv.appendChild(newSubDiv1) ;
  var newSubDiv2 = document.createElement('div') ;
    newSubDiv2.setAttribute("style", "text-indent: 10%") ;
    var link2 = document.createElement('a') ;
    link2.setAttribute("href", "http://emblematica.library.illinois.edu/detail/emblem/E" + e2) ;
    link2.appendChild(document.createTextNode("Emblem" + " " + e2)) ;
    newSubDiv2.appendChild(link2) ;
    newDiv.appendChild(newSubDiv2) ;
  sideBar.appendChild(newDiv) ;  
}

function otherCopiesB (b1, inst1, b2, inst2) {
  var sideBar = document.getElementById('sidebar').getElementsByTagName('div')[0] ;
  var newDiv = document.createElement('div') ;
    newDiv.setAttribute("id", "otherCopies") ;
    newDiv.setAttribute("class", "well") ;
  var newSubDiv0 = document.createElement('div') ;
    newSubDiv0.setAttribute("style", "font-weight:bold;") ;
    newSubDiv0.appendChild(document.createTextNode("Other Copies")) ;
    newDiv.appendChild(newSubDiv0) ;
  var newSubDiv1 = document.createElement('div') ;
    newSubDiv1.setAttribute("style", "text-indent: 10%") ;
    var link1 = document.createElement('a') ;
    link1.setAttribute("href", b1) ;
    link1.appendChild(document.createTextNode(inst1 + " Copy")) ;
    newSubDiv1.appendChild(link1) ;
    newDiv.appendChild(newSubDiv1) ;
  var newSubDiv2 = document.createElement('div') ;
    newSubDiv2.setAttribute("style", "text-indent: 10%") ;
    var link2 = document.createElement('a') ;
    link2.setAttribute("href", b2) ;
    link2.appendChild(document.createTextNode(inst2 + " Copy")) ;
    newSubDiv2.appendChild(link2) ;
    newDiv.appendChild(newSubDiv2) ;
  sideBar.appendChild(newDiv) ;  
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
