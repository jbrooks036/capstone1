(function(){
  'use strict';

  angular.module('capstone1')
  .factory('Project', ['$http', function($http){

    function create(project){
      return $http.post('/projects', project);
    }

    function all(){
      return $http.get('/projects').then(function(projectsResponse){
      //  return $http.get('/priorities').then(function(prioritiesResponse){
      var projects = projectsResponse.data.projects;
      console.log('factory all() >>>>>>>>> projects: ', projects);
/*
              // var priorities = prioritiesResponse.data.priorities;

          projects = projects.map(function(t){
            var priority = _.find(priorities, function(p){return p._id === t.priorityId;});
            t.priority = priority;
            return t;
          });

*/
          return projects;
   //     });
      });
    }

    return {create:create, all:all};
  }]);
})();
