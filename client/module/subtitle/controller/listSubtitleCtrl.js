'use strict';

angular.module('subtitle').controller('subtitle.listSubtitleCtrl', ['$scope','subtitle.subtitleFactory', 'subtitle.sentenceFactory', function($scope, Subtitle, Sentence) {
  $scope.subtitles = [];
  $scope.rankings = [];

  $scope.selectSubtitle = function(sub) {
    $scope.rankings = sub.rankings;
    Sentence.getSentencesBySubId(sub._id).$promise.then(function(data) {
      $scope.sentences = data;
    });
  }
  Subtitle.getAll().$promise.then(function(data) {
    $scope.subtitles = data;
  });

}]);

