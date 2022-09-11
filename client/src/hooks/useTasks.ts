import { useCallback, useMemo, useState } from 'react';
import { QueryKey, SortTaskType } from '../enums';
import { useParams } from 'react-router-dom';
import { IUseParams } from '../interfaces/app';
import { useQuery } from 'react-query';
import { getTasksOfCurrentListAction } from '../api/tasks';
import { ITask, ITaskStatus } from '@kkrawczyk/todo-common';

interface SortType {
	key: SortTaskType;
	keyType: KeyType;
}

export type KeyType = 'string' | 'date';

export const useTasks = () => {
	const { listId } = useParams<IUseParams>();
	// const { sorter } = useSort<ITask>();

	const { data: tasksOfCurrentList, isLoading } = useQuery<ITask[] | undefined>(
		[QueryKey.tasksOfCurrentList, listId],
		() => getTasksOfCurrentListAction({ parentFolderId: listId }),
		{ enabled: !!listId }
	);

	const [, setSort] = useState<SortType>({ key: SortTaskType.title, keyType: 'string' });

	const requestSort = useCallback((data: SortTaskType, type: KeyType) => {
		setSort(state => ({ ...state, key: data, keyType: type }));
	}, []);

	const unCompletedTasks = useMemo(
		() => (tasksOfCurrentList || []).filter(task => task.taskStatus === ITaskStatus.unComplete),
		[tasksOfCurrentList]
	);
	const completedTasks = useMemo(() => (tasksOfCurrentList || []).filter(task => task.taskStatus === ITaskStatus.complete), [tasksOfCurrentList]);

	// const sortedTasks = useMemo(() => [...(tasksOfCurrentList || []).sort(sorter[sort.keyType](sort.key))], [tasksOfCurrentList, sort, sorter]);

	return {
		requestSort,
		listId,
		isLoading,
		unCompletedTasks,
		completedTasks,
	};
};
