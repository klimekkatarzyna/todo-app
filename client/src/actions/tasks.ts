import { SortType } from '../enums';
import { http } from '../utils/http';
import * as api from '../services';
import { ITask, Importance, ITaskStatus } from '@kkrawczyk/todo-common';

export const createTaskAction = async ({ title, parentFolderId, importance, themeColor }: ITask) =>
	await http<ITask>(api.createTask, 'POST', {
		title,
		importance: importance || Importance.normal,
		parentFolderId,
		themeColor: themeColor,
		taskStatus: ITaskStatus.inComplete,
		sortType: SortType.createdAt,
		isMyDay: false,
	});

export const editTaskAction = async ({ _id, title, parentFolderId }: ITask) => await http(`${api.editTask}`, 'PUT', { _id, title, parentFolderId });

export const getTasksOfCurrentListAction = async ({ parentFolderId }: ITask) => {
	const response = await http<ITask[]>(`${api.getTasks}/${parentFolderId}`, 'GET');
	return response.body;
};

export const changeTaskStatusAction = async ({ _id, taskStatus, parentFolderId }: ITask) =>
	await http(`${api.changeTaskStatus}/${_id}`, 'PATCH', { taskStatus, parentFolderId });

export const deleteTaskAction = async ({ _id, parentFolderId }: ITask) => await http(api.removeTask, 'DELETE', { _id, parentFolderId });

export const getTaskAction = async ({ _id }: ITask) => {
	const response = await http<ITask>(`${api.getTask}/${_id}`, 'GET');
	return response.body;
};

export const changeTaskImportanceAction = async ({ parentFolderId, _id, importance }: ITask) =>
	await http(`${api.changeTaskImportance}/${parentFolderId}/${_id}`, 'PATCH', {
		importance,
	});

export const taskInMyDayAction = async ({ _id, isMyDay }: ITask) => await http(`${api.taskInMyDay}/${_id}`, 'POST', { isMyDay });

export const onGetImportanceTasksAction = async () => {
	const response = await http<ITask[]>(`${api.getImportanceTasks}`, 'GET');
	return response.body;
};

export const onGetMayDayTasksAction = async () => {
	const response = await http<ITask[]>(`${api.getMyDayTasks}`, 'GET');
	return response.body;
};

export const assignUserToTask = async ({ _id, assigned }: ITask) => await http<ITask>(`${api.membersTask}`, 'POST', { _id, assigned });

export const removenUserFromTask = async ({ _id }: ITask) => await http<ITask>(`${api.membersTask}`, 'DELETE', { _id });
