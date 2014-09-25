(function(){
  'use strict';

  angular.module('capstone1')
  .controller('ProjectsCtrl', ['$scope', '$interval', 'Project', function($scope, $interval, Project){
    $scope.sort = 'name';
    $scope.project = {};
    $scope.projects = [];

    // Priority.all().then(function(response){
    //   $scope.priorities = response.data.priorities;
    // });

    Project.all().then(function(projects){
      console.log('Project.all() >>>>>>>>>> projects: ', projects);
      $scope.projects = projects;
    });

    $scope.add = function(){
      Project.create($scope.project).then(function(response){
        $scope.projects.push(response.data.project);
        $scope.project = {};
      });
    };
  }]);
})();


