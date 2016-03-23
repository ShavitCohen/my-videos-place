(function(){

  angular.module("services")
  .service("authenticationService",service);

  service.$inject = ['backEndService'];

  function service(backEndService){

    var _service = {
      isAuthenticated:isAuthenticated,
      logIn:logIn,
      logOut:logOut,
      currentUser:null
    }

    return _service;

    function isAuthenticated(){
      return backEndService.isAuthenticated();
    }

    function logIn(source){
      return backEndService.logIn(source);
    }

    function logOut(){
      return backEndService.logOut(source);
    }
  }

})();
