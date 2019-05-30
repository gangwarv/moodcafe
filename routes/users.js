var express = require('express');
var router = express.Router();

var userController = require('../controllers/users-controller');
router.post('/create', userController.create);
router.post('/authenticate', userController.getToken);
module.exports = router;
