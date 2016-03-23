(function(){

  angular.module('videosListApp')
  .config(config);
  config.$inject = ['$stateProvider','$urlRouterProvider'];

  function config($stateProvider,$urlRouterProvider){

    $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "mainViews/homePage/homePage.tpl.html",
      controller: "homePageCtrl"
    })
    .state('editorPortal', {
      url: "/editorPortal",
      templateUrl: "mainViews/editorPortal/editorPortal.tpl.html",
      controller: "editorPortalCtrl"
    })
    .state('editList', {
      url: "/editList/:id",
      templateUrl: "mainViews/editList/editList.tpl.html",
      controller:"editListCtrl"
    })
    .state('watch', {
      url: "/watch/:id",
      templateUrl: "mainViews/watch/watch.tpl.html",
      controller: "watchCtrl"
    });

    $urlRouterProvider.when('', '/');
  }

})();
