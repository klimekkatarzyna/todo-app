import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { checkSessionAction } from '../actions/user';

export const useAuthorization = () => {
	const history = useHistory();

	const checkSession = useCallback(async () => {
		try {
			const response = await checkSessionAction();
			if (!response.isSuccess) return;
			response?.isSuccess ? history.push(history.location.pathname) : history.push('/login');

			return response;
		} catch (err) {
			console.error(err);
			history.push('/login');
		}
	}, []);

	return {
		checkSession,
	};
};
