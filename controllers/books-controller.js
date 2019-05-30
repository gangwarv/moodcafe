const bookModel = require('../models/book');

module.exports = {
    create: function (req, res, next) {

        bookModel.create({ title: req.query.title, price: req.query.price }, function (err, data) {
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


function validateUser(req, res, next) {
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
      if (err) {
        res.json({status:"error", message: err.message, data:null});
      }else{
        // add user id to request
        req.body.userId = decoded.id;
        next();
      }
    });
    
  }