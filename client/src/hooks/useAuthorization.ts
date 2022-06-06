import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { checkSessionAction } from '../actions/user';
import { ROUTE } from '../enums';
import { buildUrl } from '../utils/paths';

export const useAuthorization = () => {
	const history = useHistory();

	const checkSession = useCallback(async () => {
		try {
			const response = await checkSessionAction();
			if (!response.isSuccess) return;
			const redirectUrl = response?.isSuccess ? history.location.pathname : buildUrl(ROUTE.login);
			history.push(redirectUrl);

			return response;
		} catch (err) {
			console.error(err);
			history.push(buildUrl(ROUTE.login));
		}
	}, []);

	return {
		checkSession,
	};
};
