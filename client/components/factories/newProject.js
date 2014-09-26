(function(){
  'use strict';

  angular.module('capstone1')
  .factory('newProject', ['$http', function($http){

    function create(project){
      console.log('factory newProject - create() >>>>>>>>> project: ', project);
      return $http.post('/projects/new', project);
    }

    return {create:create};
  }]);
})();

