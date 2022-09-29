import { useCallback, useMemo } from 'react';
import { QueryKey } from '../enums';
import { useParams } from 'react-router-dom';
import { IUseParams } from '../interfaces/app';
import { useQuery } from 'react-query';
import { getTasksOfCurrentListAction } from '../api/tasks';
import { ITask, ITaskStatus, SortTaskString } from '@kkrawczyk/todo-common';

export const useTasks = () => {
	const { listId } = useParams<IUseParams>();

	const {
		data: tasksOfCurrentList,
		isLoading,
		refetch,
	} = useQuery<ITask[] | undefined>(
		[QueryKey.tasksOfCurrentList, listId],
		() => getTasksOfCurrentListAction({ parentFolderId: listId, sortType: sessionStorage.getItem('taskSortedType') as SortTaskString }),
		{
			enabled: !!listId,
		}
	);

	const requestSort = useCallback(
		async (data: SortTaskString) => {
			sessionStorage.setItem('taskSortedType', data);
			await refetch();
		},
		[refetch]
	);

	const inCompletedTasks = useMemo(
		() => (tasksOfCurrentList || [])?.filter(task => task.taskStatus === ITaskStatus.inComplete),
		[tasksOfCurrentList]
	);

	const completedTasks = useMemo(() => (tasksOfCurrentList || []).filter(task => task.taskStatus === ITaskStatus.complete), [tasksOfCurrentList]);

	return {
		requestSort,
		listId,
		isLoading,
		inCompletedTasks,
		completedTasks,
	};
};
