var bookModel = require('../models/book');
var purchaseModel = require('../models/purchase');

module.exports = {
    create: function (req, res, next) {
        bookModel.create({ title: req.body.title, description: req.body.description, price: req.body.price }, function (err, data) {
            if (err)
                next(err);
            else
                res.json({ status: "success", message: "Book added successfully!", data: data });
        });
    },
    get: function (req, res, next) {
        let filter = {};
        if (req.query.title) {
            filter.title = req.query.title;
        }
        bookModel.find(filter, function (err, books) {
            if (err) {
                next(err);
            } else {
                res.json(books);
            }
        });
    },
    buy: function (req, res, next) {
        bookModel.findById(req.body.bookId, function (err, book) {
            if (err) {
                next(err)
            } else if (book) {
                purchaseModel.create({ userId: req.body.userId, bookId: req.body.bookId }, function (err, data) {
                    if (err)
                        next(err);
                    else
                        res.json({ status: "success", message: "Book purchased successfully!", data: data });
                });
            } else {
                res.status(400).json({ errmsg: 'invalid bookId' })
            }

        })

    }
}
