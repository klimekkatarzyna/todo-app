import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Loader } from 'react-feather';
import { AuthContext, AuthContextType } from '../AuthProvider';

export const Redirect = () => {
	const location = useLocation();
	const { isCheckSessionLoading } = useContext<AuthContextType>(AuthContext);

	useEffect(() => {
		sessionStorage.setItem('invitationTokenUrl', `${location?.pathname}${location?.search}`);
	}, [location?.pathname, location?.search]);

	return (
		<div>
			{isCheckSessionLoading && (
				<div className='flex items-center flex-col absolute left-0 right-0'>
					<Loader className='animate-spin mb-2 mt-4' />
					<span>{'Redirecting to login...'}</span>
				</div>
			)}
		</div>
	);
};
