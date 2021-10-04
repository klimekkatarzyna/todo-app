const mongoose = require('mongoose');

const ListSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    users: [{
        clientId: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
    }],
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("list", ListSchema);
