import { IList } from '@kkrawczyk/common/types';
import { Schema, model } from 'mongoose';

export const ListSchema = new Schema<IList>({
	title: {
		type: String,
		required: true,
	},
	taskNumber: {
		type: Number,
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
});

export const List = model<IList>('List', ListSchema);
