(function(){
  'use strict';

  angular.module('capstone1')
  .controller('ProjectsCtrl', ['$scope', '$interval', '$location', 'Project', '$routeParams', function($scope, $interval, $location, Project, $routeParams){

    $scope.sort = 'name';
    $scope.project = {};
    $scope.projects = [];

    $scope.addProject = function(){
      console.log('client-projects.js >>>>>>>>>>');
      Project.create($scope.project).then(function(response){
      console.log('client-projects.js >>>>>>>>>> response: ', response);
        $scope.projects.push(response.data.project);
        $scope.project = {};
        $location.path('/projects');
      });
    };

    Project.all().then(function(response){
      console.log('client-controller-all >>>>>>>>>>>>response: ', response);
      console.log('client-controller-all >>>>>>>>>>>>$routeParams: ', $routeParams);
      $scope.projects = response.data.projects;
      console.log('client-controller-all >>>>>>>>>>>>$scope.projects: ', $scope.projects);
      if ($routeParams.projectId) {
        for (var i = 0; i < $scope.projects.length; i++) {
          if ($scope.projects[i]._id === $routeParams.projectId) {
              $scope.project = $scope.projects[i];
              break;
          }
        }
        console.log('client-controller-all >>>>>>>>>>>>$scope.project: ', $scope.project);
        $location.path('/projects/' + $scope.project._id);
      }
      // debugger;
    });

/*
    $scope.deleteProject = function(projectId){
      Show.deleteProject(projectId).then(function(response){
        $location.path('/projects');
      });
    };
*/


  }]);
})();


