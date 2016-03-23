(function(){
  angular.module('controllers', []);
  angular.module('services', []);
  angular.module('directives', []);

  angular.module('videosListApp', [
      'controllers',
      'services',
      'directives',
      'ngAnimate',
      'ui.router'
    ]);

    angular.module('videosListApp').run(run);
    run.$inject = ['backEndService'];
    function run(backEndService){
      backEndService.init();    
    }

})();
