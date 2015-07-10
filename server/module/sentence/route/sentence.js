var express = require('express');
var router = express.Router();
var sentenceControllers = require('../controller/sentence');

router.post('/', sentenceControllers.createSentence);
router.get('/', sentenceControllers.getSentences);
router.put('/:sentenceId', sentenceControllers.updateSentence);

router.param('sentenceId', sentenceControllers.load); 
router.delete('/:sentenceId', sentenceControllers.destroy);

module.exports = router;

