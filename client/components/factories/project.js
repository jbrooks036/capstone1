(function(){
  'use strict';

  angular.module('capstone1')
  .factory('Project', ['$http', '$upload', function($http, $upload){

    function create(project){
      console.log('client-factory-create>>>>>>>>>>>>project: ', project);
      return $http.post('/projects', project);
    }

    function all(){
      return $http.get('/projects');
    }

    function addProjectWithFiles(project, files){
      var file = files ? files[0] : null;
      return $upload.upload({
        url: '/projects',
        method: 'POST',
        //headers: {'header-key': 'header-value'},
        withCredentials: true,
        data: {project: project},
        file: file,
        fileName: 'doc.jpg' // or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
        // customize file formData name ('Content-Disposition'), server side file variable name.
        //fileFormDataName: myFile, //or a list of names for multiple files (html5). Default is 'file'
        // customize how data is added to formData. See #40#issuecomment-28612000 for sample code
        //formDataAppender: function(formData, key, val){}
      });
      // access or attach event listeners to the underlying XMLHttpRequest
      // .xhr(funtion(xhr){xhr.upload.addeventListener(...)})
    }

    /*
    function show(projectId){
      console.log('client-factory-show >>>>>>>>>> projectId: ', projectId);
      return $http.get('/projects/' + projectId);
    }
    */

    return {all:all, create:create, addProjectWithFiles:addProjectWithFiles};
  }]);
})();

