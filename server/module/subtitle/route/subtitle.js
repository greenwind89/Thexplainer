var express = require('express');
var router = express.Router();
var subtitleControllers = require('../controller/subtitle');

router.post('/', subtitleControllers.createSubtitle);
router.get('/', subtitleControllers.getSubtitles);
router.put('/:subtitleId', subtitleControllers.updateSubtitle);

router.param('subtitleId', subtitleControllers.load); 
router.delete('/:subtitleId', subtitleControllers.destroy);

module.exports = router;

