import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deleteListAction, getListsAction } from '../actions/lists';
import { useSetRecoilState } from 'recoil';
import { listsState } from '../atoms';
import { IList } from '@kkrawczyk/todo-common';
import { QueryKey } from '../enums';
import toast from 'react-hot-toast';
import { IQueryError } from '../interfaces/app';
import { invitationToken } from '../utils/invitationToken';

export const useList = () => {
	const query = useQueryClient();
	// TODO: osobny endpoint dla invitation token albo cos zrobic by nie lecial parametr undedfined
	// const { isLoading: getListsLoading, data } = useQuery<IList[] | undefined>(QueryKey.lists, getListsAction, { enabled: !!invitationToken});
	const { isLoading: getListsLoading, data } = useQuery<IList[] | undefined>(QueryKey.lists, getListsAction);

	const setList = useSetRecoilState(listsState);

	useEffect(() => {
		const notAddedToGroupLists = data?.filter(list => list.isInGroup === false);
		setList(notAddedToGroupLists);
	}, [data]);

	const { mutateAsync: removeListMutation } = useMutation(deleteListAction, {
		onSuccess: () => {
			query.invalidateQueries([QueryKey.lists]);
			toast.success('Lista usunięta');
		},
		onError: (error: IQueryError) => {
			toast.error(`Coś poszlo nie tak: ${error.err.message}`);
		},
	});

	return {
		getListsLoading,
		removeListMutation,
	};
};
