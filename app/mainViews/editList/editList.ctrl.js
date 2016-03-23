(function(){

  angular.module("controllers")
  .controller("editListCtrl",ctrl);

  ctrl.$inject = ['$scope','backEndService','$stateParams','youtubePlayerService'];

  function ctrl($scope,backEndService,$stateParams,youtubePlayerService){
    var listId = $stateParams.id;
    $scope.currentContet = null; // current edited contet
    $scope.contents = null; // all contet items array
    $scope.newContent = false;

    backEndService.getContentOfAList(listId)
    .then(function(contents){
      $scope.contents = contents;
      var firstItemID = Object.keys(contents)[0];
      $scope.currentContet = contents[firstItemID];
      youtubePlayerService.currentContent =  $scope.currentContet;
      youtubePlayerService.loadVideo(youtubePlayerService.getVideoSettingFromAContent(contents[firstItemID]),"player");
    })

    $scope.loadContent = function(content){
      $scope.currentContet = content;
      youtubePlayerService.currentContent = $scope.currentContet;
      var settings = youtubePlayerService
      .getVideoSettingFromAContent(youtubePlayerService.currentContent);
      youtubePlayerService.loadVideo(settings);
    }

    $scope.saveNewContent = function(){
      $scope.currentContet.contentType = 'video';
      var isUpdate = false;
      ($scope.currentContet.id) ? isUpdate=true : $scope.currentContet.id = new Date().getTime();
      backEndService.saveContent(listId, $scope.currentContet)
      .then(function(newContent){
        $scope.newContent = false;
        if (!isUpdate){
          $scope.contents[Object.keys(newContent)[0].id] = angular.copy(newContent[Object.keys(newContent)[0]]);
          $scope.currentContet = $scope.contents[Object.keys(newContent)[0].id]
        }
        $scope.loadContent($scope.currentContet);

      })
    }

    $scope.createNewContent = function(){
      $scope.newContent = true;
      $scope.currentContet = {};//zero the currentContet object
      youtubePlayerService.removeVideo();
    }
  }



})();
