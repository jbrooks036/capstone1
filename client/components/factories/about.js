(function(){
  'use strict';

  angular.module('capstone1')
  .factory('About', ['$http', function($http){

    function getMessage(){
      return $http.get('/about');
    }

    return {getMessage:getMessage};
  }]);
})();

