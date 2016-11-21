'use strict';

/**
 * @ngdoc function
 * @name app.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the app
 */
angular.module('jables_app').controller('HomeCtrl', ['$scope', '$sce', 'JablesData', function ($scope, $sce, JablesData) {

    $scope.homeModel = [];

    $scope.homeModel.featuredVideo = [];
    document.title = 'Jables';

    getNextSevenDaysEvents();
    getComingSoonEvents();

    JablesData.getJablesTV(function (err, results) {
        if (!err) {
            $scope.$apply(function () {
                $scope.homeModel.featuredVideo.push(results[Math.floor((Math.random() * 10) + 1) % results.length]);
                //console.log($scope.video);
            });
        }
    });


    function getNextSevenDaysEvents() {

        var now = moment();
        var sevenDaysFurther = moment(now).add(7, 'days');

        var filter = {
            'end_date': sevenDaysFurther.toDate()
        };

        var params = {
            'date': now.toDate(),
            'limit': 5,
            'skip': 0,
            'filter': filter
        };

        JablesData.getEventsData(params, function (error, results) {
            if (!error) {
                //console.log(results);
                $scope.homeModel.nextSevenDayEvents = results;
                $scope.$apply();
            } else {
                console.log(error);
            }
        });
    }


    function getComingSoonEvents() {
        var now = moment();
        var sevenDaysFurther = moment(now).add(7, 'days');
        var endDate = moment(now).add(30, 'days');

        var filter = {
            'end_date': endDate.toDate()
        };

        var params = {
            'date': sevenDaysFurther.toDate(),
            'limit': 5,
            'skip': 0,
            'filter': filter
        };

        JablesData.getEventsData(params, function (error, results) {
            if (!error) {
                //console.log(results);
                $scope.homeModel.comingSoonEvents = results;
                $scope.$apply();
            } else {
                console.log(error);
            }
        });
    }


}]);