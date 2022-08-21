import { ITask, WebSocketEvent } from '@kkrawczyk/todo-common';
import { useContext, useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { QueryKey } from '../enums';
import { IUseParams } from '../interfaces/app';
import { SocketContext } from '../providers/SocketProvider';

export const useSocketEvents = () => {
	const query = useQueryClient();
	const { listId } = useParams<IUseParams>();
	const { socket } = useContext(SocketContext);

	useEffect(() => {
		const taskListener = (newTask: ITask) => {
			query.setQueryData<ITask[] | undefined>([QueryKey.tasksOfCurrentList, newTask?.parentFolderId], (tasks: ITask[] | undefined) =>
				listId === newTask?.parentFolderId ? [...[...(tasks || []), newTask]] : tasks
			);
			query.setQueryData<ITask[] | undefined>([QueryKey.tasksList], (tasks: ITask[] | undefined) => [...(tasks || []), newTask || {}]);
		};

		socket?.on(WebSocketEvent.addTask, taskListener);

		return () => {
			socket?.off(WebSocketEvent.addTask, taskListener);
		};
	}, [listId, socket]);

	useEffect(() => {
		const taskListener = (newTask: ITask) =>
			query.setQueryData<ITask[] | undefined>([QueryKey.tasksOfCurrentList, newTask?.parentFolderId], (tasks: ITask[] | undefined) =>
				listId === newTask?.parentFolderId ? tasks?.filter(task => task._id !== newTask?._id) : tasks
			);

		socket?.on(WebSocketEvent.removeTask, taskListener);

		return () => {
			socket?.off(WebSocketEvent.removeTask, taskListener);
		};
	}, [query, listId, socket]);

	useEffect(() => {
		const taskListener = (newTask: ITask) => {
			query.setQueryData<ITask[] | undefined>([QueryKey.tasksOfCurrentList, newTask?.parentFolderId], (tasks: ITask[] | undefined) =>
				listId === newTask?.parentFolderId ? tasks?.map(task => (task._id === newTask._id ? { ...task, title: newTask.title } : task)) : tasks
			);
			query.setQueryData<ITask | undefined>([QueryKey.getTask, newTask?._id], (task: ITask | undefined) =>
				listId === newTask?.parentFolderId ? { ...task, title: newTask?.title } : task
			);
		};
		socket?.on(WebSocketEvent.editTask, taskListener);

		return () => {
			socket?.off(WebSocketEvent.editTask, taskListener);
		};
	}, [query, listId, socket]);

	useEffect(() => {
		const taskListener = (newTask: ITask) => {
			query.setQueryData<ITask[] | undefined>([QueryKey.tasksOfCurrentList, newTask?.parentFolderId], (tasks: ITask[] | undefined) =>
				listId === newTask?.parentFolderId
					? tasks?.map(task => (task._id === newTask._id ? { ...task, taskStatus: newTask.taskStatus } : task))
					: tasks
			);
			query.setQueryData<ITask | undefined>([QueryKey.getTask, newTask?._id], (task: ITask | undefined) =>
				listId === newTask?.parentFolderId ? { ...task, taskStatus: newTask?.taskStatus } : task
			);
		};
		socket?.on(WebSocketEvent.taskStatusChange, taskListener);

		return () => {
			socket?.off(WebSocketEvent.taskStatusChange, taskListener);
		};
	}, [query, listId, socket]);
};
