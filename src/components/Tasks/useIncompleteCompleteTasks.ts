import { useCallback, useEffect, useMemo, useState } from 'react';
import { SortTaskType } from '../../enums';
import { ITask, ITaskStatus } from '../../interfaces/task';
import { useSort } from '../../hooks/useSort';
import { useTask } from './useTask';

interface SortType {
	key: SortTaskType;
	direction: 'asc' | 'desc';
	keyType: KeyType;
}

export type KeyType = 'string' | 'date';

export const useIncompleteCompleteTasks = () => {
	const { getTasksOfCurrentListQuery, onMarkTaskAsCompleted, onMarkTaskAsInCompleted, mutateChangeTaskImportance } = useTask();

	const comletedTasks = useMemo(
		() => (getTasksOfCurrentListQuery?.body?.tasks || []).filter(task => task.taskStatus === ITaskStatus.complete),
		[getTasksOfCurrentListQuery]
	);

	const [inCompletedTaskslist, setInCompletedTasksList] = useState<ITask[]>([]);
	const [completedTaskslist, setComplitedTasksList] = useState<ITask[]>(comletedTasks);
	const [sort, setSort] = useState<SortType>({ key: SortTaskType.title, direction: 'asc', keyType: 'string' });

	const requestSort = useCallback(event => {
		const property = event.target.value.split(',');
		setSort(state => ({ ...state, key: property[0], keyType: property[1] }));
	}, []);

	const { sorter } = useSort<ITask>();

	const sortedTasks = useMemo(
		() => [
			...(getTasksOfCurrentListQuery?.body?.tasks || [])
				.sort(sorter[sort.keyType](sort.key, sort.direction))
				.filter(task => task.taskStatus === ITaskStatus.inComplete),
		],
		[getTasksOfCurrentListQuery, sort]
	);

	useEffect(() => {
		setInCompletedTasksList(sortedTasks);
	}, [getTasksOfCurrentListQuery, sort]);

	return {
		inCompletedTaskslist,
		setInCompletedTasksList,
		onMarkTaskAsCompleted,
		mutateChangeTaskImportance,
		completedTaskslist,
		setComplitedTasksList,
		comletedTasks,
		onMarkTaskAsInCompleted,
		requestSort,
	};
};
