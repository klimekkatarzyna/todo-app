import { Schema, model } from 'mongoose';

export const GroupSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    themeColor: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    userId: { type: Schema.Types.ObjectId, ref: 'User' }
});

export const Group = model('Group', GroupSchema);
