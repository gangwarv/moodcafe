const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    title: {
        type: String,
        required: true,
        index: { unique: true}
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }
});


module.exports = mongoose.model('Book', UserSchema);