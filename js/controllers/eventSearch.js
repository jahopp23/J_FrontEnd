angular.module('jables_app').controller('VenueSearchCtrl', ['$scope', '$routeParams', 'JablesData', function ($scope, $routeParams, JablesData) {
    var searchKey = $routeParams.searchKey;

    var no_events_message = 'Sorry! No events were found.';
    var searching_message = 'Searching ...';
    $scope.showSearchBar = true;
    $scope.message = searching_message;
    $scope.showNoEventsMsg = function () {
        if ($scope.events == undefined || $scope.events.length == 0) {
            return true
        } else {
            return false;
        }
    }

    function getEvents() {

        $scope.events = [];

        var venueClass = Parse.Object.extend("Venue");
        var entertainerClass = Parse.Object.extend("Entertainer");
        var eventClass = Parse.Object.extend("Event");

        //VENUE QUERIES
        var venueNameQuery = new Parse.Query(venueClass);
        venueNameQuery.contains('name', searchKey);
        var cityQuery = new Parse.Query(venueClass);
        cityQuery.contains("city", searchKey);
        var venueInnerQuery = Parse.Query.or(venueNameQuery, cityQuery);

        //ENTERTAINER QUERIES
        var entertainerNameQuery = new Parse.Query(entertainerClass);
        entertainerNameQuery.contains('name', searchKey);

        var entertainerDesQuery = new Parse.Query(entertainerClass);
        entertainerDesQuery.contains('description', searchKey);

        var entertainerInnerQuery = Parse.Query.or(entertainerNameQuery, entertainerDesQuery);

        //EVENT QUERIES
        var nameQuery = new Parse.Query(eventClass);
        nameQuery.contains("title", searchKey);
        var descriptionQuery = new Parse.Query(eventClass);
        descriptionQuery.contains("description", searchKey);
        var eventQuery = Parse.Query.or(nameQuery, descriptionQuery);

        //QUERY COMPOUNDS
        var venueQuery = new Parse.Query(eventClass);
        venueQuery.matchesQuery('venue', venueInnerQuery);

        var entertainerQuery = new Parse.Query(eventClass);
        entertainerQuery.matchesQuery('entertainer', entertainerInnerQuery);

        var query = Parse.Query.or(eventQuery, venueQuery, entertainerQuery);

        query.include("entertainer");
        query.include("venue");
        query.limit(10); // limit to at most 10 results

        query.find({
            success: function (results) {
                $scope.showSearchBar = false;
                if (results.length == 0) {
                    $scope.message = no_events_message;
                }
                for (var i = 0; i < results.length; i++) {
                    var event = results[i];

                    var title = event.get('title');
                    var url = event.get('event_img') ? event.get('event_img').url() : undefined;
                    var entertainer = event.get('entertainer');
                    var venue = event.get('venue');
                    if (venue == undefined) {
                        continue;
                    }
                    if (event.get('entertainer_event')) {
                        title = entertainer.get('name');
                        if (entertainer.get('entertainer_img'))
                            url = entertainer.get('entertainer_img').url();
                    }
                    if (url == undefined) {
                        if (venue.get('profile_img'))
                            url = venue.get('profile_img').url();
                    }
                    event.venueTitle = venue.get("name");
                    event.city = venue.get('city');
                    event.state = venue.get('state');
                    event.img_url = url;
                    event.title = title;
                    event.start_date = event.get('start_date');
                    event.pricesymbol = event.get('pricesymbol');
                    event.category = event.get('category');
                    event.promoted = event.get('promoted');
                    event.video = event.get('video_link');
                    $scope.events.push(event);
                }
                $scope.$apply();
            },
            error: function (error) {
                $scope.message = no_events_message;
                $scope.showSearchBar = false;
                $scope.$apply();
                console.log("Error: " + error.code + " " + error.message);
            }
        });
    }

    getEvents();

}]);