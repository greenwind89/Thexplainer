'use strict' 

angular.module('subtitle').factory('subtitle.subtitleFactory', ['$resource', function($resource) {
  var SubtitleAPI = $resource('/subtitle/:subtitleId', {subtitleId: '@id'}, {
      createNewSubtitle: {method: 'POST'},
      getAllSubtitles: {method: 'GET', isArray: true},
      deleteSubtitle: {method: 'DELETE'},
      updateSubtitle: {method: 'PUT'},
    });

  return {
    getAll: SubtitleAPI.getAllSubtitles
  }
}]);


