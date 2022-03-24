import { ITask } from '@kkrawczyk/todo-common';
import { Schema, model } from 'mongoose';

const TaskSchema = new Schema<ITask>({
	title: {
		type: String,
		required: true,
	},
	parentFolderId: {
		type: String,
		required: true,
	},
	importance: {
		type: String,
		required: true,
	},
	taskStatus: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	groupName: {
		type: String,
	},
	themeColor: {
		type: String,
	},
	sortType: {
		type: String,
		required: true,
	},
	isMyDay: {
		type: Boolean,
	},
});

export default model<ITask>('task', TaskSchema);
