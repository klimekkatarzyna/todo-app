import { useCallback, useEffect, useMemo, useState, useContext } from 'react';
import { QueryKey, SortTaskType } from '../enums';
import { useSort } from './useSort';
import { useParams } from 'react-router-dom';
import { IQueryError, IUseParams } from '../interfaces/app';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deleteTaskAction, getTasksOfCurrentListAction } from '../actions/tasks';
import { SocketContext } from '../providers/SocketProvider';
import { ITask, ITaskStatus } from '@kkrawczyk/todo-common';
import { useRecoilState } from 'recoil';
import { completedTasksListState, inCompletedTasksListState } from '../atoms/tasks';
import toast from 'react-hot-toast';
import { TasksContextMenuContext } from '../providers/TasksContextMenuProvider';
import { useTask } from './tasks/useTask';
import { AuthContext, AuthContextType } from '../AuthProvider';

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
	const [inCompletedTaskslist, setInCompletedTasksList] = useRecoilState(inCompletedTasksListState);
	const [completedTaskslist, setComplitedTasksList] = useRecoilState(completedTasksListState);
	const { sorter } = useSort<ITask>();

	const { data: tasksOfCurrentList, isLoading: getTasksOfCurrentListLoading } = useQuery<ITask[] | undefined>(
		[QueryKey.tasksOfCurrentList, listId],
		() => getTasksOfCurrentListAction({ parentFolderId: listId }),
		{ enabled: !!listId }
	);
	// useEffect(() => {
	// 	setInCompletedTasksList(tasksOfCurrentList || []);
	// }, []);

	const [sort, setSort] = useState<SortType>({ key: SortTaskType.title, direction: 'asc', keyType: 'string' });
	const sortedTasks = useMemo(
		() => [...(tasksOfCurrentList || []).sort(sorter[sort.keyType](sort.key, sort.direction))],
		[tasksOfCurrentList, sort]
	);

	const requestSort = useCallback(event => {
		const property = event.target.value.split(',');
		setSort(state => ({ ...state, key: property[0], keyType: property[1] }));
	}, []);

	useEffect(() => {
		const taskListener = (newTask: ITask) =>
			listId === newTask?.parentFolderId && query.setQueryData(QueryKey.tasksOfCurrentList, [...(tasksOfCurrentList || []), newTask]);
		// listId === newTask?.parentFolderId && setInCompletedTasksList([...(tasksOfCurrentList || []), newTask]);

		socket?.on('add-task', taskListener);

		return () => {
			socket?.off('add-task', taskListener);
		};
	}, [query]);

	useEffect(() => {
		// TODO: powtarza sie kod wiec to nie jest programowanie rekreatywne!! wydzielic do osobnej funkcji
		const taskListener = (newTask: ITask) =>
			listId === newTask?.parentFolderId &&
			query.setQueryData(QueryKey.tasksOfCurrentList, [...[...(sortedTasks || [])].filter((task: ITask) => task._id !== newTask._id)]);
		// setInCompletedTasksList([...[...(inCompletedTaskslist || [])].filter((task: ITask) => task._id !== newTask._id)]);
		socket?.on('remove-task', taskListener);

		return () => {
			socket?.off('remove-task', taskListener);
		};
	}, [sortedTasks]);

	useEffect(() => {
		const taskListener = (newTask: ITask) => {
			listId === newTask?.parentFolderId &&
				query.setQueryData(QueryKey.tasksOfCurrentList, [
					...(sortedTasks || []).map((task: ITask) => (task._id === newTask._id ? { ...task, title: newTask.title } : task)),
				]);
		};

		socket?.on('edit-task', taskListener);

		return () => {
			socket?.off('edit-task', taskListener);
		};
	}, [sortedTasks]);

	useEffect(() => {
		const taskListener = (newTask: ITask) =>
			listId === newTask?.parentFolderId &&
			query.setQueryData(QueryKey.tasksOfCurrentList, [
				...(sortedTasks || []).map((task: ITask) => (task._id === newTask._id ? { ...task, taskStatus: newTask.taskStatus } : task)),
			]);

		socket?.on('change-task-status', taskListener);

		return () => {
			socket?.off('change-task-status', taskListener);
		};
	}, [sortedTasks]);

	const incomletedTasks = useMemo(
		() => (tasksOfCurrentList || []).filter(task => task.taskStatus === ITaskStatus.inComplete),
		[tasksOfCurrentList]
	);
	const comletedTasks = useMemo(() => (tasksOfCurrentList || []).filter(task => task.taskStatus === ITaskStatus.complete), [tasksOfCurrentList]);

	return {
		inCompletedTaskslist: incomletedTasks,
		setInCompletedTasksList,
		completedTaskslist: comletedTasks,
		setComplitedTasksList,
		requestSort,
		getTasksOfCurrentListLoading,
		listId,
	};
};
