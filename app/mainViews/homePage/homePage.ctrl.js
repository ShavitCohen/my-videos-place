(function(){

  angular.module("controllers")
  .controller("homePageCtrl",ctrl);

  ctrl.$inject = ['$scope','authenticationService','$state'];

  function ctrl($scope,authenticationService,$state){
    var ref = new Firebase("https://my-videos-place.firebaseio.com");

    var z = ref.getAuth();
    console.log(z);


    $scope.login = function(source){
      authenticationService.logIn(source)
      .then(function(user){
        authenticationService.currentUser = user;
        $state.go("editorPortal");
      })
    }
  }

})();
