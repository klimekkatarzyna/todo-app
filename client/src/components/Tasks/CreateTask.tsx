import { useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router';
import { createTaskAction } from '../../actions/tasks';
import { IUseParams } from '../../interfaces/app';
import { ITask, createEditTaskSchema, CreateEditTaskType, AppColorTypeEnum } from '@kkrawczyk/todo-common';
import { isStringContainsWhitespace } from '../../utils/utilsFunctions';
import { QueryKey } from '../../enums';
import toast from 'react-hot-toast';
import { TitleForm } from '../TitleForm';

export const CreateTask = () => {
	const query = useQueryClient();
	const { listId } = useParams<IUseParams>();

	const { mutate, isLoading } = useMutation(createTaskAction, {
		onSuccess: () => {
			query.invalidateQueries([QueryKey.tasksOfCurrentList]);
			toast.success('Zadanie dodane');
		},
		onError: error => {
			toast.error(`Coś poszlo nie tak: ${error}`);
		},
	});

	const initialValues: ITask = { title: '' };

	const onSubmit = useCallback(
		async (values: CreateEditTaskType, { resetForm }) => {
			if (isStringContainsWhitespace(values.title)) return;
			await mutate({
				title: values.title,
				parentFolderId: listId,
				themeColor: AppColorTypeEnum.blue,
			});
			resetForm();
		},
		[listId]
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
