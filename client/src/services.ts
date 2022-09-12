// declare const CONFIG: Config;

import { apiUrl } from './utils/http';

export interface Config {
	api: string;
}

export const register = `${apiUrl}/api/register`;
export const login = `${apiUrl}/api/login`;
export const me = `${apiUrl}/api/me`;
export const logout = `${apiUrl}/api/logout`;
export const user = `${apiUrl}/api/user`;

// list
export const getLists = `${apiUrl}/api/lists`;
export const getListById = `${apiUrl}/api/listDetails`;
export const createList = `${apiUrl}/api/lists`;
export const editList = `${apiUrl}/api/lists`;
export const removeList = `${apiUrl}/api/lists`;
export const listTheme = `${apiUrl}/api/listTheme`;

// task
export const createTask = `${apiUrl}/api/tasks`;
export const editTask = `${apiUrl}/api/tasks`;
export const getTasks = `${apiUrl}/api/taskDetails`;
export const getAllTasks = `${apiUrl}/api/tasks`;
export const getTask = `${apiUrl}/api/tasks`;
export const changeTaskStatus = `${apiUrl}/api/taskStatuses`;
export const removeTask = `${apiUrl}/api/tasks`;
export const changeTaskImportance = `${apiUrl}/api/taskImportance`;
export const taskInMyDay = `${apiUrl}/api/myDay`;

// group
export const createGroup = `${apiUrl}/api/groups`;
export const getGroups = `${apiUrl}/api/groups`;
export const removeGroup = `${apiUrl}/api/groups`;
export const editGroup = `${apiUrl}/api/groups`;
export const addListToGroup = `${apiUrl}/api/groupsLists`;
export const unGroupLists = `${apiUrl}/api/unGroupLists`;

// sharing
export const addInvitationTokenToList = `${apiUrl}/api/invitationToken`;
export const addUserToMemberOfList = `${apiUrl}/api/members`;
export const updateMembersList = `${apiUrl}/api/members`;
export const changeInvitation = `${apiUrl}/api/invitations`;
export const getListDatatoShare = `${apiUrl}/api/listsDatatoShare`;

// importance tasks
export const getImportanceTasks = `${apiUrl}/api/importanceTasks`;

// my day tasks
export const getMyDayTasks = `${apiUrl}/api/myDayTasks`;

// assinged tasks
export const membersTask = `${apiUrl}/api/membersTask`;
export const assignedTasks = `${apiUrl}/api/assignedTasks`;
export const removeMembersFromTasks = `${apiUrl}/api/membersTasks`;
