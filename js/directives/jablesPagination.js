angular.module('jables_app').directive("jablesPagination", function(){
    return {
        restrict: "E",
        templateUrl: "/js/directives/templates/jables-pagination.html",
        scope: {  
            totalItems: "=",
            numPagesShown: "=",
            numItemsPerPage: "=",
            currentPage: "="
        },
        link: function(scope,element) {

            var totalItems;
            var numItemsPerPage;
            var numPagesShown;
            var numPages;
            var numPagesOffset;

            scope.$watch('totalItems', function(newVal,oldVal){
                init();
            });

            scope.$watch('numPagesShown', function(){
                init();
            });

            scope.$watch('numItemsPerPage', function(){
                init();
            });

            function init(){
                totalItems = parseInt(scope.totalItems);
                numItemsPerPage = parseInt(scope.numItemsPerPage);
                numPagesShown = parseInt(scope.numPagesShown);
                numPages = Math.ceil(totalItems/numItemsPerPage); 
                numPagesOffset = 1;

                if(numPagesShown > numPages)
                    numPagesShown=numPages;

                if(isNaN(totalItems)){
                    throw new Error('total-items is not a number');
                }

                if(isNaN(numItemsPerPage)){
                    throw new Error('num-items-per-page is not a number');
                }

                if(isNaN(numPages)){
                    throw new Error('num-pages is not a number');
                }

                if(isNaN(numPagesShown)){
                    throw new Error('num-pages-shown is not a number');
                }
               
                scope.numAry = [];
                fillNumAry(0,numPagesShown);
                scope.currentPage = 1;
            }

          

            scope.prevPage = function(){

                if(scope.currentPage > 0){
                    scope.currentPage--;
                }

                if(scope.currentPage <= 0){
                    scope.currentPage = 1;
                }

                var previousPageEndIndex =   numPagesShown*(numPagesOffset - 1);

                if(scope.currentPage == previousPageEndIndex){
                    numPagesOffset--;
                    var previousPageStartIndex = numPagesShown*(numPagesOffset - 1);
                    fillNumAry(previousPageStartIndex,previousPageStartIndex+numPagesShown);
                }

            }

            scope.nextPage = function(){
                if(scope.currentPage < numPages)
                    scope.currentPage++;

                var newPagesStartIndex = numPagesShown*numPagesOffset;

                if(scope.currentPage > newPagesStartIndex){
                    numPagesOffset++;
                    var numIncrements = numPagesShown;

                    if(newPagesStartIndex+numIncrements > numPages){
                        numIncrements = numPages - newPagesStartIndex;
                    }

                    fillNumAry(newPagesStartIndex,newPagesStartIndex+numIncrements);

                }else if(scope.currentPage >= numPages){
                    scope.currentPage=numPages;
                }

            }

            scope.pageClick = function($event,index){
                for(var i in scope.numAry)
                    scope.numAry[i].isSelected = false;
                scope.numAry[index].isSelected = true;
                scope.currentPage = index+1;
            }

            function fillNumAry(start,end){
                scope.numAry = [];
                for(var i = start; i < end; i++){
                    scope.numAry.push({
                        value: (i+1),
                        isSelected:false
                    });
                } 
            }

        } 
    }
});