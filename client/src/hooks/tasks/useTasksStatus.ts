import { ITask, WebSocketEvent } from '@kkrawczyk/todo-common';
import { useCallback, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { changeTaskStatusAction } from '../../actions/tasks';
import { AuthContext, AuthContextType } from '../../AuthProvider';
import { QueryKey } from '../../enums';
import { IQueryError, IUseParams } from '../../interfaces/app';
import { SocketContext } from '../../providers/SocketProvider';
import { HttpResponse } from '../../utils/http';

const useTasksStatus = () => {
	const query = useQueryClient();
	const { authData } = useContext<AuthContextType>(AuthContext);
	const { listId } = useParams<IUseParams>();
	const { socket } = useContext(SocketContext);

	useEffect(() => {
		const taskListener = (newTask: ITask) => {
			query.setQueryData<ITask[] | undefined>([QueryKey.tasksOfCurrentList, newTask?.parentFolderId], (tasks: ITask[] | undefined) =>
				listId === newTask?.parentFolderId
					? tasks?.map(task => (task._id === newTask._id ? { ...task, taskStatus: newTask.taskStatus } : task))
					: tasks
			);
		};
		socket?.on(WebSocketEvent.taskStatusChange, taskListener);

		return () => {
			socket?.off(WebSocketEvent.taskStatusChange, taskListener);
		};
	}, [listId]);

	const taskStatus = useCallback(
		(tasks: ITask[] | undefined, response: HttpResponse<ITask>) =>
			tasks?.map(task => (task._id === response.body?._id ? { ...task, taskStatus: response.body?.taskStatus } : task)),
		[]
	);

	const { mutateAsync: changeTaskStatusMutation } = useMutation(changeTaskStatusAction, {
		onSuccess: async response => {
			query.setQueryData<ITask[] | undefined>([QueryKey.tasksOfCurrentList, response.body?.parentFolderId], (tasks: ITask[] | undefined) =>
				taskStatus(tasks, response)
			);

			query.setQueryData<ITask[] | undefined>([QueryKey.getImportanceTasks], (tasks: ITask[] | undefined) => taskStatus(tasks, response));
			query.setQueryData<ITask | undefined>([QueryKey.getTask, response.body?._id], (task: ITask | undefined) =>
				task?._id === response.body?._id ? { ...task, taskStatus: response.body?.taskStatus } : task
			);

			query.setQueryData<ITask[] | undefined>([QueryKey.getMyDayTasks], (tasks: ITask[] | undefined) => taskStatus(tasks, response));
			query.setQueryData<ITask[] | undefined>([QueryKey.getAssignedTasks, authData?._id], (tasks: ITask[] | undefined) =>
				taskStatus(tasks, response)
			);
			query.setQueryData<ITask[] | undefined>([QueryKey.tasksList], (tasks: ITask[] | undefined) => taskStatus(tasks, response));
			toast.success('Status zadania zmieniony');
		},
		onError: (error: IQueryError) => {
			toast.error(`Coś poszlo nie tak: ${error.err.message}`);
		},
	});

	return {
		changeTaskStatusMutation,
	};
};

export default useTasksStatus;
