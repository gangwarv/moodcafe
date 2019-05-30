var express = require('express');
var router = express.Router();

var booksController = require('../controllers/books-controller');
router.get('/', booksController.get);
router.post('/create', booksController.create);
module.exports = router;
