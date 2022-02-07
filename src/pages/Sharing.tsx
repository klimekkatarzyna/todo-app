import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../AuthContext';
import { Button } from '../components/Button/Button';
import { COLOURS } from '../constants';

const Wrapper = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	width: 100%;
	height: 100%;
	background-color: ${COLOURS.white};
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Body = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

export const Sharing = () => {
	const history = useHistory();

	useEffect(() => {
		sessionStorage.setItem('invitationTokenUrl', `${history.location.pathname}${history.location.search}`);
	}, [history]);

	// najpierw widok logowania
	// pozniej widok ten !!

	return (
		<Wrapper>
			<Body>
				<p>{"Dołącz do listy 'Do zabrania dla synka'"}</p>
				<p>{'Dołączono już do listy Do zabrania dla synka'}</p>
				{/*TODO: check if user is already invited to the list 
                - yes => show info about that
                - no => process of invitation */}
				{/*TODO: user have account: 
                - add user to list
                - redirect to the current one invited list view */}

				{/*TODO: user don't have account: 
                - redirect to register view */}
				<Button primary>{'Dołącz'}</Button>
			</Body>
		</Wrapper>
	);
};
