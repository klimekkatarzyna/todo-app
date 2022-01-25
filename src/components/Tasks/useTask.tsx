import React, { useCallback } from 'react';
import { http, HttpResponse } from '../../utils/http';
import * as api from '../../services';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router';
import { IUseParams } from '../../interfaces/app';
import { IChangeTaskStatusToCompleteProps, IChangeTaskImportanceProps, ICreateTaskProps, IAddTaskToMyDayProps } from '../../interfaces/task';
import { Importance, SortType } from '../../enums';
import { IDeleteTaskResponse, ITask, ITasksResponse, ITaskStatus } from '../../interfaces/task';

export const useTask = () => {
	const query = useQueryClient();
	const { listId, taskId } = useParams<IUseParams>();

	const createTaskAction = useCallback(
		async ({ title, parentFolderId, importance, themeColor }: ICreateTaskProps) =>
			await http<ITask>(api.createTask, 'POST', {
				title,
				importance: importance || Importance.normal,
				parentFolderId,
				themeColor: themeColor,
				taskStatus: ITaskStatus.inComplete,
				sortType: SortType.createdAt,
				isMyDay: false,
			}),
		[]
	);
	const {
		mutate: createTaskMutation,
		error: createTaskError,
		isLoading: createTaskLoading,
	} = useMutation(createTaskAction, {
		onSuccess: () => {
			query.invalidateQueries(['tasksOfCurrentList']);
		},
	});

	const getTasksOfCurrentListAction = useCallback(async () => {
		const sortType = SortType.createdAt;
		if (!listId) return;
		try {
			const response = await http<ITasksResponse>(`${api.getTasks}/${listId}`, 'GET');
			return response;
		} catch (err) {
			console.error(err);
		}
	}, [listId]);

	const {
		data: tasksOfCurrentList,
		isLoading: getTasksOfCurrentListLoading,
		error: getTasksOfCurrentListError,
	} = useQuery<HttpResponse<ITasksResponse> | undefined>(['tasksOfCurrentList', listId], getTasksOfCurrentListAction);

	const changeTaskStatusAction = useCallback(
		async ({ taskId, taskStatus }: IChangeTaskStatusToCompleteProps) => await http(`${api.changeTaskStatus}/${taskId}`, 'PATCH', { taskStatus }),
		[]
	);
	const { mutate: changeTaskStatusMutation } = useMutation(changeTaskStatusAction, {
		onSuccess: () => {
			query.invalidateQueries(['tasksOfCurrentList']);
		},
	});

	const deleteTaskAction = useCallback(async (taskId: string) => await http<IDeleteTaskResponse>(api.removeTask, 'DELETE', { taskId }), []);
	const { mutate: removeTaskMutation } = useMutation(deleteTaskAction, {
		onSuccess: () => {
			query.invalidateQueries(['tasksOfCurrentList']);
		},
	});

	const getTaskAction = useCallback(async () => {
		if (!taskId) return;
		try {
			const response = await http<any>(`${api.getTask}/${taskId}`, 'GET'); // TODO: fix
			return response.body?.[0];
		} catch (err) {
			console.log(err);
		}
	}, [taskId]);

	const { data: taskData, isLoading: taskDataLoading, error: getTaskError } = useQuery<any>(['getTask', taskId], getTaskAction); // TODO: fix me

	const onMarkTaskAsCompleted = useCallback((taskId: string): void => {
		changeTaskStatusMutation({
			taskId: taskId,
			taskStatus: ITaskStatus.complete,
		});
	}, []);

	const onMarkTaskAsInCompleted = useCallback((taskId: string): void => {
		changeTaskStatusMutation({
			taskId: taskId,
			taskStatus: ITaskStatus.inComplete,
		});
	}, []);

	const changeTaskImportanceAction = useCallback(
		async ({ taskId, importance }: IChangeTaskImportanceProps) =>
			await http(`${api.changeTaskImportance}/${listId}/${taskId}`, 'PATCH', {
				importance,
			}),
		[]
	);
	const { mutate: changeTaskImportanceMutation } = useMutation(changeTaskImportanceAction, {
		onSuccess: () => {
			query.invalidateQueries(['tasksOfCurrentList']);
		},
	});

	const addTaskToMyDayAction = useCallback(
		async ({ taskId, isMyDay }: IAddTaskToMyDayProps) => await http(`${api.addTaskToMyDay}/${listId}/${taskId}`, 'PATCH', { isMyDay }),
		[]
	);

	return {
		createTaskMutation,
		getTasksOfCurrentListLoading,
		tasksOfCurrentList,
		changeTaskStatusMutation,
		removeTaskMutation,
		taskData,
		taskDataLoading,
		onMarkTaskAsCompleted,
		onMarkTaskAsInCompleted,
		changeTaskImportanceMutation,
		addTaskToMyDayAction,
	};
};
