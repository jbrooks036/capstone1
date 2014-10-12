(function(){
  'use strict';

  angular.module('capstone1')
  .controller('HomeCtrl', ['$scope', '$interval', 'Home', function($scope, $interval, Home){
    Home.getMessage().then(function(response){
      $scope.msg = response.data;

    });
  }]);
})();

