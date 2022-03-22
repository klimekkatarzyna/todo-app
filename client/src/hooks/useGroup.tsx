import React, { useCallback, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { http, HttpResponse } from '../utils/http';
import * as api from '../services';
import { IDeleteGroupResponse, IGroupsResponse } from '../interfaces/group';
import { removesWhitespaceFromString } from '../utils/utilsFunctions';
import { IGroup } from 'todo-common';

export const useGroup = () => {
	const query = useQueryClient();

	const [isInputVisible, setIsInputVisible] = useState(false);
	const [groupName, setGroupName] = useState<string>('');

	const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const clearStr = removesWhitespaceFromString(event.target?.value);
		setGroupName(clearStr);
	}, []);

	const createGroup = useCallback(async (title: string): Promise<HttpResponse<IGroup> | undefined> => {
		try {
			const response = await http<IGroup>(api.createGroup, 'POST', {
				title: title || 'Grupa bez nazwy',
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

	const deleteGroup = useCallback(async (groupId: string): Promise<HttpResponse<IDeleteGroupResponse> | undefined> => {
		try {
			const response = await http<IDeleteGroupResponse>(api.removeGroup, 'DELETE', { groupId });
			return response;
		} catch (err: unknown) {
			console.error(err);
		}
	}, []);

	const { mutate: deleteGroupMutate } = useMutation(deleteGroup, {
		onSuccess: () => {
			query.invalidateQueries(['groups']);
		},
	});

	const editGroup = useCallback(async ({ groupId, title }) => {
		try {
			const response = await http(api.editGroup, 'PATCH', { groupId, title });
			setIsInputVisible(false);
			return response;
		} catch (err: unknown) {
			console.error(err);
		}
	}, []);

	const { mutate: editGroupMutate } = useMutation(editGroup, {
		onSuccess: () => {
			query.invalidateQueries(['groups']);
		},
	});

	return {
		mutateCreateGroup,
		mutateCreateGroupLoading,
		getGroupsLoading,
		groupsData,
		deleteGroupMutate,
		editGroupMutate,
		setIsInputVisible,
		isInputVisible,
		groupName,
		handleChange,
		setGroupName,
	};
};
