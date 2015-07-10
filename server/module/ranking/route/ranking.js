var express = require('express');
var router = express.Router();
var rankingControllers = require('../controller/ranking');

router.post('/', rankingControllers.createRanking);
router.get('/', rankingControllers.getRankings);
router.put('/:rankingId', rankingControllers.updateRanking);

router.param('rankingId', rankingControllers.load); 
router.delete('/:rankingId', rankingControllers.destroy);

module.exports = router;

