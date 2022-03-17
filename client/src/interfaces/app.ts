import { IUserData } from '@kkrawczyk/common/types';

export interface IIUserDataResponse {
	user: IUserData;
}

export interface IAuthResponse {
	[key: string]: IUserData;
}

export enum IResponseStatus {
	error = 'error',
	idle = 'idle',
	loading = 'loading',
	success = 'success',
}

export interface IUseParams {
	listId: string;
	taskId: string;
}

export interface LoginForm {
	email: string;
	password: string;
}
