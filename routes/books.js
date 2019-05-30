var express = require('express');
var router = express.Router();

const booksController = require('../controllers/books-controller');
router.get('/', booksController.get);
router.get('/create', booksController.create);
module.exports = router;
