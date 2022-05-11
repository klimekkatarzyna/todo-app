import { IUserData } from '@kkrawczyk/todo-common';
import { Schema, model } from 'mongoose';

const userSchema = new Schema<IUserData>({
	username: {
		type: String,
		required: [true, 'Username is required'],
		lowercase: true,
	},
	email: {
		type: String,
		required: [true, 'Email is required'],
		lowercase: true,
		validate: [],
	},
	password: {
		type: String,
		required: [true, 'Password is required'],
		validate: [],
	},
	createdAt: {
		type: Number,
		default: Date.now(),
	},
});

export const User = model<IUserData>('User', userSchema);
