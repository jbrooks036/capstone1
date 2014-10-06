(function(){
  'use strict';

  angular.module('capstone1')
  .factory('Project', ['$http', function($http){

    function create(project){
      console.log('client-factory-create>>>>>>>>>>>>project: ', project);
      return $http.post('/projects', project);
    }

    function all(){
      return $http.get('/projects');
    }

    /*
    function show(projectId){
      console.log('client-factory-show >>>>>>>>>> projectId: ', projectId);
      return $http.get('/projects/' + projectId);
    }
    */

    return {all:all, create:create};
  }]);
})();

