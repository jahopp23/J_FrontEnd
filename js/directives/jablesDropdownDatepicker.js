angular.module('jables_app').directive("jablesDropdownDatepicker", function() {
    return {
        restrict: "E",
        templateUrl: "/js/directives/templates/jables-dropdown-datepicker.html",
        scope: {
            ngModel: "="
        },
        link: function(scope) {
            scope.status = {
                opened: false
            };
            scope.maxDate = new Date(2029, 5, 22);
            scope.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
            };

            scope.open = function($event) {
                scope.status.opened = true;
                console.log("open");
            };
            scope.disabled = function(date, mode) {
                return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
            };

            scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            scope.format = scope.formats[0];

            scope.status = {
                opened: false
            };

            scope.$watch('dt', function(n,o){
                /*
                console.log('n');
                console.log(n);
                */

                scope.ngModel = n;
                //console.log(typeof scope.ngModel);
                var m = moment(scope.ngModel);
                /*
                console.log('m');
                console.log(m);
                */
            });

        }
    };

});