import mongoose from 'mongoose';

const ListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    taskNumber: {
        type: Number,
        required: true
    },
    themeColor: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

export default mongoose.model('list', ListSchema);
