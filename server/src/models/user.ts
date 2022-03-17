import { IUserData } from '@kkrawczyk/common/types';
import { Schema, model } from 'mongoose';

const userSchema = new Schema<IUserData>({
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Number,
		default: Date.now(),
	},
});

export const User = model<IUserData>('User', userSchema);
