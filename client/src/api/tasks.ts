import { http } from '../utils/http';
import * as api from '../services';
import { ITask, Importance, ITaskStatus } from '@kkrawczyk/todo-common';

export const createTaskAction = async ({ title, parentFolderId, importance, themeColor, createdBy, members, sortType }: ITask) =>
	await http<ITask>(api.createTask, 'POST', {
		title,
		importance: importance || Importance.normal,
		parentFolderId,
		themeColor: themeColor,
		taskStatus: ITaskStatus.inComplete,
		sortType,
		isMyDay: false,
		createdBy,
		members,
	});

export const editTaskAction = async ({ _id, title, parentFolderId }: ITask) =>
	await http<ITask>(`${api.editTask}`, 'PUT', { _id, title, parentFolderId });

export const getTasksOfCurrentListAction = async ({ parentFolderId, sortType }: ITask) => {
	const response = await http<ITask[]>(`${api.getTasks}/${parentFolderId}?sortType=${sortType}`, 'GET');
	return response.data;
};

export const getTasksAction = async () => {
	const response = await http<ITask[]>(api.getAllTasks, 'GET');
	return response.data;
};

export const changeTaskStatusAction = async ({ _id, taskStatus, parentFolderId }: ITask) =>
	await http<ITask>(`${api.changeTaskStatus}/${_id}`, 'PATCH', { taskStatus, parentFolderId });

export const deleteTaskAction = async ({ _id, parentFolderId }: ITask) => await http<ITask>(api.removeTask, 'DELETE', { _id, parentFolderId });

export const getTaskAction = async ({ _id }: ITask) => {
	const response = await http<ITask>(`${api.getTask}/${_id}`, 'GET');
	return response.data;
};

export const changeTaskImportanceAction = async ({ parentFolderId, _id, importance }: ITask) =>
	await http<ITask>(`${api.changeTaskImportance}/${parentFolderId}/${_id}`, 'PATCH', {
		importance,
	});

export const taskInMyDayAction = async ({ _id, isMyDay, parentFolderId }: ITask) =>
	await http<ITask>(`${api.taskInMyDay}/${_id}`, 'POST', { isMyDay, parentFolderId });

export const onGetImportanceTasksAction = async () => {
	const response = await http<ITask[]>(`${api.getImportanceTasks}`, 'GET');
	return response.data;
};

export const onGetMayDayTasksAction = async () => {
	const response = await http<ITask[]>(`${api.getMyDayTasks}`, 'GET');
	return response.data;
};

export const assignUserToTaskAction = async ({ _id, assigned }: ITask) => await http<ITask>(`${api.membersTask}`, 'POST', { _id, assigned });

export const removenUserFromTaskAction = async ({ _id }: ITask) => await http<ITask>(`${api.membersTask}`, 'DELETE', { _id });

export const getAssignedTasksAction = async ({ assigned }: ITask) => {
	const response = await http<ITask[]>(`${api.assignedTasks}/${assigned}`, 'GET');
	return response.data;
};

export const removeUsersFromTasksAction = async ({ parentFolderId }: ITask) =>
	await http<ITask>(`${api.removeMembersFromTasks}`, 'DELETE', { parentFolderId });
