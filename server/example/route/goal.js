var express = require('express');
var router = express.Router();
var goalControllers = require('../controller/goal');

router.post('/', goalControllers.createGoal);
router.get('/', goalControllers.getGoals);
router.put('/:goalId', goalControllers.updateGoal);

router.param('goalId', goalControllers.load); 
router.delete('/:goalId', goalControllers.destroy);

module.exports = router;

