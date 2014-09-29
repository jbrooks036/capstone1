(function(){
  'use strict';

  angular.module('capstone1')
  .factory('NewProject', ['$http', function($http){

    function create(newProject){
      console.log('factory newProject - create() >>>>>>>>> newProject: ', newProject);
      return $http.post('/projects/new', newProject);
    }

    return {create:create};
  }]);
})();

