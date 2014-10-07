(function(){
  'use strict';

  angular.module('capstone1')
  .controller('ProjectsCtrl', ['$scope', '$upload', '$location', 'Project', '$routeParams', function($scope, $upload, $location, Project, $routeParams){

    $scope.sort = 'name';
    $scope.project = {};
    $scope.projects = [];

    // set up for Add Project
    $scope.addProject = function(){
      console.log('client-projects.js >>>>>>>>>>');
      // Project.create($scope.project).then(function(response){
      Project.addProjectWithFiles($scope.project, $scope.files).then(function(response){
      console.log('client-projects.js >>>>>>>>>> response: ', response);
        $scope.project = response.data.project;
        $scope.projects.push($scope.project);
        $scope.project = {};
        $location.path('/projects');
      });
    };

    $scope.onFileSelect = function($files){
      $scope.files = $files;
    };

    // set up for Index of Projects
    Project.all().then(function(response){
      console.log('client-controller-all >>>>>>>>>>>>response: ', response);
      console.log('client-controller-all >>>>>>>>>>>>$routeParams: ', $routeParams);
      $scope.projects = response.data.projects;
      console.log('client-controller-all >>>>>>>>>>>>$scope.projects: ', $scope.projects);

      // set up for Show Project
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

    // set up for Update Project (on Show page)
    $scope.toggleProject = function(){
      $scope.showProject = !!!$scope.showProject;
    };

    $scope.update = function(){
      Project.updateProject($scope.project, $scope.files).then(function(response){
        $scope.toggleProject();
        // reload page so that updated photo is displayed
        // $window.location.reload();
      });
    };



/*
    $scope.deleteProject = function(projectId){
      Show.deleteProject(projectId).then(function(response){
        $location.path('/projects');
      });
    };
*/


  }]);
})();


