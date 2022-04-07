import React, { useCallback, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext, AuthContextType } from '../AuthProvider';
import { Button } from '../components/Button/Button';
import { useMutation } from 'react-query';
import { getStringAfterCharacter } from '../utils/utilsFunctions';
import { Loader } from '../components/Loader/Loader';
import { addUserToMemberOfListAction } from '../actions/sharing';

export const Sharing = () => {
	const history = useHistory();
	const { authData } = useContext<AuthContextType>(AuthContext);

	const { mutate: addUserToMemberOfListMutation, error, isLoading, isSuccess } = useMutation(addUserToMemberOfListAction);

	const addUserToMemberOfList = useCallback(() => {
		addUserToMemberOfListMutation(getStringAfterCharacter(history.location.search));
		// history.push('/tasks');
	}, []);

	return (
		<div className='absolute top-0 left-0 right-0 w-full h-full bg-white flex items-center justify-center'>
			<div className='flex items-center justify-center flex-col'>
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
			</div>
		</div>
	);
};
