import { useCallback, useEffect, useMemo, useState, useContext } from 'react';
import { QueryKey, SortTaskType } from '../enums';
import { useSort } from './useSort';
import { useParams } from 'react-router-dom';
import { IUseParams } from '../interfaces/app';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { changeTaskImportanceAction, changeTaskStatusAction, deleteTaskAction, getTaskAction, getTasksOfCurrentListAction } from '../actions/tasks';
import { SocketContext } from '../providers/SocketProvider';
import { ITask, ITaskStatus } from '@kkrawczyk/todo-common';
import { useRecoilState } from 'recoil';
import { completedTasksListState, inCompletedTasksListState } from '../atoms/tasks';
import { ContextualMenuContext } from '../ContextualMenuProvider';

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
	const { contextualMenu } = useContext(ContextualMenuContext);
	const [inCompletedTaskslist, setInCompletedTasksList] = useRecoilState(inCompletedTasksListState);
	const [completedTaskslist, setComplitedTasksList] = useRecoilState(completedTasksListState);

	const { mutate: changeTaskImportanceMutation } = useMutation(changeTaskImportanceAction, {
		onSuccess: () => {
			query.invalidateQueries('getImportanceTasks');
			query.invalidateQueries('tasksOfCurrentList');
			query.invalidateQueries('getTask');
		},
	});

	const { data: tasksOfCurrentList, isLoading: getTasksOfCurrentListLoading } = useQuery<ITask[] | undefined>(
		[QueryKey.tasksOfCurrentList, listId],
		() => getTasksOfCurrentListAction({ parentFolderId: listId })
	);

	const { data: taskData, isLoading: taskDataLoading } = useQuery<ITask | undefined>([QueryKey.getTask, taskId], () =>
		getTaskAction({ _id: taskId })
	);

	const { mutate: removeTaskMutation } = useMutation(
		() => deleteTaskAction({ _id: contextualMenu?.elementId, parentFolderId: taskData?.parentFolderId }),
		{
			onSuccess: () => {
				query.invalidateQueries(['tasksOfCurrentList']);
			},
		}
	);

	const comletedTasks = useMemo(() => (tasksOfCurrentList || []).filter(task => task.taskStatus === ITaskStatus.complete), [tasksOfCurrentList]);

	const [sort, setSort] = useState<SortType>({ key: SortTaskType.title, direction: 'asc', keyType: 'string' });

	const requestSort = useCallback(event => {
		const property = event.target.value.split(',');
		setSort(state => ({ ...state, key: property[0], keyType: property[1] }));
	}, []);

	const { sorter } = useSort<ITask>();

	const sortedTasks = useMemo(
		() => [
			...(tasksOfCurrentList || [])
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

	const onMarkTaskAsCompleted = useCallback((_id: string | undefined): void => {
		changeTaskStatusMutation({
			_id: _id,
			taskStatus: ITaskStatus.complete,
		});
	}, []);

	const onMarkTaskAsInCompleted = useCallback((_id: string | undefined): void => {
		changeTaskStatusMutation({
			_id: _id,
			taskStatus: ITaskStatus.inComplete,
		});
	}, []);

	const onHandleChangeTaskStatus = useCallback(() => {
		taskData?.taskStatus === ITaskStatus.inComplete && onMarkTaskAsCompleted(taskData?._id);
		taskData?.taskStatus === ITaskStatus.complete && onMarkTaskAsInCompleted(taskData?._id);
	}, [taskData]);

	useEffect(() => {
		[...(tasksOfCurrentList || [])]
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
