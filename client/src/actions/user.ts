import { http } from '../utils/http';
import * as api from '../services';
import { IUserData } from '@kkrawczyk/todo-common';
import { IIUserDataResponse } from '../interfaces/app';

export const checkSessionAction = async () => await http<IIUserDataResponse>(api.me, 'GET');

export const registerAction = async ({ username, email, password }: IUserData) =>
	await http<IUserData>(api.register, 'POST', {
		username,
		email,
		password,
	});

export const loginAction = async ({ email, password }: IUserData) =>
	await http<IUserData>(api.login, 'POST', {
		email,
		password,
	});

export const logoutUserAction = async () => await http(api.logout, 'POST');

export const getUserAction = async (_id: string | undefined) => {
	const response = await http<IUserData>(`${api.user}/${_id}`, 'GET');
	return response.body;
};
