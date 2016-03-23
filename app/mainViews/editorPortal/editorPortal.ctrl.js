(function(){

  angular.module("controllers")
  .controller("editorPortalCtrl",ctrl);

  ctrl.$inject = ['$scope','backEndService','$state'];

  function ctrl($scope,backEndService,$state){

      backEndService.getUserLists()
      .then(function(lists){
        $scope.lists = lists;
      })

      $scope.newListData = {
        name:null,
        description:null,
        topic:null
      }

      $scope.createNewList = function(list){

        backEndService.createNewList(list)
        .then(function(newList){
          var listId = Object.keys(newList)[0];
          $state.go('editList',{id:listId});
        })
      }

  }

})();
