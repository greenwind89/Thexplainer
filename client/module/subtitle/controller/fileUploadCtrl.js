'use strict';

angular.module('subtitle').controller('subtitle.fileUploadCtrl', ['$scope', 'Upload', '$timeout', function($scope, Upload, $timeout) {
  $scope.$watch('files', function () {
    $scope.upload($scope.files);
  });

  $scope.log = '';

  $scope.upload = function (files) {
    if (files && files.length) {
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        Upload.upload({
          url: '/subtitle',
          file: file
        }).progress(function (evt) {
          console.log('progressh');
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          $scope.log = 'progress: ' + progressPercentage + '% ' +
                      evt.config.file.name + '\n' + $scope.log;
        }).success(function (data, status, headers, config) {
          $timeout(function() {
              $scope.log = 'file: ' + config.file.name + ', Response: ' + JSON.stringify(data) + '\n' + $scope.log;
          });
        });
      }
    }
  };
}]);
