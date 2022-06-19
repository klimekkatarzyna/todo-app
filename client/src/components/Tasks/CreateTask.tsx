import { useCallback, useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { createTaskAction } from '../../actions/tasks';
import { IQueryError } from '../../interfaces/app';
import { ITask, createEditTaskSchema, CreateEditTaskType, AppColor } from '@kkrawczyk/todo-common';
import { isStringContainsWhitespace } from '../../utils/utilsFunctions';
import { QueryKey } from '../../enums';
import toast from 'react-hot-toast';
import { TitleForm } from '../TitleForm';
import { AuthContext, AuthContextType } from '../../AuthProvider';
import { useListDetails } from '../../hooks/useListDetails';
import { HttpResponse } from '../../utils/http';

export const CreateTask = () => {
	const query = useQueryClient();
	const { authData } = useContext<AuthContextType>(AuthContext);
	const { members, parentFolderId } = useListDetails();
	const membersArray = [authData?._id].concat(members);

	const addTaskToList = useCallback((tasks: ITask[] | undefined, response: HttpResponse<ITask>) => [...(tasks || []), response.body || {}], []);

	const { mutateAsync, isLoading } = useMutation(createTaskAction, {
		onSuccess: async response => {
			query.setQueryData<ITask[] | undefined>([QueryKey.tasksOfCurrentList, parentFolderId], (tasks: ITask[] | undefined) =>
				addTaskToList(tasks, response)
			);
			query.setQueryData<ITask[] | undefined>([QueryKey.tasksList], (tasks: ITask[] | undefined) => addTaskToList(tasks, response));
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
				themeColor: AppColor.dark,
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
