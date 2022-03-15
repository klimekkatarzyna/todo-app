import { Schema, model, SchemaDefinitionProperty } from 'mongoose';

interface ITask {
    createdAt: SchemaDefinitionProperty<DateConstructor | StringConstructor> | undefined;
    importance: string;
    parentFolderId: string;
    groupName: string;
    title: string;
    themeColor: string;
    _id?: string;
    taskStatus: string;
    sortType: string;
    isMyDay: boolean;
}

const TaskSchema = new Schema<ITask>({
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
    },
    groupName: {
        type: String
    },
    themeColor: {
        type: String
    },
    sortType: {
        type: String,
        required: true
    },
    isMyDay: {
        type: Boolean
    },
});

export default model<ITask>('task', TaskSchema);
