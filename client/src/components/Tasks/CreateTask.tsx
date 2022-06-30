import { FC, useCallback, useContext, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { createTaskAction } from '../../actions/tasks';
import { IQueryError, IUseParams } from '../../interfaces/app';
import { ITask, createEditTaskSchema, CreateEditTaskType, AppColor, WebSocketEvent } from '@kkrawczyk/todo-common';
import { isStringContainsWhitespace } from '../../utils/utilsFunctions';
import toast from 'react-hot-toast';
import { TitleForm } from '../TitleForm';
import { AuthContext, AuthContextType } from '../../AuthProvider';
import { useListDetails } from '../../hooks/useListDetails';
import { QueryKey } from '../../enums';
import { useParams } from 'react-router-dom';
import { SocketContext } from '../../providers/SocketProvider';

export const CreateTask: FC<{ listTheme: AppColor | undefined }> = ({ listTheme }) => {
	const query = useQueryClient();
	const { authData } = useContext<AuthContextType>(AuthContext);
	const { members, parentFolderId } = useListDetails();
	const membersArray = [authData?._id].concat(members);
	const { listId } = useParams<IUseParams>();
	const { socket } = useContext(SocketContext);

	useEffect(() => {
		const taskListener = (newTask: ITask) =>
			query.setQueryData<ITask[] | undefined>([QueryKey.tasksOfCurrentList, newTask?.parentFolderId], (tasks: ITask[] | undefined) =>
				listId === newTask?.parentFolderId ? [...[...(tasks || []), newTask]] : tasks
			);

		socket?.on(WebSocketEvent.addTask, taskListener);

		return () => {
			socket?.off(WebSocketEvent.addTask, taskListener);
		};
	}, [listId]);

	const { mutateAsync, isLoading } = useMutation(createTaskAction, {
		onSuccess: async response => {
			query.setQueryData<ITask[] | undefined>([QueryKey.tasksList], (tasks: ITask[] | undefined) => [...(tasks || []), response.body || {}]);
			toast.success('Zadanie dodane');
		},
		onError: (error: IQueryError) => {
			toast.error(`Coś poszlo nie tak: ${error.err.message}`);
		},
	});

	const initialValues: ITask = { title: '' };

	const onSubmit = useCallback(
		async (values: CreateEditTaskType, { resetForm }) => {
			if (isStringContainsWhitespace(values.title)) return;
			await mutateAsync({
				title: values.title,
				parentFolderId,
				themeColor: listTheme,
				createdBy: authData?._id,
				members: membersArray as string[],
			});
			resetForm();
		},
		[parentFolderId]
	);

	return (
		<TitleForm
			isLoading={isLoading}
			placeholder={'Dodaj zadanie'}
			initialValues={initialValues as CreateEditTaskType}
			validationSchema={createEditTaskSchema}
			onSubmit={onSubmit}
			isIcon
		/>
	);
};
