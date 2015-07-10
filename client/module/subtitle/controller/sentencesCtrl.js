'use strict';

angular.module('subtitle').controller('subtitle.sentencesCtrl', ['$scope','subtitle.subtitleFactory', 'subtitle.sentenceFactory', function($scope, Subtitle, Sentence) {
  function initData(){
    var sentencesPerColumn = 25;
    var columnPerBoard = 3;
    var sentencesPerBoard = columnPerBoard * sentencesPerColumn;
    var sentences = $scope.sentences;

    var numOfBoard = Math.ceil(sentences.length / sentencesPerBoard);
    var boards = [];
    for(var i = 0; i < numOfBoard; i++) {
      var board = {};
      var sentencesInBoard = sentences.splice(0, sentencesPerBoard);
      board.startTimestamp = sentencesInBoard[0].start_timestamp;
      board.endTimestamp = sentencesInBoard[sentencesInBoard.length - 1].end_timestamp;
      board.numSentence = sentencesInBoard.length;
      board.cols = [];

      for(var j = 0; j < columnPerBoard; j++) {
        var col = {}
        var sentencesInCol = sentencesInBoard.splice(0, sentencesPerColumn);
        col.sentences = sentencesInCol;
        if(sentencesInCol.length > 0) {
          col.startTimestamp = sentencesInCol[0].start_timestamp;
          col.endTimestamp = sentencesInCol[sentencesInCol.length - 1].end_timestamp;
        }
        board.cols.push(col);
      }

      boards.push(board);
    }

    $scope.boards = boards;
    $scope.currentBoard = boards[0];
    $scope.currentCols = $scope.currentBoard.cols;
  }

  $scope.chooseBoard = function(board) {
    $scope.currentBoard = board;
    $scope.currentCols = $scope.currentBoard.cols;
  }

  initData();

}]);


