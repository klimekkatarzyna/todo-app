import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Loader } from '../components/Loader/Loader';

export const Redirect = () => {
	const history = useHistory();
	const [isLoding, setIsloading] = useState(true);

	useEffect(() => {
		sessionStorage.setItem('invitationTokenUrl', `${history.location.pathname}${history.location.search}`);
	}, [history]);

	useEffect(() => {
		history.push('/login');
		setIsloading(isLoding);
	}, []);

	return <div>{isLoding && <Loader />}</div>;
};
