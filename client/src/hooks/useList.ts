import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deleteListAction, getListsAction } from '../actions/lists';
import { IListResponse } from '../interfaces/list';
import { HttpResponse } from '../utils/http';
import { useRecoilState } from 'recoil';
import { listsState } from '../atoms';

export const useList = () => {
	const query = useQueryClient();

	const {
		isLoading: getListsLoading,
		data: listsResponse,
		error: getListsError,
	} = useQuery<HttpResponse<IListResponse> | undefined>('lists', getListsAction); // TODO: cache it

	const [list, setList] = useRecoilState(listsState);

	useEffect(() => {
		setList(listsResponse?.body?.lists);
	}, [listsResponse]);

	const { mutate: removeListMutation } = useMutation(deleteListAction, {
		onSuccess: () => {
			query.invalidateQueries(['lists']);
		},
	});

	return {
		getListsLoading,
		removeListMutation,
	};
};
