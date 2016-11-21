angular.module('jables_app').controller('EventDetailsCtrl', ['$scope', '$routeParams', 'Socialshare', 'JablesData', function ($scope, $routeParams, Socialshare, JablesData) {

    var eventId = $routeParams.eventId;

    $scope.pageUrl = window.location.href;

    function getEvent() {
        var eventsClass = Parse.Object.extend("Event");
        var query = new Parse.Query(eventsClass);
        query.get(eventId, {
            success: function (event) {
                $scope.event = event;
                var venue = event.get('venue')
                var entertainer = event.get('entertainer');
                var url = event.get('event_img') ? event.get('event_img').url() : undefined;
                var entertainerVid;
                $scope.event.venueTitle = venue.get('name');

                //If it is an entertainer event
                if (event.get('entertainer_event')) {
                    $scope.event.title = entertainer.get('name');
                    $scope.event.description = entertainer.get('description');
                    entertainerVid = entertainer.get('video_link');
                    if (url == undefined && entertainer.get('entertainer_img')) {
                        url = entertainer.get('entertainer_img').url();
                    }

                } else {
                    $scope.event.title = event.get('title');
                    $scope.event.description = event.get('description');
                }
                if (url == undefined) {
                    if (venue.get('profile_img'))
                        url = venue.get('profile_img').url();
                }
                /*
                    Set the image to the venue profile_img if neither event nor
                    entertainer has an image.
                */

                $scope.event.img_url = url;
                $scope.event.venueId = venue.id;
                $scope.event.city = venue.get('city');
                $scope.event.state = venue.get('state');
                $scope.event.category = event.get('category');
                $scope.event.promoted = event.get('promoted');
                $scope.event.pricesymbol = event.get('pricesymbol');
                $scope.event.start_date = event.get('start_date');
                $scope.event.price = event.get('price');
                $scope.event.pricesymbol = event.get('pricesymbol');
                if (event.get('video_link') != undefined && event.get('video_link') != 'undefined') {
                    $scope.event.video = {};
                    $scope.event.video.youtubelink = event.get('video_link');
                } else if (entertainerVid != undefined && entertainerVid != 'undefined') {
                    $scope.event.video.youtubelink = entertainervid;
                }
                document.title = 'Jables - ' + $scope.event.title;
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
    getEvent();
}]);