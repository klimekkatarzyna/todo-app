import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deleteListAction, editListThemeAction, getListsAction } from '../actions/lists';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { listsState } from '../atoms';
import { IGroup, IList, ITask } from '@kkrawczyk/todo-common';
import { QueryKey } from '../enums';
import toast from 'react-hot-toast';
import { IQueryError } from '../interfaces/app';
import { groupState } from '../atoms/group';
import { getGroups } from '../actions/groups';
import { updateMembersList } from '../actions/sharing';

export const useList = () => {
	const query = useQueryClient();
	const { isLoading: getListsLoading, data: listsQuery } = useQuery<IList[] | undefined>([QueryKey.lists], getListsAction);
	const { data: groupsQuery } = useQuery<IGroup[] | undefined>(QueryKey.groups, getGroups);

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
				lists?.filter(list => list._id !== response.body?._id)
			);
			toast.success('Lista usunięta');
		},
		onError: (error: IQueryError) => {
			toast.error(`Coś poszlo nie tak: ${error.err.message}`);
		},
	});

	const { mutate: updateMembersListMutation, isLoading: updateMembersListLoading } = useMutation(updateMembersList, {
		onSuccess: async response => {
			query.invalidateQueries([QueryKey.getListById, response.body?._id]);
			query.invalidateQueries([QueryKey.lists]);
			toast.success('Użytkownik usunięty z listy');
		},
		onError: (error: IQueryError) => {
			toast.error(`Coś poszlo nie tak: ${error.err.message}`);
		},
	});

	const { mutate: editListThemeMutation } = useMutation(editListThemeAction, {
		onSuccess: async response => {
			query.setQueryData<IList | undefined>([QueryKey.getListById, response.body?._id], (list: IList | undefined) =>
				list?._id === response.body?._id ? { ...list, themeColor: response.body?.themeColor } : list
			);
			query.setQueryData<ITask[] | undefined>([QueryKey.tasksOfCurrentList, response.body?._id], (tasks: ITask[] | undefined) =>
				tasks?.map(task => (task.parentFolderId === response.body?._id ? { ...task, themeColor: response.body?.themeColor } : task))
			);
			query.setQueryData<IList[] | undefined>([QueryKey.lists], (lists: IList[] | undefined) =>
				lists?.map(list => (list._id === response.body?._id ? { ...list, themeColor: response.body?.themeColor } : list))
			);
		},
		onError: (error: IQueryError) => {
			toast.error(`Coś poszlo nie tak: ${error.err.message}`);
		},
	});

	return {
		getListsLoading,
		removeListMutation,
		updateMembersListLoading,
		updateMembersListMutation,
		editListThemeMutation,
	};
};
