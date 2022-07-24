import { FC, useCallback, useContext, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { editTaskAction } from '../../actions/tasks';
import { ITask, createEditTaskSchema, CreateEditTaskType, WebSocketEvent } from '@kkrawczyk/todo-common';
import { isStringContainsOnlyWhitespace } from '../../utils/utilsFunctions';
import { QueryKey } from '../../enums';
import toast from 'react-hot-toast';
import { TitleForm } from '../TitleForm';
import { IUseParams } from '../../interfaces/app';
import { HttpResponse } from '../../utils/http';
import { useParams } from 'react-router-dom';
import { SocketContext } from '../../providers/SocketProvider';

export const EditTaskName: FC<{ taskData: ITask | undefined }> = ({ taskData }) => {
	const query = useQueryClient();
	const { listId } = useParams<IUseParams>();
	const { socket } = useContext(SocketContext);

	useEffect(() => {
		const taskListener = (newTask: ITask) => {
			query.setQueryData<ITask[] | undefined>([QueryKey.tasksOfCurrentList, newTask?.parentFolderId], (tasks: ITask[] | undefined) =>
				listId === newTask?.parentFolderId ? tasks?.map(task => (task._id === newTask._id ? { ...task, title: newTask.title } : task)) : tasks
			);
		};
		socket?.on(WebSocketEvent.editTask, taskListener);

		return () => {
			socket?.off(WebSocketEvent.editTask, taskListener);
		};
	}, [listId, socket]);

	const updateTaskTitle = useCallback(
		(tasks: ITask[] | undefined, response: HttpResponse<ITask>) =>
			tasks?.map(task => (task._id === response.body?._id ? { ...task, title: response.body?.title } : task)),
		[]
	);

	const { mutateAsync, isLoading } = useMutation(editTaskAction, {
		onSuccess: async response => {
			query.setQueryData<ITask[] | undefined>(QueryKey.getImportanceTasks, tasks => updateTaskTitle(tasks, response));
			query.setQueryData<ITask[] | undefined>(QueryKey.getMyDayTasks, tasks => updateTaskTitle(tasks, response));
			query.setQueryData<ITask[] | undefined>(QueryKey.getAssignedTasks, tasks => updateTaskTitle(tasks, response));
			query.setQueryData<ITask[] | undefined>(QueryKey.tasksList, tasks => updateTaskTitle(tasks, response));
			query.setQueryData<ITask>([QueryKey.getTask, response.body?._id], (task: ITask | undefined) => ({
				...task,
				title: response.body?.title,
			}));
			toast.success('Zadanie zmienione');
		},
	});

	const initialValues: ITask = { title: taskData?.title };

	const onSubmit = useCallback(
		async (values: CreateEditTaskType, { resetForm }) => {
			if (isStringContainsOnlyWhitespace(values.title)) return;
			await mutateAsync({ _id: taskData?._id, title: values.title, parentFolderId: taskData?.parentFolderId });
			resetForm();
		},
		[isStringContainsOnlyWhitespace, taskData]
	);

	return <TitleForm isLoading={isLoading} initialValues={initialValues} validationSchema={createEditTaskSchema} onSubmit={onSubmit} />;
};
