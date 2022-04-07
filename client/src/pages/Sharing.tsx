import React, { useCallback, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext, AuthContextType } from '../AuthProvider';
import { Button } from '../components/Button/Button';
import { COLOURS } from '../constants';
import { useMutation } from 'react-query';
import { getStringAfterCharacter } from '../utils/utilsFunctions';
import { Loader } from '../components/Loader/Loader';
import { addUserToMemberOfListAction } from '../actions/sharing';

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
	const { authData } = useContext<AuthContextType>(AuthContext);

	const { mutate: addUserToMemberOfListMutation, error, isLoading, isSuccess } = useMutation(addUserToMemberOfListAction);

	const addUserToMemberOfList = useCallback(() => {
		addUserToMemberOfListMutation(getStringAfterCharacter(history.location.search));
		// history.push('/tasks');
	}, []);

	return (
		<Wrapper>
			<Body>
				<p>
					<strong>{`Hej ${authData?.username}!`}</strong>
				</p>
				<p>{"Dołącz do listy 'Do zabrania dla synka'"}</p>
				{/* <p>{'Dołączono już do listy Do zabrania dla synka'}</p> */}
				{/*TODO: check if user is already invited to the list 
                - yes => show info about that
                - no => process of invitation */}
				{/*TODO: user have account: 
                - add user to list
                - redirect to the current one invited list view */}

				{/*TODO: user don't have account: 
                - redirect to register view */}
				<Button primary onClick={addUserToMemberOfList}>
					{'Dołącz'}
					{isLoading && <Loader />}
				</Button>
			</Body>
		</Wrapper>
	);
};
