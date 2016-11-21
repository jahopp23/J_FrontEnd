angular.module('jables_app').directive("jablesEventPanel", ['JablesData', function (JablesData) {
    return {
        restrict: "E",
        templateUrl: "js/directives/templates/jables-event-panel.html",
        scope: {
            event: "="
        },
        link: function (scope) {

            scope.setSelectedEvent = function () {
                JablesData.dataCache().setSelectedEvent(scope.event);
            }
        }
    }
}]);