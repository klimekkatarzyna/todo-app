import { useCallback, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext, AuthContextType } from '../AuthContext';
import { IAuthResponse, IIUserDataResponse, IUserData } from '../interfaces/app';
import * as api from '../services';
import { http, HttpResponse } from '../utils/http';

interface IAuthenticateUser {
	email: string;
	password: string;
	username?: string;
}

export const useAuthorization = () => {
	const history = useHistory();
	const { setAuthData } = useContext<AuthContextType>(AuthContext);

	const checkSession = useCallback(async () => {
		try {
			const response = await http<IIUserDataResponse>(api.me, 'GET');
			if (!response.isSuccess) return;
			response?.isSuccess ? history.push(history.location.pathname) : history.push('/login');

			return response;
		} catch (err) {
			history.push(window.location.pathname !== '/tasks/sharing' ? '/login' : window.location.pathname);
			console.error(err);
		}
	}, []);

	const authenticateUserRequest = useCallback(async ({ username, email, password }: IAuthenticateUser) => {
		try {
			const response = await http(api.register, 'POST', {
				username,
				email,
				password,
			});

			if (!response?.isSuccess) return;
			response?.isSuccess && history.push('/');

			return response;
		} catch (err) {
			console.error(err);
			return err;
		}
	}, []);

	const loginRequest = useCallback(async ({ email, password }: IAuthenticateUser) => {
		try {
			const response = await http<any>(api.login, 'POST', {
				email,
				password,
			});
			if (response.isSuccess && response?.body._id) {
				history.push('/');
				setAuthData(response?.body);
			}

			return response;
		} catch (error) {
			console.error(error);
		}
	}, []);

	const logoutUser = useCallback(async () => {
		try {
			await http(api.logout, 'POST');
			setAuthData(undefined);
			history.push('/login');
		} catch (error) {
			console.error(error);
		}
	}, []);

	return {
		authenticateUserRequest,
		checkSession,
		loginRequest,
		logoutUser,
	};
};
