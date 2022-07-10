import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Loader } from 'react-feather';
import { buildUrl } from '../utils/paths';
import { ROUTE } from '../enums';

export const Redirect = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [isLoding, setIsloading] = useState<boolean>(true);

	useEffect(() => {
		sessionStorage.setItem('invitationTokenUrl', `${location?.pathname}${location?.search}`);
	}, [location]);

	useEffect(() => {
		navigate(buildUrl(ROUTE.login));
		setIsloading(isLoding);
	}, [navigate, isLoding]);

	return <div>{isLoding && <Loader className='m-auto' />}</div>;
};
