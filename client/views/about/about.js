(function(){
  'use strict';

  angular.module('capstone1')
  .controller('AboutCtrl', ['$scope', '$interval', 'About', function($scope, $interval, About){
    About.getMessage().then(function(response){
      $scope.msg = response.data.msg;

      $interval(function(){
        $scope.msg = _.shuffle($scope.msg);
      }, 500);

    });
  }]);
})();

