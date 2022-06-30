import { useCallback, useMemo, useState } from 'react';
import { QueryKey, SortTaskType } from '../enums';
import { useSort } from './useSort';
import { useParams } from 'react-router-dom';
import { IUseParams } from '../interfaces/app';
import { useQuery } from 'react-query';
import { getTasksOfCurrentListAction } from '../actions/tasks';
import { ITask, ITaskStatus } from '@kkrawczyk/todo-common';

interface SortType {
	key: SortTaskType;
	direction: 'asc' | 'desc';
	keyType: KeyType;
}

export type KeyType = 'string' | 'date';

export const useTasks = () => {
	const { listId } = useParams<IUseParams>();
	const { sorter } = useSort<ITask>();

	const { data: tasksOfCurrentList, isLoading } = useQuery<ITask[] | undefined>(
		[QueryKey.tasksOfCurrentList, listId],
		() => getTasksOfCurrentListAction({ parentFolderId: listId }),
		{ enabled: !!listId }
	);

	const [sort, setSort] = useState<SortType>({ key: SortTaskType.title, direction: 'asc', keyType: 'string' });
	const sortedTasks = useMemo(
		() => [...(tasksOfCurrentList || []).sort(sorter[sort.keyType](sort.key, sort.direction))],
		[tasksOfCurrentList, sort]
	);

	const requestSort = useCallback(event => {
		const property = event.target.value.split(',');
		setSort(state => ({ ...state, key: property[0], keyType: property[1] }));
	}, []);

	const inCompletedTasks = useMemo(
		() => (tasksOfCurrentList || []).filter(task => task.taskStatus === ITaskStatus.inComplete),
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
