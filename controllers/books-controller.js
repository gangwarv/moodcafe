var bookModel = require('../models/book');

module.exports = {
    create: function (req, res, next) {
        bookModel.create({ title: req.body.title, price: req.body.price }, function (err, data) {
            if (err)
                next(err);
            else
                res.json({ status: "success", message: "Book added successfully!", data: data });
        });
    },
    get: function (req, res, next) {
        let filter = {};
        if(req.query.title){
            filter.title = req.query.title;
        }
        bookModel.find(filter, function (err, books) {
            if (err) {
                next(err);
            } else {
                res.json(books);
            }
        });
    }
}
