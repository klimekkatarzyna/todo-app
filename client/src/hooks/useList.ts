import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deleteListAction, getListsAction } from '../actions/lists';
import { useSetRecoilState } from 'recoil';
import { listsState } from '../atoms';
import { IList } from '@kkrawczyk/todo-common';
import { QueryKey } from '../enums';
import toast from 'react-hot-toast';
import { IQueryError } from '../interfaces/app';

export const useList = () => {
	const query = useQueryClient();

	const { isLoading: getListsLoading, data, error } = useQuery<IList[] | undefined>(QueryKey.lists, getListsAction);

	const setList = useSetRecoilState(listsState);

	useEffect(() => {
		setList(data);
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
