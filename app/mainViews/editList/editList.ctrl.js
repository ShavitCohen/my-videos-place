(function(){

  angular.module("controllers")
  .controller("editListCtrl",ctrl);

  ctrl.$inject = ['$scope','backEndService','$stateParams','youtubePlayerService'];

  function ctrl($scope,backEndService,$stateParams,youtubePlayerService){
    var listId = $stateParams.id;
    backEndService.getContentOfAList(listId)
    .then(function(contents){
      $scope.contents = contents;
      var firstItemID = Object.keys(contents)[0];
      youtubePlayerService.currentContent = contents[firstItemID];
      youtubePlayerService.loadVideo(youtubePlayerService.getVideoSettingFromAContent(contents[firstItemID]),"player");
    })

    $scope.loadContent = function(contentId){
      youtubePlayerService.currentContent = $scope.contents[contentId];
      var settings = youtubePlayerService.getVideoSettingFromAContent(youtubePlayerService.currentContent);
      youtubePlayerService.loadVideo(settings);
    }

    $scope.createNewContent = function(){
      var content = {
        name:"my new video",
        description:"my new video rocks",
        contentUrl:"https://www.youtube.com/watch?v=6LNpGsYpWJw",
        startTime:5,
        endTime:25,
        contentType:"video"
      }
      backEndService.createNewContent(listId, content)
      .then(function(newContent){

      })
    }
  }

})();
