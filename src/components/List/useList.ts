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

	const createList = useCallback(async (title: string | undefined) => {
		try {
			const response = await http<IListItem>(api.createList, 'POST', {
				title,
				taskNumber: 0,
			});
			return response;
		} catch (err: unknown) {
			console.error(err);
		}
	}, []);

	const { mutate: mutateCreateList, isLoading: mutateCreateListLoading } = useMutation(createList, {
		onSuccess: () => {
			query.invalidateQueries(['lists']);
		},
	});

	const getLists = useCallback((): Promise<HttpResponse<IListResponse>> | undefined => {
		try {
			const response = http<IListResponse>(api.getLists, 'GET');
			return response;
		} catch (err: unknown) {
			console.error(err);
		}
	}, []);

	const { isLoading: getListsLoading, data: getListsQuery } = useQuery<HttpResponse<IListResponse> | undefined>('lists', getLists); // TODO: cache it

	const getListById = useCallback(async () => {
		if (!listId) return;
		try {
			const response = await http<IListItem[]>(`${api.getListById}/${listId}`, 'GET');
			return response.body?.[0];
		} catch (err: unknown) {
			console.error(err);
		}
	}, [listId]);

	const { data: getListByIdData, isLoading: getListByIdLoading } = useQuery<IListItem | undefined>(['getListById', listId], getListById);

	const deleteList = useCallback(async (listId: string) => {
		try {
			const response = await http<IDeleteListResponse>(api.removeList, 'DELETE', { listId });
			return response;
		} catch (err: unknown) {
			console.error(err);
		}
	}, []);

	const { mutate: mutateRemoveList } = useMutation(deleteList, {
		onSuccess: () => {
			query.invalidateQueries(['lists']);
		},
	});

	return {
		mutateCreateList,
		mutateCreateListLoading,
		getListsLoading,
		getListsQuery,
		getListByIdData,
		getListByIdLoading,
		mutateRemoveList,
	};
};

export default useList;
