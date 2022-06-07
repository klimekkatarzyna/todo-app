import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deleteListAction, getListsAction } from '../actions/lists';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { listsState } from '../atoms';
import { IGroup, IList } from '@kkrawczyk/todo-common';
import { QueryKey } from '../enums';
import toast from 'react-hot-toast';
import { IQueryError } from '../interfaces/app';
import { groupState } from '../atoms/group';
import { getGroups } from '../actions/groups';

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
	}, [listsQuery, groupDetails]);

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
