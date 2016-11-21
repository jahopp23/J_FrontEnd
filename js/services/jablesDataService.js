angular.module('jables_app').service('JablesData', function ($sce) {

    var selectedEventDetails = {};
    this.dataCache = function () {
        function setSelectedEvent(data) {
            selectedEventDetails = data;
        }

        function getSelectedEvent() {
            return selectedEventDetails;
        }

        return {
            setSelectedEvent: setSelectedEvent,
            getSelectedEvent: getSelectedEvent
        };
    }

    this.getEventCategories = function (callback) {
        if (typeof callback != 'function')
            throw new Error('callback is not a function');

        var EventCategories = Parse.Object.extend('EventCategories');
        var query = new Parse.Query(EventCategories);

        query.find({
            success: function (results) {
                var modifiedResults = [];
                for (var i = 0; i < results.length; i++) {
                    var name = results[i].get('name');
                    modifiedResults.push({
                        name: name
                    });
                }
                callback(undefined, modifiedResults);
            },
            error: function (error) {
                callback(error, undefined);
            }
        });
    };

    this.getJablesTV = function (callback) {

        if (typeof callback != 'function')
            throw new Error('callback is not a function');

        var JablesTV = Parse.Object.extend('JablesTV');
        var query = new Parse.Query(JablesTV);

        query.find({
            success: function (results) {
                var modifiedResults = [];
                for (var i = 0; i < results.length; i++) {
                    var v = results[i];
                    modifiedResults.push({
                        title: v.get('title'),
                        youtubelink: v.get('youtubelink'),
                        description: v.get('description')
                    });
                }
                callback(undefined, modifiedResults);
            },
            error: function (error) {
                callback(error, undefined);
            }
        });
    };

    this.getEventsData = function (params, callback) {

        if (!params || !params.filter)
            throw new Error('params must not be empty');
        if (callback && typeof callback != 'function')
            throw new Error('callback is not a function');

        Parse.Cloud.run('events', params, {
            success: function (results) {

                var modifiedResults = [];
                for (var i = 0; i < results.length; i++) {
                    var obj = results[i];
                    var id = obj.id;
                    var venue = obj.get('venue')
                    var entertainer = obj.get('entertainer');

                    var url = obj.get('event_img') ? obj.get('event_img').url() : undefined;

                    var title = obj.get('title');

                    var venueTitle = venue.get('name');

                    //If it is an entertainer event
                    if (obj.get('entertainer_event')) {
                        title = entertainer.get('name');
                        id = entertainer.id;
                        if (entertainer.get('entertainer_img'))
                            url = entertainer.get('entertainer_img').url();
                    }

                    /*
                        Set the image to the venue profile_img if neither event nor
                        entertainer has an image.
                    */
                    if (!url) {
                        if (venue.get('profile_img'))
                            url = venue.get('profile_img').url();
                    }

                    var city = venue.get('city');
                    var state = venue.get('state');


                    modifiedResults.push({
                        'id': id,
                        'category': obj.get('category'),
                        'title': title,
                        'venueTitle': venueTitle,
                        'venueId': venue.id,
                        'promoted': obj.get('promoted'),
                        'pricesymbol': obj.get('pricesymbol'),
                        'start_date': obj.get('start_date'),
                        'price': obj.get('price'),
                        'pricesymbol': obj.get('pricesymbol'),
                        'description': obj.get('description'),
                        'video': obj.get('video_link'),
                        'city': city,
                        'state': state,
                        'img_url': url
                    });
                }

                callback(undefined, modifiedResults);

            },
            error: function (error) {
                callback(error, undefined);
            }
        });

    };


    function printObject(obj) {
        var str = obj.id + ' ' + obj.get('category') + ' ' + obj.get('title') + ' ' + obj.get('promoted') + ' ' + ' ' + obj.get('pricesymbol') + ' ' + obj.get('start_date') + ' ' + obj.get('price') + ' ' + obj.get('pricesymbol');

        // console.log(str);
    };
});