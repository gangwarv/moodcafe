const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    create: function (req, res, next) {
        userModel.create({ userName: req.body.userName, password: bcrypt.hashSync(req.body.password, 10) }, function (err, data) {
            if (err)
                next(err);
            else
                res.json({ status: "success", message: "User added successfully!", data: data });
        });
    },
    getToken: function (req, res, next) {
        userModel.findOne({ userName: req.body.userName }, function (err, user) {
            if (err) {
                next(err);
            } else {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    const token = jwt.sign({ id: user._id }, 'secretKey', { expiresIn: '2m' });
                    res.json({ status: "success", message: "match found!", data: { userId: user._id, token: token } });
                } else {
                    res.json({ status: "error", message: "Invalid credentials!", data: null });
                }
            }
        });
    }
}