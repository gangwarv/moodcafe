var express = require('express');
var router = express.Router();

const userController = require('../controllers/users-controller');
router.get('/create', userController.create);
router.get('/get', userController.get);
router.get('/getOne', userController.getOne);
router.post('/authenticate', userController.getToken);
module.exports = router;
