var express = require('express');
var router = express.Router();
var userAPI = require('../api/user');

router.get('/profile', userAPI.getProfile);
router.get('/logout', userAPI.logout);

module.exports = router;
