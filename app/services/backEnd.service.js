(function(){

  angular.module("services")
  .service("backEndService",service);

  service.$inject = ['$q'];

  function service($q){

    var _service = {
      init:init,

      currentAuth:null,
      isAuthenticated:isAuthenticated,
      logIn:logIn,
      logOut:logOut,

      createNewList:createNewList,
      getUserLists:getUserLists,
      // editList:editList,
      //
       getContentOfAList:getContentOfAList,
       createNewContent:createNewContent,
      // editContent:editContent,

      // sortContent:sortContent

    }

    var FIREBASE_URL = "https://my-videos-place.firebaseio.com";
    var _ref = null;

    return _service;

    function init(){
      if(!_ref){
        _ref = new Firebase(FIREBASE_URL);
      }
      _service.currentAuth = _ref.getAuth();
    }

    function logIn(source){

      var deferred = $q.defer();
      var scope  = source == 'github' ? 'user:email' : 'email'
      _ref.authWithOAuthPopup(source, _afterAuth,{scope:scope});

      function _afterAuth(error, authData) {
        if (error) {
          deferred.reject(error);
        } else {
          _service.currentAuth = authData;
          _retrieveUser(authData.uid)
          .then(function(userSnapshot){
            if(userSnapshot.exists()){
              deferred.resolve(userSnapshot.val());
            }else{
              var user = _setUser(authData);
              _saveUserToDB(user, authData.uid);
              deferred.resolve(user);
            }
          })

        }
        function _retrieveUser(uid){
          var deferred = $q.defer();

          _ref.child("users").child(uid).once("value", function(user) {
            deferred.resolve(user);
          },function(aa){

          });
          return deferred.promise;
        }


        function _setUser(authData){
          var provider = authData.provider;
          var user = {
            name:authData[provider].displayName,
            email:authData[provider].email,
            imageUrl:authData[provider].profileImageURL
          }
          return user;
        }

        function _saveUserToDB(user,uid){
          _ref.child("users").child(uid).set(user);
        }
      }

      return deferred.promise;
    }

    function logOut(){
      _ref.unauth();
    }

    function isAuthenticated(){

    }

    function createNewList(list){
      var deferred = $q.defer();

      var listId = new Date().getTime();
      var listToSend = {
        name:list.name,
        description:list.description,
        topic:list.topic,
        publish:false
      }
      _ref.child("users").child(_service.currentAuth.uid).child("lists").once("child_added", _afterAdd);
      _ref.child("users").child(_service.currentAuth.uid).child("lists").child(listId).set(listToSend);

      function _afterAdd(listSnapshot){
        var listObj = {};
        listObj[listId] = listSnapshot.val();
        deferred.resolve(listObj);
      }

      return deferred.promise;
    }

    function getUserLists(){

      var deferred = $q.defer();



      _ref.child("users").child(_service.currentAuth.uid).child("lists").once("value", function(listsSnapshot) {
        var val = {};
        if(listsSnapshot.exists()){
          val = listsSnapshot.val();
        }
        deferred.resolve(val);
      },function(err){

      });

      return deferred.promise;
    }

    function createNewContent(listId,content){
      var deferred = $q.defer();

      var contentId = content.id;//new Date().getTime();
      var contentToSend = {
        name:content.name,
        id:content.id,
        description:content.description,
        contentUrl:content.contentUrl,
        startTime:content.startTime,
        endTime:content.endTime,
        contentType:"video"
      }

      _ref.child("users").child(_service.currentAuth.uid).child("lists").child(listId).child("contents").once("child_added", _afterAdd);
      _ref.child("users").child(_service.currentAuth.uid).child("lists").child(listId).child("contents").child(contentId).set(contentToSend);

      function _afterAdd(contentSnapshot){
        var contentObj = {};
        contentObj[contentId] = contentSnapshot.val();
        deferred.resolve(contentObj);
      }

      return deferred.promise;
    }

    function getContentOfAList(listId){

      var deferred = $q.defer();

      _ref.child("users").child(_service.currentAuth.uid).child("lists").child(listId).child("contents")
      .once("value", function(contentSnapshot) {
        var val = {};
        if(contentSnapshot.exists()){
          val = contentSnapshot.val();
        }
        deferred.resolve(val);
      },function(err){

      });

      return deferred.promise;
    }



  }

})();
