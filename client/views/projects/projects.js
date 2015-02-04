(function(){
  'use strict';

  angular.module('capstone1')

  .filter('ignoreSelf', function(){
    // debugger;
    return function(items, ignore){
      var filtered = [];
      // console.log('Client-projects.js/.filter >>>>>>>>>>>>>>items: ', items);
      // console.log('Client-projects.js/.filter >>>>>>>>>>>>>>ignore: ', ignore);
      if (items){
        items.forEach(function(item){
          if (item.email !== ignore){
            filtered.push(item);
          }
        });
      }
      return filtered;
    };
  })

  .controller('ProjectsCtrl', ['$scope', '$upload', '$location', '$window', '$localForage', 'Project', 'User', '$routeParams',
    function($scope, $upload, $location, $window, $localForage, Project, User, $routeParams){

    // set $scope's
    $localForage.getItem('email').then(function(email){
      $scope.email = email; //** the getItem is async, and execution proceeds before assignment(!)
    });

    $scope.sort = 'name';
    $scope.project = {};
    $scope.projects = [];
    User.all().then(function(response){
      $scope.users = response.data.users;
      console.log('client-controller >>>>>>>>>>>>>>>>>> $scope.users: ', $scope.users);
    });

    // set up for Index of Projects
    Project.all().then(function(response){
      $scope.projects = response.data.projects;
      console.log('client-controller-all >>>>>>>>>>>>$scope.projects: ', $scope.projects);

      // for each project in all of user's projects:
      for (var i = 0; i < $scope.projects.length; i++) {
        // debugger;

        // replace researchers [array of user ids] with [array of user objects] -- to support display of login emails
        console.log('client-controller-all >>>>>>>>>>>>$scope.projects[i]: ', $scope.projects[i]);
        for (var j=0; j < $scope.projects[i].researchers.length; j++) {
          // console.log('$scope.projects[i].researchers[j] -------- ', $scope.projects[i].researchers[j]);
          if ($scope.projects[i].researchers[j].userId !== $scope.projects[i].currUserId){
            var collabId = $scope.projects[i].researchers[j].userId;
            for (var k=0; k < $scope.users.length; k++) {
              if ($scope.users[k]._id === collabId) {

                $scope.projects[i].collaborator = $scope.users[k];
                // console.log('$scope.projects[i].name: -------- ', $scope.projects[i].name);
                // console.log('$scope.projects[i].collaborator: -------- ', $scope.users[k]);
              }
            }
          }
        }

        // set up for Show Project
        console.log('client-controller-all >>>>>>>>>>>>$routeParams: ', $routeParams);
        if ($routeParams.projectId) {
          if ($scope.projects[i]._id === $routeParams.projectId) {
            $scope.project = $scope.projects[i];
            // console.log('setup for ShowProject, $scope.project: ', $scope.project);
            // console.log('client-controller-all - s >>>>>>>>>>>>>>>>>> $scope.email: ', $scope.email);
            break;
          }
        }
      }

        if ($routeParams.projectId) {
          // console.log('client-controller-all >>>>>>>>>>>>$routeParams2**: ', $routeParams);
          console.log('client-controller-all >>>>>>>>>>>>$scope1: ', $scope);
          $location.path('/projects/' + $scope.project._id);
          console.log('client-controller-all >>>>>>>>>>>>$scope2: ', $scope);
      }
      // debugger;
    });


    // Add New Project
    $scope.addProject = function(){
      console.log('client-projects-controller-addProject >>>>>>>>>>$scope.project: ', $scope.project);
      console.log('client-projects-controller-addProject >>>>>>>>>>$scope.files: ', $scope.files);
      Project.addProjectWithFiles($scope.project, $scope.files).then(function(response){
      console.log('client-projects-controller-addProject >>>>>>>>>> response: ', response);
        $scope.project = response.data.project;
        $scope.projects.push($scope.project);
        $scope.project = {};
        $location.path('/projects');
      });
    };

    $scope.onFileSelect = function($files){
      $scope.files = $files;
    };

    // set up for Update Project (on Show page)
    $scope.toggleProject = function(){
      console.log('$scope.project>>>>>', $scope.project);
      $scope.showProject = !!!$scope.showProject;
    };

    $scope.update = function(){
      console.log('c-projects-controller-update >>>>>>>>>> $scope.project: ', $scope.project);
      console.log('c-projects-controller-update >>>>>>>>>> $scope.files: ', $scope.files);
      Project.updateProject($scope.project, $scope.files).then(function(response){
      console.log('c-projects-controller-update >>>>>>>>>> response:  ', response);
        $scope.toggleProject();
        // reload page so that updated doc, date, etc are displayed??
        $window.location.reload();
      });
    };

    $scope.deleteProject = function(projectId){
      Project.deleteProject(projectId).then(function(response){
        $location.path('/projects');
      });
    };

  }]);
})();


