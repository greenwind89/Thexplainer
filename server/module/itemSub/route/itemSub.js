var express = require('express');
var router = express.Router();
var itemSubControllers = require('../controller/itemSub');

router.post('/', itemSubControllers.createitemSub);
router.get('/', itemSubControllers.getitemSubs);
router.put('/:itemSubId', itemSubControllers.updateitemSub);

router.param('itemSubId', itemSubControllers.load); 
router.delete('/:itemSubId', itemSubControllers.destroy);

module.exports = router;

