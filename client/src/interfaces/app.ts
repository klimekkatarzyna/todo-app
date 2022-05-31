import { IUserData } from '@kkrawczyk/todo-common';
import { ReactElement } from 'react';
import { ContextMenuOpion } from '../enums';

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
	search = 'search',
}

export interface IContextMenu {
	type: ContextMenuOpion;
	icon: ReactElement;
	name: string;
	target?: ReactElement;
}

export interface IQueryError {
	err: {
		message: string;
	};
}

type ElementId = {
	elementId: string;
	listId: string;
	lists?: string[];
};

export interface IData extends IContextMenu, ElementId {}
export interface IHandleContextMenuItemClickProps {
	triggerEvent: unknown;
	event: React.ChangeEvent<HTMLInputElement>;
	props: unknown;
	data: IData;
}
