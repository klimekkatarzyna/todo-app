import React, { FC, useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { editTaskAction } from '../../actions/tasks';
import { ITask, createEditTaskSchema, CreateEditTaskType } from '@kkrawczyk/todo-common';
import { isStringContainsWhitespace } from '../../utils/utilsFunctions';
import { QueryKey } from '../../enums';
import toast from 'react-hot-toast';
import { TitleForm } from '../TitleForm';
import { IQueryError } from '../../interfaces/app';

interface IEditTaskNameProps {
	taskData: ITask;
}

export const EditTaskName: FC<IEditTaskNameProps> = ({ taskData }) => {
	const query = useQueryClient();

	const { mutateAsync, isLoading } = useMutation(editTaskAction, {
		onSuccess: () => {
			query.invalidateQueries(QueryKey.getTask);
			query.invalidateQueries(QueryKey.tasksOfCurrentList);
			query.invalidateQueries(QueryKey.getImportanceTasks);
			query.invalidateQueries(QueryKey.getMyDayTasks);
			query.invalidateQueries(QueryKey.getAssignedTasks);
			query.invalidateQueries(QueryKey.tasksList);
			toast.success('Zadanie zmienione');
		},
		onError: (error: IQueryError) => {
			toast.error(`Coś poszlo nie tak: ${error.err.message}`);
		},
	});

	const initialValues: ITask = { title: taskData?.title };

	const onSubmit = useCallback(
		async (values: CreateEditTaskType, { resetForm }) => {
			if (isStringContainsWhitespace(values.title)) return;
			await mutateAsync({ _id: taskData._id, title: values.title, parentFolderId: taskData?.parentFolderId });
			resetForm();
		},
		[taskData]
	);

	return <TitleForm isLoading={isLoading} initialValues={initialValues} validationSchema={createEditTaskSchema} onSubmit={onSubmit} />;
};
