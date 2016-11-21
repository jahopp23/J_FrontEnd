/*
  https://www.codementor.io/angularjs/tutorial/create-dropdown-control
*/
angular.module('jables_app').directive("jablesDropdownCheckbox", function() {
    
    return {
        restrict: "E",
        templateUrl: "/js/directives/templates/jables-dropdown-checkbox.html",
        scope: {
            placeholder: "@",
            list: "=",
        },
        link: function(scope) {

            scope.listVisible = false;
            scope.isPlaceholder = true;

            scope.select = function(item) {
                scope.toggle();
                scope.isPlaceholder = false;
                scope.selected = item;
            };

            scope.toggle = function() {
              scope.listVisible = !scope.listVisible;
            };

        }
    }

});
