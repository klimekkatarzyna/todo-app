const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    taskNumber: {
        type: Number,
        //required: true
    },
    themeColor: {
        type: String,
        //required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('list', ListSchema);
