(function(){
  'use strict';

  angular.module('capstone1')
  .factory('Home', ['$http', function($http){

    function getMessage(){
      return $http.get('/users');
    }

    return {getMessage:getMessage};
  }]);
})();

