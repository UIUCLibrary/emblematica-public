/*EmblemDetailView = Backbone.View.extend({
    id: 'detail',
    initialize: function() {
        _.bindAll(this, 'render');
        this.model.bind('change', this.render);
        this.iconclassViews = [];
        this.currentLanguage = 'en';
    },

    events : {
        'click #language a' : 'changeLanguage'
    },

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));

        var _this = this;
        $.ajax({
            url: '/spinetransform/emblem?url=' + this.model.get('SpineXML'),
            success: function(data) {
                $('#schema', _this.$el).html(data);
                _this.createIconclassOptions();
            }
        });
    },

    createIconclassOptions: function() {
        var _this = this;
        var notations = [];

        $('.iconclass').each(function() {
            notations.unshift($(this).text().replace('+', '%2B'));
            $(this).hide();
        });

        $.ajax({
            url: '/iconclass/api/getlabels?notations=' + notations.join('|'),
            success: function(data) {
                $.each(data, function(index, iconclass) {
                    //iconclass.CurrentLanguage = this.currentLanguage;
                    var iconclassOptionsView = new IconclassOptionsView(iconclass);
                    //var iconclassOptionsView = new IconclassOptionsView({model : iconclass});
                    _this.iconclassViews.push(iconclassOptionsView);
                    $('#descriptors', this.el).after(iconclassOptionsView.render().el);
                });
            }
        });
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
            for(var i = 0; i < this.iconclassViews.length; i++) {
                this.iconclassViews[i].changeLanguage(languageCode);
            }

            $('#btn-language', this.el).text(language);

            this.currentLanguage = languageCode;
        }
    }
});
*/

EmblemDetailView = Backbone.View.extend({
    id: 'detail',
    initialize: function() {
        _.bindAll(this, 'render');
        this.model.bind('change', this.render);
        this.iconclassViews = [];
        this.currentLanguage = 'en';
    },

    events : {
        'click #language a' : 'changeLanguage',
        'submit #anno-emblem-form' : 'addEmblemAnnotation',
        'submit #anno-motto-form' : 'addMottoAnnotation',
        'submit #anno-iconclass-form' : 'addIconclassAnnotation',
    },

    render: function() {
        //console.log (this.model.attributes);
        
        if (this.model.attributes.EmblemImageLink == null) {
            var newEmblemImageLink = this.model.attributes.SpineXML;
            var lastSlash = newEmblemImageLink.lastIndexOf("/");
            newEmblemImageLink = newEmblemImageLink.substring(0, lastSlash) + '/JPGthumbnail/emblem/' + newEmblemImageLink.substring( lastSlash+1);
            newEmblemImageLink = newEmblemImageLink.replace('.xml', '.jpg')
            console.log (newEmblemImageLink);
            this.model.attributes.EmblemImageLink = newEmblemImageLink; 
        }
        
        this.$el.html(this.template(this.model.toJSON()));

        var _this = this;
        $.ajax({
            url: '/spinetransform/emblem?url=' + this.model.get('SpineXML'),
            success: function(data) {
                $('#schema', _this.$el).html(data);

                /*var annoIC = ' <button class="font-14" type="button" data-toggle="modal" data-target="#anno-iconclass">' +
                            '<span class="glyphicon glyphicon-pencil"></span>' +
                            '</button>';

                $('#descriptors>#label', _this.$el).append(annoIC);

                var annoMotto = ' <button class="font-14" type="button" data-toggle="modal" data-target="#anno-transcription">' +
                            '<span class="glyphicon glyphicon-pencil"></span>' +
                            '</button>';

                $('#motto-transcriptions>#label', _this.$el).append(annoMotto);*/

                //_this.getAnnotations();
                _this.createIconclassOptions();
                _this.delegateEvents();
            }
        });
    },

    createIconclassOptions: function() {
        var _this = this;
        var notations = [];

        $('.iconclass').each(function() {
            notations.unshift($(this).text().replace('+', '%2B'));
            $(this).hide();
        });

        $.ajax({
            url: '/iconclass/api/getlabels?notations=' + notations.join('|'),
            success: function(data) {
                $.each(data, function(index, iconclass) {
                    // iconclass.CurrentLanguage = this.currentLanguage;
                    // console.log(iconclass);
                    var iconclassOptionsView = new IconclassOptionsView(iconclass);
                    //console.log(iconclassOptionsView);
                    //var iconclassOptionsView = new IconclassOptionsView({model : iconclass});
                    _this.iconclassViews.push(iconclassOptionsView);
                    $('#descriptors', this.el).after(iconclassOptionsView.render().el);
                });
            }
        });
    },

    createIconclassAnnotationOptions: function(notation) {
        var _this = this;

        $.ajax({
            url: '/iconclass/api/getlabels?notations=' + notation,
            success: function(data) {
                $.each(data, function(index, iconclass) {
                    //iconclass.CurrentLanguage = this.currentLanguage;
                    var iconclassOptionsView = new IconclassOptionsView(iconclass);
                    //var iconclassOptionsView = new IconclassOptionsView({model : iconclass});
                    _this.iconclassViews.push(iconclassOptionsView);
                    $('#descriptors', this.el).after(iconclassOptionsView.render().el);
                });
            }
        });
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
            for(var i = 0; i < this.iconclassViews.length; i++) {
                this.iconclassViews[i].changeLanguage(languageCode);
            }

            $('#btn-language', this.el).text(language);

            this.currentLanguage = languageCode;
        }
    },

    getAnnotations: function() {
        _this = this;
        $.ajax({
            url: "/EmblematicaAnnotation/api/wgannotations?target=" + window.location.href,
        }).done(function(data) {
            if(data.length > 0) {
                if( ! $('#related-emblems').length) {
                    $("#schema").append(
                        '<div class="row" >' +
                            '<div class="col-sm-12"><span class="font-20">Related Emblems:</span>' + '</div>' +
                            '<ul class="col-sm-11 col-sm-offset-1" id="related-emblems"></ul>' +
                        '</div>'
                    );
                }

                for(var i = 0; i < data.length; i++) {
                    $("#related-emblems").append(
                        '<li><a class="font-16"' + 'href="' + data[i].body + '"' + '>' + data[i].body + '</a></span>' + '</li>'
                    ); 
                }
            }
        }).error(function (xhr, ajaxOptions, thrownError) {
            alert("Error getting emblem annotations");
        });

        $.ajax({
            url: "/EmblematicaAnnotation/api/wgannotations?target=" + window.location.href + "/motto-transcriptions",
        }).done(function(result) {
            if(result.length > 0) {
                for(var i = 0; i < result.length; i++) {
                    $("#motto-transcriptions").append(
                    '<div class="font-16" property="s:hasPart" typeof="e:EmblemTextPart">' +
                        '<span property="e:emblemTextPartType" resource="http://emblematica.library.illinois.edu/schemas/emb/Motto"/>' +
                        '<div class="col-sm-3"><span property="s:inLanguage" content="' + result[i].language + '" class="indent">' + data.language[result[i].language] + ': </span></div>' +
                        '<div class="col-sm-9" property="s:text">' + result[i].body + '</div>' +
                    '</div>'
                ); 
                }
            }
        }).error(function (xhr, ajaxOptions, thrownError) {
            alert("Error getting motto annotations");
        });

        $.ajax({
            url: "/EmblematicaAnnotation/api/wgannotations?target=" + window.location.href + "/descriptors",
        }).done(function(result) {
            if(result.length > 0) {
                for(var i = 0; i < result.length; i++) {
                    /*$("#descriptors").append('<p class="iconclass ic-annotation" id="iconclass-' + (100 + i) + '" style="display: none;">' + 
                        result[i].body + '</p>');*/
                    _this.createIconclassAnnotationOptions(result[i].body);
                    /*$.ajax({
                        url: "/iconclass/api/getlabels?notations=" + result[i].body,
                    }).done(function(data) {
                       var label = data[0].Labels['en'];
                        $("#descriptors").after(
                            '<div>' + 
                                '<div>' +
                                  '<div class="col-sm-12">' +
                                    '<a id="notation" href="">' +
                                      '<span>' + data[0].Notation + ' - </span>' +
                                      '<span id="label">' + label + '</span>' +
                                      '<span class="caret"></span>' +
                                    '</a>' +
                                  '</div>' +
                                '</div>' +
                                '<div class="col-sm-6">' +
                                  '<div class="well" style="display: none;">' +
                                    '<ul>' +
                                      '<li><a id="more-emblems" href="search/emblems?query.notation=' + data[0].Notation + '"' +
                                          '>Find more emblems with this heading</a></li>' +
                                      '<li><a' +
                                          'href="http://www.virtuelles-kupferstichkabinett.de/index.php?vkk=&amp;vzk=&amp;reset=1&amp;subPage=search&amp;selTab=2&amp;habFilter=1&amp;haumFilter=1&amp;selFilter=0&amp;vkk_=1&amp;vzk_=1&amp;sKey1=iconclass&amp;indexPid1=&amp;indexpFunction_id1=0&amp;sKey2=volltext&amp;sWord2=&amp;indexPid2=&amp;indexpFunction_id2=0&amp;sKey3=volltext&amp;sWord3=&amp;indexPid3=&amp;indexpFunction_id3=0&amp;sWord1=' + notation + '"' +
                                          'target="_blank">Find VKK images with this heading</a></li>' +
                                      '<li><a' +
                                          'href="http://dbs.hab.de/cgi-bin/barock/feast.pl?m1=ICNotation&amp;m2=sw&amp;txtm2=&amp;txtm3=&amp;m3=&amp;m4=Schlagwort&amp;txtm4=&amp;m5=Schlagwort&amp;txtm5=&amp;m6=title&amp;txtm6=&amp;trunc=%25&amp;owner1=HAB&amp;owner2=BL&amp;limit=0&amp;Suchen=Search&amp;max_show=10&amp;txtm1=25G3(PALM-TREE)' + notation + '"' +
                                          'target="_blank">Find Festkultur images with this heading</a></li>' +
                                      '<li><a id="browse" href="browse/iconclass/en/' + data[0].Notation + '" target="_blank"' +
                                          '>Browse iconclass terms hierarchy</a></li>' +
                                    '</ul>' +
                                  '</div>' +
                                '</div>' +
                            '</div>'
                        );
                    });*/
                }
            }
        }).error(function (xhr, ajaxOptions, thrownError) {
            alert("Error getting iconclass annotations");
        });
    },

    addEmblemAnnotation: function(event) {
        //make sure emblem exists
        var emblem = $('#anno-emblem-form #link').val();

        $.ajax({
            url: "/api/Emblem/?id=" + emblem,
        }).done(function(data) {
            var link = 'http://emblematica.library.illinois.edu/detail/emblem/' + emblem;
            $.post( "/EmblematicaAnnotation/api/wgannotations",
                {
                    "body": link,
                    "target": window.location.href
                }
            ).done(function() {
                if( ! $('#related-emblems').length) {
                    $("#detail").append(
                        '<div class="row" >' +
                            '<div class="col-sm-12"><span class="font-20">Related Emblems:</span>' + '</div>' +
                            '<ul class="col-sm-11 col-sm-offset-1" id="related-emblems"></ul>' +
                        '</div>'
                    );
                }

                $("#related-emblems").append(
                    '<li><a class="font-16"' + 'href="' + link + '"' + '>' + link + '</a></span>' + '</li>'
                );
            }).error(function (xhr, ajaxOptions, thrownError) {
                alert("Error adding annotation");
            });
        }).error(function (xhr, ajaxOptions, thrownError) {
            alert("Emblem does not exist!");
        });
            
        event.preventDefault();
        $('#anno-emblem').modal('hide');
    },

    addMottoAnnotation: function(event) {
        var transcription = $('#anno-motto-form #transcription').val();
        var language = $('#anno-motto-form #language').find(":selected").text();
        var languageCode = $('#anno-motto-form #language').find(":selected").val();
        var isNormalized = $('#anno-motto-form #normalized').is(":checked");
        
        if(isNormalized) {
            language = language + " (Normalized)";
        }

        $.post( "/EmblematicaAnnotation/api/wgannotations",
                {
                    "body": transcription,
                    "language" : languageCode,
                    "target": window.location.href + "/motto-transcriptions"
                }
            ).done(function() {
                $("#motto-transcriptions").append(
                    '<div class="font-16" property="s:hasPart" typeof="e:EmblemTextPart">' +
                        '<span property="e:emblemTextPartType" resource="http://emblematica.library.illinois.edu/schemas/emb/Motto"/>' +
                        '<div class="col-sm-3"><span property="s:inLanguage" content="' + languageCode + '" class="indent">' + language + ': </span></div>' +
                        '<div class="col-sm-9" property="s:text">' + transcription + '</div>' +
                    '</div>'
                );
            }).error(function (xhr, ajaxOptions, thrownError) {
                alert("Error adding annotation");
            });
        
        event.preventDefault();
        $('#anno-transcription').modal('hide');
    },

    addIconclassAnnotation: function(event) {
        var notation = $('#anno-iconclass-form #notation').val().replace('+', '%2B');
        $.ajax({
            url: "/iconclass/api/getlabels?notations=" + notation,
        }).done(function(data) {
            if(data.length == 0) {
                alert("Invalid iconclass notation!");
            }
            else if(data.length > 1) {
                alert("Only 1 notation can be added at a time.");
            }
            else {
                $.post( "/EmblematicaAnnotation/api/wgannotations",
                {
                    "body": notation,
                    "target": window.location.href + "/descriptors"
                }
                ).done(function() {
                    _this.createIconclassAnnotationOptions(notation);
                    /*var label = data[0].Labels['en'];
                    $("#descriptors").after(
                        '<div>' + 
                            '<div>' +
                              '<div class="col-sm-12">' +
                                '<a id="notation" href="">' +
                                  '<span>' + notation + ' - </span>' +
                                  '<span id="label">' + label + '</span>' +
                                  '<span class="caret"></span>' +
                                '</a>' +
                              '</div>' +
                            '</div>' +
                            '<div class="col-sm-6">' +
                              '<div class="well" style="display: none;">' +
                                '<ul>' +
                                  '<li><a id="more-emblems" href="search/emblems?query.notation=' + notation + '"' +
                                      '>Find more emblems with this heading</a></li>' +
                                  '<li><a' +
                                      'href="http://www.virtuelles-kupferstichkabinett.de/index.php?vkk=&amp;vzk=&amp;reset=1&amp;subPage=search&amp;selTab=2&amp;habFilter=1&amp;haumFilter=1&amp;selFilter=0&amp;vkk_=1&amp;vzk_=1&amp;sKey1=iconclass&amp;indexPid1=&amp;indexpFunction_id1=0&amp;sKey2=volltext&amp;sWord2=&amp;indexPid2=&amp;indexpFunction_id2=0&amp;sKey3=volltext&amp;sWord3=&amp;indexPid3=&amp;indexpFunction_id3=0&amp;sWord1=' + notation + '"' +
                                      'target="_blank">Find VKK images with this heading</a></li>' +
                                  '<li><a' +
                                      'href="http://dbs.hab.de/cgi-bin/barock/feast.pl?m1=ICNotation&amp;m2=sw&amp;txtm2=&amp;txtm3=&amp;m3=&amp;m4=Schlagwort&amp;txtm4=&amp;m5=Schlagwort&amp;txtm5=&amp;m6=title&amp;txtm6=&amp;trunc=%25&amp;owner1=HAB&amp;owner2=BL&amp;limit=0&amp;Suchen=Search&amp;max_show=10&amp;txtm1=25G3(PALM-TREE)' + notation + '"' +
                                      'target="_blank">Find Festkultur images with this heading</a></li>' +
                                  '<li><a id="browse" href="browse/iconclass/en/' + notation + '" target="_blank"' +
                                      '>Browse iconclass terms hierarchy</a></li>' +
                                '</ul>' +
                              '</div>' +
                            '</div>' +
                        '</div>'
                    );*/
                }).error(function (xhr, ajaxOptions, thrownError) {
                    alert("Error adding annotation");
                });                //console.log($('#descriptors #language button').text().replace('Language : ', ''));
            }
        });
        
        event.preventDefault();
        $('#anno-iconclass').modal('hide');
    }
});