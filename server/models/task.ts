import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    parentFolderId: {
        type: String,
        required: true
    },
    importance: {
        type: String,
        required: true
    },
    taskStatus: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

export default mongoose.model('task', TaskSchema);
