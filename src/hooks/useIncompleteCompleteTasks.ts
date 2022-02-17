import { useCallback, useEffect, useMemo, useState } from 'react';
import { SortTaskType } from '../enums';
import { ITask, ITasksResponse, ITaskStatus } from '../interfaces/task';
import { useSort } from './useSort';
import { HttpResponse } from '../utils/http';
import { useParams } from 'react-router-dom';
import { IUseParams } from '../interfaces/app';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { changeTaskImportanceAction, changeTaskStatusAction, getTasksOfCurrentListAction } from '../actions/tasks';

interface SortType {
	key: SortTaskType;
	direction: 'asc' | 'desc';
	keyType: KeyType;
}

export type KeyType = 'string' | 'date';

export const useIncompleteCompleteTasks = () => {
	const query = useQueryClient();
	const { listId } = useParams<IUseParams>();

	const { data: tasksOfCurrentList } = useQuery<HttpResponse<ITasksResponse> | undefined>(['tasksOfCurrentList', listId], () =>
		getTasksOfCurrentListAction(listId)
	);

	const { mutate: changeTaskImportanceMutation } = useMutation(changeTaskImportanceAction, {
		onSuccess: () => {
			query.invalidateQueries(['tasksOfCurrentList', 'getImportanceTasks']);
		},
	});

	const comletedTasks = useMemo(
		() => (tasksOfCurrentList?.body?.tasks || []).filter(task => task.taskStatus === ITaskStatus.complete),
		[tasksOfCurrentList]
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
			...(tasksOfCurrentList?.body?.tasks || [])
				.sort(sorter[sort.keyType](sort.key, sort.direction))
				.filter(task => task.taskStatus === ITaskStatus.inComplete),
		],
		[tasksOfCurrentList, sort]
	);

	useEffect(() => {
		setInCompletedTasksList(sortedTasks);
	}, [tasksOfCurrentList, sort]);

	useEffect(() => {
		setComplitedTasksList(comletedTasks);
	}, [tasksOfCurrentList, sort]);

	const { mutate: changeTaskStatusMutation } = useMutation(changeTaskStatusAction, {
		onSuccess: () => {
			query.invalidateQueries(['tasksOfCurrentList']);
		},
	});

	const onMarkTaskAsCompleted = useCallback((taskId: string): void => {
		changeTaskStatusMutation({
			taskId: taskId,
			taskStatus: ITaskStatus.complete,
		});
	}, []);

	const onMarkTaskAsInCompleted = useCallback((taskId: string): void => {
		changeTaskStatusMutation({
			taskId: taskId,
			taskStatus: ITaskStatus.inComplete,
		});
	}, []);

	return {
		inCompletedTaskslist,
		setInCompletedTasksList,
		changeTaskImportanceMutation,
		completedTaskslist,
		setComplitedTasksList,
		comletedTasks,
		requestSort,
		onMarkTaskAsCompleted,
		onMarkTaskAsInCompleted,
	};
};
