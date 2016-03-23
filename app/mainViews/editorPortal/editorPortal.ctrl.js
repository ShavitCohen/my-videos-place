(function(){

  angular.module("controllers")
  .controller("editorPortalCtrl",ctrl);

  ctrl.$inject = ['$scope','backEndService'];

  function ctrl($scope,backEndService){

      backEndService.getUserLists()
      .then(function(lists){
        $scope.lists = lists;
      })

      $scope.createNewList = function(){
        var list = {
          name:"list name",
          description:"list description",
          topic:"my topic"
        }
        backEndService.createNewList(list)
        .then(function(newList){
          debugger;
        })
      }

  }

})();
