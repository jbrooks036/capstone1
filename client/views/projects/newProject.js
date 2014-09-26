(function(){
  'use strict';

  angular.module('capstone1')
  .controller('NewProjectCtrl', ['$scope', '$interval', '$location', '$routeParams', 'Project', function($scope, $interval, $location, $routeParams, Project){
    $scope.project = {};
    $scope.projects = [];

    $scope.add = function(){
      console.log('NewProjectCtrl-$scope.add >>>>>>>>> $scope.project', $scope.project);
      Project.create($scope.project).then(function(response){
        $scope.projects.push(response.data.project);
        $scope.project = {};
        $location.path('/projects');
      });
    };
  }]);
})();

