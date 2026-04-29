const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    model: {
        type: String,
        required: true
    },
    condition: {
        type: String,
        required: true
    },
    assignedTo: {
        type: String,
        required: true
    },
    dateAssigned: {
        type: Date,
        required: true
    },
    dateReturned: {
        type: Date
    },
    location: {
        type: String
    },
    lastInspection: {
        type: Date
    }
});

module.exports = mongoose.model('Item', itemSchema);