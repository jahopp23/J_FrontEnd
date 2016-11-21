angular.module('jables_app').directive("jablesDropdown", function() {
    return {
        restrict: "E",
        templateUrl: "/js/directives/templates/jables-dropdown.html",
        scope: {
            placeholder: "@",
            list: "=",
            selected: "=",
            property: "@"
        },
        link: function(scope) {

            scope.listVisible = false;
            scope.isPlaceholder = true;

            scope.select = function(item) {
                scope.toggle();
                scope.isPlaceholder = false;
                scope.selected = item;
              };

              scope.isSelected = function(item) {
                if(scope && scope.property &&scope.selected){
                  var r = item[scope.property] === scope.selected[scope.property];
                  return r;
                }
                return false;
              };

              scope.toggle = function() {
                scope.listVisible = !scope.listVisible;
              };

              scope.$watch('selected', function() {
                scope.isPlaceholder = scope.selected[scope.property] === undefined;
                scope.display = scope.selected[scope.property];
              });

        }
    }
});