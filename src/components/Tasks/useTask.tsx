import React, { useCallback } from 'react';
import { http, HttpResponse } from '../../utils/http';
import * as api from '../../services';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router';
import { IUseParams } from '../../interfaces/app';
import {
	IChangeTaskStatusToCompleteProps,
	IChangeTaskImportanceProps,
	ICreateTaskProps,
	IAddTaskToMyDayProps,
} from '../../interfaces/task';
import { Importance, SortType } from '../../enums';
import { IDeleteTaskResponse, ITask, ITasksResponse, ITaskStatus } from '../../interfaces/task';

export const useTask = () => {
	const query = useQueryClient();
	const { listId, taskId } = useParams<IUseParams>();

	const createTask = useCallback(async ({ title, parentFolderId, importance, themeColor }: ICreateTaskProps) => {
		try {
			const response = await http<ITask>(api.createTask, 'POST', {
				title,
				importance: importance || Importance.normal,
				parentFolderId,
				themeColor: themeColor,
				taskStatus: ITaskStatus.inComplete,
				sortType: SortType.createdAt,
				isMyDay: false,
			});
			return response;
		} catch (err) {
			console.error(err);
		}
	}, []);

	const { mutate: mutateCreateTask } = useMutation(createTask, {
		onSuccess: () => {
			query.invalidateQueries(['tasksOfCurrentList']);
		},
	});

	const getTasksOfCurrentList = useCallback(async () => {
		const sortType = SortType.createdAt;
		if (!listId) return;
		try {
			const response = await http<ITasksResponse>(`${api.getTasks}/${listId}`, 'GET');
			return response;
		} catch (err) {
			console.error(err);
		}
	}, [listId]);

	const { data: getTasksOfCurrentListQuery, isLoading: getTasksOfCurrentListLoading } = useQuery(
		['tasksOfCurrentList', listId],
		getTasksOfCurrentList
	);

	const changeTaskStatus = useCallback(async ({ taskId, taskStatus }: IChangeTaskStatusToCompleteProps) => {
		try {
			const response = await http<any>(`${api.changeTaskStatus}/${taskId}`, 'PATCH', { taskStatus }); // TODO: fix
			return response;
		} catch (err) {
			console.log(err);
		}
	}, []);

	const { mutate: mutateChangeTaskStatus } = useMutation(changeTaskStatus, {
		onSuccess: () => {
			query.invalidateQueries(['tasksOfCurrentList']);
		},
	});

	const deleteTask = useCallback(async (taskId: string) => {
		try {
			const response = await http<IDeleteTaskResponse>(api.removeTask, 'DELETE', { taskId });
			return response;
		} catch (err) {
			console.log(err);
		}
	}, []);

	const { mutate: mutateRemoveTask } = useMutation(deleteTask, {
		onSuccess: () => {
			query.invalidateQueries(['tasksOfCurrentList']);
		},
	});

	const getTask = useCallback(async () => {
		if (!taskId) return;
		try {
			const response = await http<any>(`${api.getTask}/${taskId}`, 'GET'); // TODO: fix
			return response.body?.[0];
		} catch (err) {
			console.log(err);
		}
	}, [taskId]);

	const { data: taskData, isLoading: taskDataLoading } = useQuery(['getTask', taskId], getTask);

	const onMarkTaskAsCompleted = useCallback((taskId: string): void => {
		mutateChangeTaskStatus({
			taskId: taskId,
			taskStatus: ITaskStatus.complete,
		});
	}, []);

	const onMarkTaskAsInCompleted = useCallback((taskId: string): void => {
		mutateChangeTaskStatus({
			taskId: taskId,
			taskStatus: ITaskStatus.inComplete,
		});
	}, []);

	const changeTaskImportance = useCallback(async ({ taskId, importance }: IChangeTaskImportanceProps) => {
		try {
			const response = await http<any>(`${api.changeTaskImportance}/${listId}/${taskId}`, 'PATCH', {
				importance,
			}); // TODO: fix
			return response;
		} catch (err) {
			console.log(err);
		}
	}, []);

	const { mutate: mutateChangeTaskImportance } = useMutation(changeTaskImportance, {
		onSuccess: () => {
			query.invalidateQueries(['tasksOfCurrentList']);
		},
	});

	const addTaskToMyDay = useCallback(async ({ taskId, isMyDay }: IAddTaskToMyDayProps) => {
		try {
			const response = await http<any>(`${api.addTaskToMyDay}/${listId}/${taskId}`, 'PATCH', { isMyDay }); // TODO: fix
			return response;
		} catch (err) {
			console.log(err);
		}
	}, []);

	return {
		mutateCreateTask,
		getTasksOfCurrentListLoading,
		getTasksOfCurrentListQuery,
		mutateChangeTaskStatus,
		mutateRemoveTask,
		taskData,
		taskDataLoading,
		onMarkTaskAsCompleted,
		onMarkTaskAsInCompleted,
		mutateChangeTaskImportance,
		addTaskToMyDay,
	};
};
