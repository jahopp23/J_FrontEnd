'use strict';


/**
 * @ngdoc overview
 * @name appApp
 * @description
 * # app
 *
 * Main module of the application.
 */

Parse.initialize(JABLES_KEYS.JABLES_PROD_DB_APP_ID, JABLES_KEYS.JABLES_PROD_DB_JS_KEY);
angular
    .module('jables_app', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngMessages',
    'mp.colorPicker',
    'ui.bootstrap',
    '720kb.socialshare'
  ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/partial/home.html',
                controller: 'HomeCtrl'
            })
            .when('/jables-tv', {
                templateUrl: 'views/partial/jables-tv.html',
                controller: 'JablesTVCtrl'
            })
            .when('/the-list', {
                templateUrl: 'views/partial/the-list.html',
                controller: 'TheListCtrl'
            })
            .when('/event-details/:eventId', {
                templateUrl: 'views/partial/event-details.html',
                controller: 'EventDetailsCtrl'
            })
            .when('/venue-details/:venueId', {
                templateUrl: 'views/partial/venue-details.html',
                controller: 'VenueDetailsCtrl'
            })
            .when('/search/:searchKey', {
                templateUrl: 'views/partial/event-search.html',
                controller: 'VenueSearchCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .filter('escape', function () {
        return window.encodeURIComponent;
    });