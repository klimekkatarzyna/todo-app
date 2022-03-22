import { SortType } from '../enums';
import {
	IAddTaskToMyDayProps,
	IChangeTaskImportanceProps,
	IChangeTaskStatusToCompleteProps,
	ICreateTaskProps,
	IDeleteTaskResponse,
	ITasksResponse,
	ITaskStatus,
	IEditTaskProps,
} from '../interfaces/task';
import { http } from '../utils/http';
import * as api from '../services';
import { ITask, Importance } from 'todo-common';

export const createTaskAction = async ({ title, parentFolderId, importance, themeColor }: ICreateTaskProps) =>
	await http<ITask>(api.createTask, 'POST', {
		title,
		importance: importance || Importance.normal,
		parentFolderId,
		themeColor: themeColor,
		taskStatus: ITaskStatus.inComplete,
		sortType: SortType.createdAt,
		isMyDay: false,
	});

export const editTaskAction = async ({ taskId, taskName, parentId }: IEditTaskProps) =>
	await http(`${api.editTask}`, 'PATCH', { taskId, taskName, parentId });

export const getTasksOfCurrentListAction = async (listId: string) => await http<ITasksResponse>(`${api.getTasks}/${listId}`, 'GET');

export const changeTaskStatusAction = async ({ taskId, taskStatus }: IChangeTaskStatusToCompleteProps) =>
	await http(`${api.changeTaskStatus}/${taskId}`, 'PATCH', { taskStatus });

export const deleteTaskAction = async (taskId: string, parentFolderId: string | undefined) =>
	await http<IDeleteTaskResponse>(api.removeTask, 'DELETE', { taskId, parentFolderId });

export const getTaskAction = async (taskId: string) => {
	const response = await http<ITask[]>(`${api.getTask}/${taskId}`, 'GET');
	return response.body?.[0];
};

export const changeTaskImportanceAction = async ({ listId, taskId, importance }: IChangeTaskImportanceProps) =>
	await http(`${api.changeTaskImportance}/${listId}/${taskId}`, 'PATCH', {
		importance,
	});

export const addTaskToMyDayAction = async ({ listId, taskId, isMyDay }: IAddTaskToMyDayProps) =>
	await http(`${api.addTaskToMyDay}/${listId}/${taskId}`, 'PATCH', { isMyDay });

export const onGetImportanceTasksAction = async () => await http<ITasksResponse>(`${api.getImportanceTasks}`, 'GET');
