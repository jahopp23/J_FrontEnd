angular.module('jables_app').controller('VenueDetailsCtrl', ['$scope', '$routeParams', 'JablesData', function ($scope, $routeParams, JablesData) {



    var venueId = $routeParams.venueId;


    $scope.pageUrl = window.location.href;

    function getVenue() {
        var venueClass = Parse.Object.extend("Venue");
        var query = new Parse.Query(venueClass);
        query.get(venueId, {
            success: function (venue) {
                $scope.venue = venue;
                $scope.venue.title = venue.get('name');

                if (venue.get('city') != undefined) {
                    $scope.venue.city = venue.get('city');
                }
                if (venue.get('state') != undefined) {
                    $scope.venue.state = venue.get('state');
                }
                if (venue.get('profile_img') != undefined) {
                    $scope.venue.profile_img = venue.get('profile_img');
                }
                if (venue.get('street') != undefined) {
                    $scope.venue.street = venue.get('street');
                }
                if (venue.get('zip_code') != undefined) {
                    $scope.venue.zip_code = venue.get('zip_code');
                }
                if (venue.get('phone_number') != undefined) {
                    $scope.venue.phone_number = venue.get('phone_number');
                } else {
                    $scope.venue.phone_number = "Not Available"
                }

                if ($scope.venue.street != undefined && $scope.venue.zip_code != undefined && $scope.venue.city != undefined && $scope.venue.state != undefined) {
                    $scope.venue.address = $scope.venue.street + ', ' + $scope.venue.city + ', ' + $scope.venue.state + ' ' + $scope.venue.zip_code;
                }

                document.title = 'Jables - ' + $scope.venue.title;
                console.log(venue);
                $scope.$apply();
                //console.log($scope.event);
            },
            error: function (object, error) {
                // The object was not retrieved successfully.
                // error is a Parse.Error with an error code and message.
                console.log(error);
            }
        });
    }
    getVenue();


    function getEvents() {
        var now = moment();
        var eventClass = Parse.Object.extend("Event");
        var query = new Parse.Query(eventClass);
        query.limit(10); // limit to at most 10 results
        query.equalTo("venue", {
            __type: "Pointer",
            className: "Venue",
            objectId: venueId
        });
        query.greaterThanOrEqualTo("start_date", now.toDate());
        query.find({
            success: function (results) {
                console.log('I was here');
                console.log(results.length);
                $scope.venue.events = [];
                for (var i = 0; i < results.length; i++) {
                    var event = results[i];

                    var title = event.get('title');
                    var url = event.get('event_img') ? event.get('event_img').url() : undefined;
                    var entertainer = event.get('entertainer');
                    if (event.get('entertainer_event')) {
                        title = entertainer.get('name');
                        if (entertainer.get('entertainer_img'))
                            url = entertainer.get('entertainer_img').url();
                    }
                    if (url == undefined) {
                        if (venue.get('profile_img'))
                            url = venue.get('profile_img').url();
                    }
                    event.img_url = url;
                    event.title = title;
                    event.start_date = event.get('start_date');
                    event.pricesymbol = event.get('pricesymbol');
                    event.category = event.get('category');
                    event.promoted = event.get('promoted');
                    event.video = event.get('video_link');
                    $scope.venue.events.push(event);
                }
                $scope.$apply();
            },
            error: function (error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    }

    getEvents();

}]);