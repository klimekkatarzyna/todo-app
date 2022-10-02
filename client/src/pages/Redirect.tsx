import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Loader } from 'react-feather';
import { AuthContext, AuthContextType } from '../AuthProvider';
import { useTranslation } from 'react-i18next';

export const Redirect = () => {
	const { t } = useTranslation();
	const location = useLocation();
	const { isCheckSessionLoading } = useContext<AuthContextType>(AuthContext);

	useEffect(() => {
		sessionStorage.setItem('invitationTokenUrl', `${location?.pathname}${location?.search}`);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			{isCheckSessionLoading && (
				<div className='flex items-center flex-col absolute left-0 right-0'>
					<Loader className='animate-spin mb-2 mt-4' />
					<span>{t('redirect-info')}</span>
				</div>
			)}
		</div>
	);
};
