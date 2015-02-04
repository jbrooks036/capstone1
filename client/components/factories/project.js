(function(){
  'use strict';

  angular.module('capstone1')
  .factory('Project', ['$http', '$upload', function($http, $upload){

    function create(project){
      console.log('client-project-factory-create>>>>>>>>>>>>project: ', project);
      return $http.post('/projects', project);
    }

    function all(){
      return $http.get('/projects');
    }

    function findByProjectId(projectId){
      console.log('client-project-factory-findByProjectId >>>>>>>>>> projectId: ', projectId);
      return $http.get('/projects/' + projectId);
    }

    function addProjectWithFiles(project, files){
      // prevents errors if no file is selected
      var file = files ? files[0] : null;
      return $upload.upload({
        url: '/projects',
        method: 'POST',
        withCredentials: true,
        data: {project: project},
        file: file //,
      });
    }

    function updateProject(project, files){
      console.log('c-factory-projects-updateProject >>>>>>> project: ', project);
      console.log('c-factory-projects-updateProject >>>>>>> files: ', files);
      // prevents errors if no file is selected
      var file = files ? files[0] : null;
      return $upload.upload({
        url: '/projects/:id',
        method: 'PUT',
        withCredentials: true,
        data: {project: project},
        file: file
      });
    }

    function deleteProject(projectId){
      return $http.delete('/projects/'+ projectId);
    }

    return {all:all, create:create, deleteProject:deleteProject, findByProjectId:findByProjectId, updateProject:updateProject, addProjectWithFiles:addProjectWithFiles};
  }]);
})();

