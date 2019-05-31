const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const PurchaseSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    bookId: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Purchase', PurchaseSchema);