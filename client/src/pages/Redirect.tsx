import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Loader } from 'react-feather';
import { buildUrl } from '../utils/paths';
import { ROUTE } from '../enums';

export const Redirect = () => {
	const history = useHistory();
	const [isLoding, setIsloading] = useState<boolean>(true);

	useEffect(() => {
		sessionStorage.setItem('invitationTokenUrl', `${history?.location?.pathname}${history?.location?.search}`);
	}, [history]);

	useEffect(() => {
		history.push(buildUrl(ROUTE.login));
		setIsloading(isLoding);
	}, [history, isLoding]);

	return <div>{isLoding && <Loader className='m-auto' />}</div>;
};
