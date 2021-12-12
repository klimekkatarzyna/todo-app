import React, { useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { http, HttpResponse } from '../../utils/http';
import * as api from '../../services';
import { IGroup, IGroupsResponse } from '../../interfaces/group';

export const useGroup = () => {
	const query = useQueryClient();

	const createGroup = useCallback(async (title: string): Promise<HttpResponse<IGroup> | undefined> => {
		try {
			const response = await http<IGroup>(api.createGroup, 'POST', {
				title,
			});
			return response;
		} catch (err: unknown) {
			console.error(err);
		}
	}, []);

	const { mutate: mutateCreateGroup, isLoading: mutateCreateGroupLoading } = useMutation<
		HttpResponse<IGroup> | undefined,
		unknown,
		string,
		unknown
	>(createGroup, {
		onSuccess: () => {
			query.invalidateQueries(['groups']);
		},
	});

	const getGroups = useCallback((): Promise<HttpResponse<IGroupsResponse>> | undefined => {
		try {
			const response = http<IGroupsResponse>(api.getGroups, 'GET');
			return response;
		} catch (err: unknown) {
			console.error(err);
		}
	}, []);

	const { isLoading: getGroupsLoading, data: groupsData } = useQuery<HttpResponse<IGroupsResponse> | undefined>('groups', getGroups, {
		useErrorBoundary: true,
	});

	return {
		mutateCreateGroup,
		mutateCreateGroupLoading,
		getGroupsLoading,
		groupsData,
	};
};
