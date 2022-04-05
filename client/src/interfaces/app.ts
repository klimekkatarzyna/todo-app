import { IUserData } from '@kkrawczyk/todo-common';
import { ReactElement } from 'react';
import { ContextualMenuOpion } from '../enums';

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

export enum InputType {
	text = 'text',
	password = 'password',
}

export interface IContextualMenu {
	type: ContextualMenuOpion;
	icon: ReactElement;
	name: string;
	target?: ReactElement;
}
