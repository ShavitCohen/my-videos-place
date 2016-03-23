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
      console.log('$scope.contents: ' + JSON.stringify($scope.contents));
      var firstItemID = Object.keys(contents)[0];
      $scope.currentContet = contents[firstItemID];
      youtubePlayerService.currentContent =  $scope.currentContet;
      console.log('youtubePlayerService.currentContent: ' + youtubePlayerService.currentContent);
      youtubePlayerService.loadVideo(youtubePlayerService.getVideoSettingFromAContent(contents[firstItemID]),"player");
    })

    $scope.loadContent = function(content){
      console.log('content: ' + content);
      $scope.currentContet = content;
      youtubePlayerService.currentContent = $scope.currentContet;
      var settings = youtubePlayerService
      .getVideoSettingFromAContent(youtubePlayerService.currentContent);
      youtubePlayerService.loadVideo(settings);
    }

    $scope.saveNewContent = function(){
      $scope.currentContet.contentType = 'video';
      $scope.currentContet.id = new Date().getTime();
      //console.log('$scope.currentContet: ' + JSON.stringify($scope.currentContet));
      backEndService.createNewContent(listId, $scope.currentContet)
      .then(function(newContent){
        $scope.newContent = false;
        console.log('newContent: ' + JSON.stringify(newContent));
          console.log('Object.keys(newContent)[0]: ' + Object.keys(newContent)[0]);
        $scope.contents[Object.keys(newContent)[0].id] = angular.copy(newContent[Object.keys(newContent)[0]]);
        $scope.currentContet = $scope.contents[Object.keys(newContent)[0].id]
        $scope.loadContent($scope.currentContet);
      })
    }

    $scope.createNewContent = function(){
      $scope.newContent = true;
      $scope.currentContet = {};//zero the currentContet object
      youtubePlayerService.removeVideo();
    }
  /*
    $scope.$watch(function(){
      return $scope.currentContet.contentUrl;
    },function(newVal,oldVal){


    });
    */
  }



})();
