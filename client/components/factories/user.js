(function(){
  'use strict';

  angular.module('capstone1')
  .factory('User', ['$http', function($http){

    function register(user){
      return $http.post('/register', user);
    }

    function login(user){
      return $http.post('/login', user);
    }

    function logout(){
      console.log('client-user-factory-logout >>>>>>>>>>>');
      return $http.delete('/logout');
    }

    function all(){
      return $http.get('/users');
    }

    return {register:register, login:login, logout:logout, all:all};
  }]);
})();

