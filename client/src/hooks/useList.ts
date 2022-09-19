import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deleteListAction, editListThemeAction, getListsAction } from '../api/lists';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { listsState } from '../atoms';
import { IGroup, IList, ITask } from '@kkrawczyk/todo-common';
import { QueryKey } from '../enums';
import toast from 'react-hot-toast';
import { groupState } from '../atoms/group';
import { getGroups } from '../api/groups';
import { updateMembersList } from '../api/sharing';
import { removeUsersFromTasksAction } from '../api/tasks';
import { useSwitchToFirstListItem } from './useSwitchToFirstListItem';

export const useList = () => {
	const query = useQueryClient();
	const { isLoading: getListsLoading, data: listsQuery } = useQuery<IList[] | undefined>([QueryKey.lists], getListsAction);
	const { data: groupsQuery } = useQuery<IGroup[] | undefined>(QueryKey.groups, getGroups);
	const { onHandleSwitchToFirstListItem } = useSwitchToFirstListItem();

	const setList = useSetRecoilState(listsState);
	const groupDetails = useRecoilValue<IGroup | undefined>(groupState);

	useEffect(() => {
		const listsContainedInGroups = groupsQuery
			?.flatMap(group => listsQuery?.map(list => group.lists?.includes(list._id || '') && list))
			.filter(list => Boolean(list));

		const listsContainedInGroupsIds = listsContainedInGroups?.map((list: any) => list._id);

		const listsNotContainsInGroups = listsQuery?.filter(list => !listsContainedInGroupsIds?.includes(list._id)).map(item => item);

		setList(listsNotContainsInGroups);
	}, [listsQuery, groupDetails, groupsQuery, setList]);

	const { mutateAsync: removeListMutation } = useMutation(deleteListAction, {
		onSuccess: async response => {
			query.setQueryData<IList[] | undefined>([QueryKey.lists], (lists: IList[] | undefined) =>
				lists?.filter(list => list._id !== response.data?._id)
			);
			toast.success('Lista usunięta');
		},
	});

	const removenUserFromTasksMutation = useMutation(removeUsersFromTasksAction, {
		onSuccess: async response => {
			query.setQueryData<ITask[] | undefined>([QueryKey.tasksOfCurrentList, response.data?.parentFolderId], (tasks: ITask[] | undefined) =>
				tasks?.map(task => {
					return { ...task, assigned: undefined };
				})
			);
			toast.success('Przypisania usunięte');
		},
	});

	const { mutate: updateMembersListMutation, isLoading: updateMembersListLoading } = useMutation(updateMembersList, {
		onSuccess: async response => {
			query.invalidateQueries([QueryKey.getListById, response.data?._id]);
			query.invalidateQueries([QueryKey.lists]);
			toast.success('Użytkownik usunięty z listy');

			if (!!response.data?._id) removenUserFromTasksMutation.mutate({ parentFolderId: response.data?._id });
		},
	});

	const { mutate: editListThemeMutation } = useMutation(editListThemeAction, {
		onSuccess: async response => {
			query.setQueryData<IList | undefined>([QueryKey.getListById, response.data?._id], (list: IList | undefined) =>
				list?._id === response.data?._id ? { ...list, themeColor: response.data?.themeColor } : list
			);
			query.setQueryData<ITask[] | undefined>([QueryKey.tasksOfCurrentList, response.data?._id], (tasks: ITask[] | undefined) =>
				tasks?.map(task => (task.parentFolderId === response.data?._id ? { ...task, themeColor: response.data?.themeColor } : task))
			);
			query.setQueryData<IList[] | undefined>([QueryKey.lists], (lists: IList[] | undefined) =>
				lists?.map(list => (list._id === response.data?._id ? { ...list, themeColor: response.data?.themeColor } : list))
			);
			toast.success(`Motyw zmieniony na ${response.data?.themeColor}`);
		},
	});

	const { mutate: leaveListMutation } = useMutation(updateMembersList, {
		onSuccess: () => {
			query.invalidateQueries([QueryKey.getListById]);
			query.invalidateQueries([QueryKey.lists]);
			toast.success('Opuściłeś listę');
			onHandleSwitchToFirstListItem();
		},
	});

	return {
		getListsLoading,
		removeListMutation,
		updateMembersListLoading,
		updateMembersListMutation,
		editListThemeMutation,
		leaveListMutation,
	};
};
