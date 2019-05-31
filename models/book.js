const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const BookSchema = new Schema({
    title: {
        type: String,
        required: true,
        index: { unique: true }
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }
});

module.exports = mongoose.model('Book', BookSchema);