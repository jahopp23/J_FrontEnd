angular.module('jables_app').controller('TheListCtrl', ['$scope', 'JablesData', function ($scope, JablesData) {

    var eventResults = {};
    init();

    document.title = 'Jables List';

    function init() {

        $scope.optionsChanged = false;

        $scope.totalItems = 100;
        $scope.numItemsPerPage = 10;
        $scope.numPagesShown = 9;
        $scope.currentPage;
        $scope.dt;

        $scope.sortByList = {
            options: [
                {
                    name: JABLES_CONSTANTS.SORT_BY_CHOICES.DEFUALT
            }, {
                    name: JABLES_CONSTANTS.SORT_BY_CHOICES.LOWEST_PRICE
            }, {
                    name: JABLES_CONSTANTS.SORT_BY_CHOICES.HIGHEST_PRICE
            }, {
                    name: JABLES_CONSTANTS.SORT_BY_CHOICES.LOCATION
            }
        ],
            selected: {
                name: JABLES_CONSTANTS.SORT_BY_CHOICES.DEFUALT
            }
        };

        var no_events_message = 'Sorry! No events were found.';
        $scope.message = no_events_message;
        $scope.showNoEventsMsg = function () {
            if ($scope.eventList == undefined || $scope.eventList.length == 0) {
                return true
            } else {
                return false;
            }
        }

        JablesData.getEventCategories(function (error, results) {
            if (!error) {
                $scope.categoriesList = results;
                $scope.categoriesList.splice(0, 0, {
                    "name": "Default"
                });
                $scope.categoriesList = {
                    options: $scope.categoriesList,
                    selected: {
                        "name": "Default"
                    }
                }
                $scope.$apply();
            }
        });

        $scope.locationsList = {
            options: [
                {
                    name: "Dallas"
            }
        ],
            selected: {
                name: "Dallas"
            }
        };

        $scope.pricesList = {
            options: [
                {
                    name: JABLES_CONSTANTS.PRICE_CHOICES.ANY,
            },
                {
                    name: JABLES_CONSTANTS.PRICE_CHOICES.FREE,
            },
                {
                    name: JABLES_CONSTANTS.PRICE_CHOICES.DOLLAR_1,
            },
                {
                    name: JABLES_CONSTANTS.PRICE_CHOICES.DOLLAR_2,
            },
                {
                    name: JABLES_CONSTANTS.PRICE_CHOICES.DOLLAR_3,
            },
                {
                    name: JABLES_CONSTANTS.PRICE_CHOICES.DOLLAR_4,
            }
        ],
            selected: {
                name: "Any",
            }
        };


        $scope.price = {
            name: "Default"
        };


        var now = moment();
        var filter = {};
        var params = {
            'date': now.toDate(),
            'limit': 100,
            'skip': 0,
            //'searchStr':'symphony',
            'filter': filter
        };

        getEvents(params);

    }

    function getEvents(params) {
        eventResults = {};
        JablesData.getEventsData(params, function (error, results) {

            var numItemsPerPage = $scope.numItemsPerPage;

            var ary = [];

            for (var i = 0; i < results.length; i++) {
                var r = (i + 1) % numItemsPerPage;
                var e = results[i];
                ary.push({
                    id: e.id,
                    title: e.title,
                    venueTitle: e.venueTitle,
                    pricesymbol: e.pricesymbol,
                    img_url: e.img_url,
                    category: e.category,
                    description: e.description,
                    start_date: e.start_date,
                    promoted: e.promoted,
                    city: e.city,
                    state: e.state,
                    venueId: e.venueId
                });
                if (r == 0) {
                    var page = Math.floor((i + 1) / numItemsPerPage);
                    eventResults[page] = ary;
                    ary = [];
                }
            }

            if (ary.length) {
                eventResults[Math.floor((i + 1) / numItemsPerPage) + 1] = ary;
            }

            //Modify the pagination variables based on the result we got back
            $scope.totalItems = results.length;

            //Store the remaining items;
            $scope.eventList = eventResults[1];
            $scope.$apply();

        });
    }

    $scope.$watch('currentPage', function (n, o) {
        if (n) {
            $scope.eventList = eventResults[n];
        }
    });

    $scope.search = function () {

        $scope.optionsChanged = false;
        var priceAry = [];
        priceAry.push($scope.pricesList.selected.name);

        var allPrices = [];

        for (var index in $scope.pricesList.options) {
            var option = $scope.pricesList.options[index];
            allPrices.push(option.name);
        }

        var sort = $scope.sortByList.selected.name;
        var category = $scope.categoriesList.selected.name;

        var date = $scope.selectedDate;
        if (date != undefined) {
            date = date.name;
        }

        if (sort == "Lowest Price")
            sort = "lowest_price";
        else if (sort == "Highest Price")
            sort = "highest_price";
        else if (sort == "Location")
            sort = "location"; //TODO: need to get user geo coordinates
        else
            sort = "default";

        //        console.log('priceAry');
        //        console.log(priceAry);
        //        console.log('sort');
        //        console.log(sort);
        //        console.log('category');
        //        console.log(category);
        //        console.log('date');
        //        console.log(date);

        var now = moment();

        var filter = {
            'sort': sort
        };

        if ($scope.pricesList.selected.name == JABLES_CONSTANTS.PRICE_CHOICES.ANY) {
            filter.price = allPrices;
        } else {
            filter.price = priceAry;
        }
        if (category != undefined && category != JABLES_CONSTANTS.SORT_BY_CHOICES.DEFUALT) {
            filter.category = category
        }

        if (date != undefined) {
            var params = {
                'date': date,
                'limit': 100,
                'skip': 0,
                'filter': filter
            };
        } else {
            var params = {
                'date': now.toDate(),
                'limit': 100,
                'skip': 0,
                'filter': filter
            };
        }

        getEvents(params);

    };

}]);