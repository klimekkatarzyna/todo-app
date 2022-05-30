import { IList } from '@kkrawczyk/todo-common';
import { Schema, model } from 'mongoose';

export const ListSchema = new Schema<IList>({
	title: {
		type: String,
		required: true,
	},
	themeColor: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	userId: { type: Schema.Types.ObjectId, ref: 'User' },
	invitationToken: {
		type: String,
	},
	owner: {
		type: String,
	},
	members: {
		type: Array,
	},
	isInGroup: {
		type: Boolean,
	},
});

export const List = model<IList>('List', ListSchema);
