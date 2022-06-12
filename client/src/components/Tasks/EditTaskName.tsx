import React, { FC, useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { editTaskAction } from '../../actions/tasks';
import { ITask, createEditTaskSchema, CreateEditTaskType } from '@kkrawczyk/todo-common';
import { isStringContainsWhitespace } from '../../utils/utilsFunctions';
import { QueryKey } from '../../enums';
import toast from 'react-hot-toast';
import { TitleForm } from '../TitleForm';
import { IQueryError } from '../../interfaces/app';
import { HttpResponse } from '../../utils/http';

interface IEditTaskNameProps {
	taskData: ITask;
}

export const EditTaskName: FC<IEditTaskNameProps> = ({ taskData }) => {
	const query = useQueryClient();

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
			query.setQueryData<ITask[] | undefined>([QueryKey.tasksOfCurrentList, taskData.parentFolderId], tasks =>
				updateTaskTitle(tasks, response)
			);
			toast.success('Zadanie zmienione');
		},
		onError: (error: IQueryError) => {
			toast.error(`Coś poszlo nie tak: ${error.err.message}`);
		},
		onSettled: data => {
			query.invalidateQueries([QueryKey.getTask, data]);
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
