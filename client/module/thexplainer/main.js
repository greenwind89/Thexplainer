'use strict';

// Declare app level module which depends on views, and components
angular.module('thexplainer', [
  'ngRoute',
  'user',
  'subtitle',
  'duScroll',
  'ngFileUpload',
  'ngResource',
  'ui.bootstrap'
]).
config(['$routeProvider', '$tooltipProvider', function($routeProvider, $tooltipProvider) {
  $routeProvider.
    when('/mainboard', {
      templateUrl: 'template/thexplainer/mainboard.html',
      controller: 'thexplainer.mainboardCtrl'
    });

  $tooltipProvider.setTriggers({'open': 'close'});
}])
.run([function() {
}]);

