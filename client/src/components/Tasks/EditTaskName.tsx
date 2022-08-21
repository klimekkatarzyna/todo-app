import { FC, useCallback } from 'react';
import { useMutation } from 'react-query';
import { editTaskAction } from '../../actions/tasks';
import { ITask, createEditTaskSchema, CreateEditTaskType } from '@kkrawczyk/todo-common';
import { isStringContainsOnlyWhitespace } from '../../utils/utilsFunctions';
import toast from 'react-hot-toast';
import { TitleForm } from '../TitleForm';

export const EditTaskName: FC<{ taskData: ITask | undefined }> = ({ taskData }) => {
	const { mutateAsync, isLoading } = useMutation(editTaskAction, {
		onSuccess: () => {
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
