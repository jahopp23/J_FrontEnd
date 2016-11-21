angular.module('jables_app').controller('JablesTVCtrl', ['$scope', '$sce', 'JablesData', function ($scope, $sce, JablesData) {


    //    $scope.frameURLs = [
    //          $sce.trustAsResourceUrl("http://www.youtube.com/embed/XGSy3_Czz8k"),
    //          $sce.trustAsResourceUrl("https://www.youtube.com/embed/gDUFvLWl-Oc")
    //        ];

    $scope.jablesTVModel = {};

    document.title = 'Jables TV';

    JablesData.getJablesTV(function (err, results) {
        if (!err) {
            $scope.$apply(function () {
                $scope.jablesTVModel.videos = results;
            });

        }
    });

}]);