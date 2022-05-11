import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deleteListAction, getListsAction } from '../actions/lists';
import { useRecoilState } from 'recoil';
import { listsState } from '../atoms';
import { IList } from '@kkrawczyk/todo-common';
import { QueryKey } from '../enums';
import toast from 'react-hot-toast';

export const useList = () => {
	const query = useQueryClient();

	const { isLoading: getListsLoading, data, error } = useQuery<IList[] | undefined>(QueryKey.lists, getListsAction);

	const [list, setList] = useRecoilState(listsState);

	useEffect(() => {
		setList(data);
	}, [data]);

	const { mutate: removeListMutation } = useMutation(deleteListAction, {
		onSuccess: () => {
			query.invalidateQueries([QueryKey.lists]);
			toast.success('Lista usunięta');
		},
		onError: error => {
			toast.error(`Coś poszlo nie tak: ${error}`);
		},
	});

	return {
		getListsLoading,
		removeListMutation,
	};
};
