import { useCallback, useEffect, useMemo, useState, useContext } from 'react';
import { SortTaskType } from '../enums';
import { ITasksResponse, ITaskStatus } from '../interfaces/task';
import { useSort } from './useSort';
import { HttpResponse } from '../utils/http';
import { useParams } from 'react-router-dom';
import { IUseParams } from '../interfaces/app';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { changeTaskImportanceAction, changeTaskStatusAction, deleteTaskAction, getTaskAction, getTasksOfCurrentListAction } from '../actions/tasks';
import { SocketContext } from '../providers/SocketProvider';
import { TasksContext } from '../providers/TasksProvider';
import { ITask } from '@kkrawczyk/common/types';

interface SortType {
	key: SortTaskType;
	direction: 'asc' | 'desc';
	keyType: KeyType;
}

export type KeyType = 'string' | 'date';

export const useTasks = () => {
	const query = useQueryClient();
	const { listId, taskId } = useParams<IUseParams>();
	const { socket } = useContext(SocketContext);
	const { inCompletedTaskslist, completedTaskslist, setInCompletedTasksList, setComplitedTasksList } = useContext(TasksContext);

	const { data: tasksOfCurrentList } = useQuery<HttpResponse<ITasksResponse> | undefined>(['tasksOfCurrentList', listId], () =>
		getTasksOfCurrentListAction(listId)
	);

	const { mutate: changeTaskImportanceMutation } = useMutation(changeTaskImportanceAction, {
		onSuccess: () => {
			query.invalidateQueries('getImportanceTasks');
			query.invalidateQueries('tasksOfCurrentList');
			query.invalidateQueries('getTask');
		},
	});

	const { isLoading: getTasksOfCurrentListLoading } = useQuery(['tasksOfCurrentList', listId], () => getTasksOfCurrentListAction(listId));

	const { data: taskData, isLoading: taskDataLoading } = useQuery(['getTask', taskId], () => getTaskAction(taskId));

	const { mutate: removeTaskMutation } = useMutation(() => deleteTaskAction(taskId || '', taskData?.parentFolderId), {
		onSuccess: () => {
			query.invalidateQueries(['tasksOfCurrentList']);
			query.invalidateQueries('lists');
		},
	});

	const comletedTasks = useMemo(
		() => (tasksOfCurrentList?.body?.tasks || []).filter(task => task.taskStatus === ITaskStatus.complete),
		[tasksOfCurrentList]
	);

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
			query.invalidateQueries(['getImportanceTasks']);
			query.invalidateQueries(['getTask']);
		},
	});

	const onMarkTaskAsCompleted = useCallback((taskId: string | undefined): void => {
		changeTaskStatusMutation({
			taskId: taskId,
			taskStatus: ITaskStatus.complete,
		});
	}, []);

	const onMarkTaskAsInCompleted = useCallback((taskId: string | undefined): void => {
		changeTaskStatusMutation({
			taskId: taskId,
			taskStatus: ITaskStatus.inComplete,
		});
	}, []);

	const onHandleChangeTaskStatus = useCallback(() => {
		taskData?.taskStatus === ITaskStatus.inComplete && onMarkTaskAsCompleted(taskData._id);
		taskData?.taskStatus === ITaskStatus.complete && onMarkTaskAsInCompleted(taskData._id);
	}, [taskData]);

	useEffect(() => {
		[...(tasksOfCurrentList?.body?.tasks || [])]
			.sort(sorter[sort.keyType](sort.key, sort.direction))
			.filter((task: ITask) => task.taskStatus === ITaskStatus.inComplete);
	}, [tasksOfCurrentList]);

	useEffect(() => {
		const taskListener = (newTask: ITask) =>
			listId === newTask?.parentFolderId && setInCompletedTasksList([...[...(inCompletedTaskslist || []), newTask]]);
		socket?.on('add-task', taskListener);

		return () => {
			socket?.off('add-task', taskListener);
		};
	}, [inCompletedTaskslist]);

	useEffect(() => {
		// TODO: powtarza sie kod wiec to nie jest programowanie rekreatywne!! wydzielic do osobnej funkcji
		const taskListener = (newTask: ITask) =>
			listId === newTask?.parentFolderId &&
			setInCompletedTasksList([...[...(inCompletedTaskslist || [])].filter((task: ITask) => task._id !== newTask._id)]);
		socket?.on('remove-task', taskListener);

		return () => {
			socket?.off('remove-task', taskListener);
		};
	}, [inCompletedTaskslist]);

	useEffect(() => {
		const taskListener = (newTask: ITask) => {
			listId === newTask?.parentFolderId &&
				setInCompletedTasksList([
					...(inCompletedTaskslist || []).map((task: ITask) => (task._id === newTask._id ? { ...task, title: newTask.title } : task)),
				]);
		};

		socket?.on('edit-task', taskListener);

		return () => {
			socket?.off('edit-task', taskListener);
		};
	}, [inCompletedTaskslist]);

	const onChangeTaskStatus = useMemo(
		() => (taskData?.taskStatus === ITaskStatus.complete ? onMarkTaskAsInCompleted : onMarkTaskAsCompleted),
		[taskData]
	);

	return {
		inCompletedTaskslist,
		setInCompletedTasksList,
		changeTaskImportanceMutation,
		completedTaskslist,
		setComplitedTasksList,
		requestSort,
		onMarkTaskAsCompleted,
		onMarkTaskAsInCompleted,
		getTasksOfCurrentListLoading,
		removeTaskMutation,
		taskData,
		taskDataLoading,
		listId,
		onHandleChangeTaskStatus,
		onChangeTaskStatus,
	};
};
