import { useCallback } from 'react';
import { http, HttpResponse } from '../../utils/http';
import * as api from '../../services';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { IUseParams } from '../../interfaces/app';
import { IDeleteListResponse, IListItem, IListResponse } from '../../interfaces/list';
import { useParams } from 'react-router';
import { getStringAfterCharacter } from '../../utils/utilsFunctions';

export const useList = () => {
	const query = useQueryClient();
	const { listId } = useParams<IUseParams>();
	const invitationToken = getStringAfterCharacter(sessionStorage.getItem('invitationTokenUrl') || undefined); // TODO: fix me!!

	const getListsAction = useCallback(
		(): Promise<HttpResponse<IListResponse>> | undefined => http<IListResponse>(`${api.getLists}/${invitationToken}`, 'GET'),
		[]
	);
	const {
		isLoading: getListsLoading,
		data: listsResponse,
		error: getListsError,
	} = useQuery<HttpResponse<IListResponse> | undefined>('lists', getListsAction); // TODO: cache it

	const getListByIdAction = useCallback(async () => {
		const response = await http<IListItem[]>(`${api.getListById}/${listId}`, 'GET');
		return response.body?.[0];
	}, [listId]);

	const deleteListAction = useCallback(async (listId: string) => await http<IDeleteListResponse>(api.removeList, 'DELETE', { listId }), []);
	const { mutate: removeListMutation } = useMutation(deleteListAction, {
		onSuccess: () => {
			query.invalidateQueries(['lists']);
		},
	});

	const addInvitationTokenToListAction = useCallback(
		async ({ listId, invitationToken, owner }): Promise<HttpResponse<unknown>> =>
			await http(api.addInvitationTokenToList, 'PATCH', { listId, invitationToken, owner }),
		[]
	);
	const { mutate: addInvitationTokenToListMutation, isLoading: addInvitationTokenToListLoading } = useMutation(addInvitationTokenToListAction, {
		onSuccess: () => {
			query.invalidateQueries(['getListById']);
		},
	});

	return {
		getListsLoading,
		listsResponse,
		removeListMutation,
		addInvitationTokenToListMutation,
		addInvitationTokenToListLoading,
		getListByIdAction,
	};
};
