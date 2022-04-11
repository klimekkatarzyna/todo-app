import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '../components/Button/Button';
import { useMutation, useQuery } from 'react-query';
import { getStringAfterCharacter } from '../utils/utilsFunctions';
import { addUserToMemberOfListAction, getListDatatoShareAction } from '../actions/sharing';
import { IList } from '@kkrawczyk/todo-common';
import { Mail, Loader } from 'react-feather';

export const Sharing = () => {
	const history = useHistory();

	const { mutate: addUserToMemberOfListMutation, error, isLoading, isSuccess } = useMutation(addUserToMemberOfListAction);

	const invitationTokenUrl = getStringAfterCharacter(sessionStorage.getItem('invitationTokenUrl') || '');
	const { data, isLoading: listDataLoading } = useQuery<IList | undefined>(['getListDatatoShare', invitationTokenUrl], () =>
		getListDatatoShareAction({ invitationToken: invitationTokenUrl || '' })
	);

	const addUserToMemberOfList = useCallback(() => {
		addUserToMemberOfListMutation(getStringAfterCharacter(history.location.search));
		// history.push('/tasks');
	}, []);

	return (
		<div className='absolute top-0 left-0 right-0 w-full h-full bg-white flex items-center justify-center'>
			<div className='flex items-center justify-center flex-col'>
				<Mail size={160} color={'#cccccc'} stroke-width={1} />

				<h1 className='text-xl font-extralight m-4'>Dołącz do listy</h1>

				<p className='font-extralight'>
					{listDataLoading ? <Loader className='m-auto' /> : `Użytkownik`} <strong>{data?.owner}</strong> udostępnił Ci listę{' '}
					<strong>{`${data?.title}`}</strong>
				</p>

				<Button primary onClick={addUserToMemberOfList}>
					{'Dołącz do listy'}
					{isLoading && <Loader className='ml-2' />}
				</Button>
			</div>
		</div>
	);
};
