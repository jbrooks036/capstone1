(function(){
  'use strict';

  angular.module('capstone1')
  .controller('NewProjectCtrl', ['$scope', '$location', 'NewProject', 'Project', '$routeParams', function($scope, $location, NewProject, Project, $routeParams){
    $scope.newProject = {};
    $scope.projects = [];

    $scope.add = function(){
      console.log('NewProjectCtrl-$scope.add >>>>>>>>> $scope.newProject', $scope.newProject);
      NewProject.create($scope.newProject).then(function(response){
        $scope.projects.push(response.data.newProject);
        $scope.newProject = {};
        $location.path('/projects');
      });
    };
  }]);
})();

