const mongoose = require('mongoose');

const MainListSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    taskNumber: {
        type: Number,
    },
    icon: {
        type: String,
        // required: true
    },
    themeColor: {
        type: String,
        required: true
    },
    _id: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('mainlist', MainListSchema);
