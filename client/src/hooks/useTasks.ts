import { useCallback, useEffect, useMemo, useState, useContext } from 'react';
import { QueryKey, SortTaskType } from '../enums';
import { useSort } from './useSort';
import { useParams } from 'react-router-dom';
import { IUseParams } from '../interfaces/app';
import { useQuery, useQueryClient } from 'react-query';
import { getTasksOfCurrentListAction } from '../actions/tasks';
import { SocketContext } from '../providers/SocketProvider';
import { ITask, WebSocketEvent } from '@kkrawczyk/todo-common';

interface SortType {
	key: SortTaskType;
	direction: 'asc' | 'desc';
	keyType: KeyType;
}

export type KeyType = 'string' | 'date';

export const useTasks = () => {
	const query = useQueryClient();
	const { listId } = useParams<IUseParams>();
	const { socket } = useContext(SocketContext);
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

	const webSocketEventFunction = useCallback((eventName: string, taskListener: (newTask: ITask) => void) => {
		socket?.on(eventName, taskListener);

		return () => {
			socket?.off(eventName, taskListener);
		};
	}, []);

	useEffect(() => {
		const taskListener = (newTask: ITask) =>
			query.setQueryData<ITask[] | undefined>([QueryKey.tasksOfCurrentList, newTask?.parentFolderId], (tasks: ITask[] | undefined) =>
				listId === newTask?.parentFolderId ? [...[...(tasks || []), newTask]] : tasks
			);
		webSocketEventFunction(WebSocketEvent.addTask, taskListener);
	}, []);

	useEffect(() => {
		const taskListener = (newTask: ITask) =>
			query.setQueryData<ITask[] | undefined>([QueryKey.tasksOfCurrentList, newTask?.parentFolderId], (tasks: ITask[] | undefined) =>
				listId === newTask?.parentFolderId ? tasks?.filter(task => task._id !== newTask?._id) : tasks
			);
		webSocketEventFunction(WebSocketEvent.removeTask, taskListener);
	}, []);

	useEffect(() => {
		const taskListener = (newTask: ITask) => {
			query.setQueryData<ITask[] | undefined>([QueryKey.tasksOfCurrentList, newTask?.parentFolderId], (tasks: ITask[] | undefined) =>
				listId === newTask?.parentFolderId ? tasks?.map(task => (task._id === newTask._id ? { ...task, title: newTask.title } : task)) : tasks
			);
		};
		webSocketEventFunction(WebSocketEvent.editTask, taskListener);
	}, []);

	useEffect(() => {
		const taskListener = (newTask: ITask) => {
			query.setQueryData<ITask[] | undefined>([QueryKey.tasksOfCurrentList, newTask?.parentFolderId], (tasks: ITask[] | undefined) =>
				listId === newTask?.parentFolderId
					? tasks?.map(task => (task._id === newTask._id ? { ...task, taskStatus: newTask.taskStatus } : task))
					: tasks
			);
		};
		webSocketEventFunction(WebSocketEvent.taskStatusChange, taskListener);
	}, []);

	return {
		requestSort,
		listId,
		isLoading,
		tasksOfCurrentList,
	};
};
