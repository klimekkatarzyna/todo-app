import { Schema, model } from 'mongoose';

const MainListSchema = new Schema({
    isMainList: {
        type: Boolean,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    taskNumber: {
        type: Number,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    themeColor: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    _id: {
        type: String,
        required: true
    }
});

export default model('mainlist', MainListSchema);
