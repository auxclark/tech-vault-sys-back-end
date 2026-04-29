const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    action: {
        type: String,
        required: true
    },
    performedBy: {
        type: String,
        required: true
    },
    datePerformed: {
        type: Date,
        required: true
    },
    itemId: {
        type: String,
        required: true
    },
    itemName: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('History', historySchema);