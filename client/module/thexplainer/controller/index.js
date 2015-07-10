'use strict';

angular.module('thexplainer').controller('thexplainer.indexCtrl', ['$scope', 'user.profileService', '$location', function($scope, Profile, $location) {
  $scope.user = Profile.get(function(user){
    if(!user._id) {
      window.location.href = '/public/login.html';
    } else {
      // $location.path('/mainboard');
      $location.path('/mainboard');
      // $location.path('/planboard');
      // $location.path('/brainstormingboard');
    }
  });
}]);
