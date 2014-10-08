(function(){
  'use strict';

  angular.module('capstone1')
  .controller('LogoutCtrl', ['$location', 'User', function($location, User){
    console.log('inside LogoutCtrl>>>>>>>>>>>');
    User.logout().then(function(){
      toastr.success('Successful logout.');
      $location.path('/');
    });
  }]);
})();

