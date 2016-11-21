angular.module('jables_app').directive("jablesVideoPanel", function ($sce) {
    return {
        restrict: "E",
        templateUrl: "/js/directives/templates/jables-video-panel.html",
        scope: {
            videoObj: "="
        },
        link: function (scope) {
            scope.videoLink = "http://www.youtube.com/embed/" + scope.videoObj.youtubelink;
            //console.log(scope.videoLink);
            scope.videoLink = $sce.trustAsResourceUrl(scope.videoLink);
        }
    }

});