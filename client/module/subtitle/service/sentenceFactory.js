'use strict' 

angular.module('subtitle').factory('subtitle.sentenceFactory', ['$resource', function($resource) {
  var SentenceAPI = $resource('/sentence/:sentenceId', {sentenceId: '@id'}, {
      createNewSentence: {method: 'POST'},
      getAllSentences: {method: 'GET', isArray: true},
      deleteSentence: {method: 'DELETE'},
      updateSentence: {method: 'PUT'},
    });

  return {
    getAll: SentenceAPI.getAllSentences,
    getSentencesBySubId: function(subId) {
      return SentenceAPI.getAllSentences({subId: subId});
    }
  }
}]);



