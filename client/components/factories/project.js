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
      var file = files ? files[0] : null;
      return $upload.upload({
        url: '/projects',
        method: 'POST',
        //headers: {'header-key': 'header-value'},
        withCredentials: true,
        data: {project: project},
        file: file //,
        // fileName: 'doc.docx' // or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
        // customize file formData name ('Content-Disposition'), server side file variable name.
        //fileFormDataName: myFile, //or a list of names for multiple files (html5). Default is 'file'
        // customize how data is added to formData. See #40#issuecomment-28612000 for sample code
        //formDataAppender: function(formData, key, val){}
      });
      // access or attach event listeners to the underlying XMLHttpRequest
      // .xhr(funtion(xhr){xhr.upload.addeventListener(...)})
    }

    function deleteProject(projectId){
      return $http.delete('/projects/'+ projectId);
    }

    function updateProject(project, files){
      console.log('c-factory-projects-updateProject >>>>>>> project: ', project);
      console.log('c-factory-projects-updateProject >>>>>>> files: ', files);
      // prevents errors if no file is selected
      var file = files ? files[0] : null;
      return $upload.upload({
        url: '/projects/:id',
        method: 'POST',
        withCredentials: true,
        data: {project: project},
        file: file //,
        // fileName: 'doc.jpg'
      });
    }

    return {all:all, create:create, deleteProject:deleteProject, findByProjectId:findByProjectId, updateProject:updateProject, addProjectWithFiles:addProjectWithFiles};
  }]);
})();

