import { useCallback } from 'react';
import { http, HttpResponse } from '../../utils/http';
import * as api from '../../services';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { IUseParams } from '../../interfaces/app';
import { IDeleteListResponse, IListItem, IListResponse } from '../../interfaces/list';
import { useParams } from 'react-router';

export const useList = () => {
	const query = useQueryClient();
	const { listId } = useParams<IUseParams>();

	const createListAction = useCallback(
		async (title: string | undefined) =>
			await http<IListItem>(api.createList, 'POST', {
				title,
				taskNumber: 0,
			}),
		[]
	);
	const {
		mutate: createListMutation,
		isLoading: createListLoading,
		error: createListError,
	} = useMutation(createListAction, {
		onSuccess: () => {
			query.invalidateQueries(['lists']);
		},
	});

	const getListsAction = useCallback((): Promise<HttpResponse<IListResponse>> | undefined => http<IListResponse>(api.getLists, 'GET'), []);
	const {
		isLoading: getListsLoading,
		data: listsResponse,
		error: getListsError,
	} = useQuery<HttpResponse<IListResponse> | undefined>('lists', getListsAction); // TODO: cache it

	const getListByIdAction = useCallback(async () => {
		if (!listId) return;
		const response = await http<IListItem[]>(`${api.getListById}/${listId}`, 'GET');
		return response.body?.[0];
	}, [listId]);
	const {
		data: listDataResponse,
		isLoading: listDataLoading,
		error: getListByIdError,
	} = useQuery<IListItem | undefined>(['getListById', listId], getListByIdAction);
	console.log({ listId, listDataLoading, listDataResponse });

	const deleteListAction = useCallback(async (listId: string) => await http<IDeleteListResponse>(api.removeList, 'DELETE', { listId }), []);
	const { mutate: removeListMutation } = useMutation(deleteListAction, {
		onSuccess: () => {
			query.invalidateQueries(['lists']);
		},
	});

	const addInvitationTokenToListAction = useCallback(
		async ({ listId, invitationToken, owner }) => await http(api.addInvitationTokenToList, 'PATCH', { listId, invitationToken, owner }),
		[]
	);
	const { mutate: addInvitationTokenToListMutation, isLoading: addInvitationTokenToListLoading } = useMutation(addInvitationTokenToListAction, {
		onSuccess: () => {
			query.invalidateQueries(['lists']);
		},
	});

	return {
		createListMutation,
		createListLoading,
		getListsLoading,
		listsResponse,
		listDataResponse,
		listDataLoading,
		removeListMutation,
		addInvitationTokenToListMutation,
		addInvitationTokenToListLoading,
		getListByIdAction,
	};
};
