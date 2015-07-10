var express = require('express');
var router = express.Router();
var itemControllers = require('../controller/item');

router.post('/', itemControllers.createItem);
router.get('/', itemControllers.getItems);
router.put('/:itemId', itemControllers.updateItem);

router.param('itemId', itemControllers.load); 
router.delete('/:itemId', itemControllers.destroy);

module.exports = router;

