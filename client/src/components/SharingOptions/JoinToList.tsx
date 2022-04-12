import { FC, useCallback } from 'react';
import { Loader } from 'react-feather';
import { useHistory } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { addUserToMemberOfListAction, IShareLitDetails } from '../../actions/sharing';
import { Button } from '../Button/Button';
import { getStringAfterCharacter } from '../../utils/utilsFunctions';

interface IJoinToList {
	listDataLoading: boolean;
	list: IShareLitDetails | undefined;
}

export const JoinToList: FC<IJoinToList> = ({ listDataLoading, list }) => {
	const query = useQueryClient();
	const history = useHistory();
	const {
		mutate: addUserToMemberOfListMutation,
		error,
		isLoading,
	} = useMutation(addUserToMemberOfListAction, {
		onSuccess: () => {
			query.invalidateQueries(['checkSession']);
		},
	});

	const addUserToMemberOfList = useCallback(() => {
		addUserToMemberOfListMutation(getStringAfterCharacter(history.location.search));
		history.push(`/tasks/${list?.listData._id}`);
	}, [list]);

	return (
		<>
			<h1 className='text-xl font-extralight m-4'>Dołącz do listy</h1>

			<p className='font-extralight'>
				{listDataLoading ? <Loader className='m-auto' /> : `Użytkownik`} <strong>{list?.listData?.owner}</strong> udostępnił Ci listę{' '}
				<strong>{`${list?.listData?.title}`}</strong>
			</p>

			<Button primary onClick={addUserToMemberOfList}>
				{'Dołącz do listy'}
				{isLoading && <Loader className='ml-2' />}
			</Button>
		</>
	);
};
