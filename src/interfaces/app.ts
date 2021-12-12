export interface IIUserDataResponse {
	user: IUserData;
}

export interface IAuthResponse {
	[key: string]: IUserData;
}

export interface IUserData {
	username: string;
	email: string;
	_id: string;
	createdAt: string;
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
