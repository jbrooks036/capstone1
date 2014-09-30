(function(){
  'use strict';

  angular.module('capstone1')
  .controller('ProjectsCtrl', ['$scope', '$interval', '$location', 'Project', function($scope, $interval, $location, Project){
    $scope.sort = 'name';
    $scope.project = {};
    $scope.projects = [];

    // Priority.all().then(function(response){
    //   $scope.priorities = response.data.priorities;
    // });

    $scope.addProject = function(){
      console.log('client-projects.js >>>>>>>>>>');
      Project.create($scope.project).then(function(response){
      console.log('client-projects.js >>>>>>>>>> response: ', response);
        $scope.projects.push(response.data.project);
        $scope.project = {};
        $location.path('/projects');
      });
    };
/*
    Project.all().then(function(projects){
      console.log('Project.all() >>>>>>>>>> projects: ', projects);
      $scope.projects = projects;
    });
*/

    Project.all().then(function(response){
      console.log(response);
      $scope.projects = response.data.projects;
    });

  }]);
})();


