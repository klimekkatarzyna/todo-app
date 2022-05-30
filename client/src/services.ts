// declare const CONFIG: Config;

export interface Config {
	api: string;
}

export const register = `${process.env.REACT_APP_API_LOCAL_HOST}/api/register`;
export const login = `${process.env.REACT_APP_API_LOCAL_HOST}/api/login`;
export const me = `${process.env.REACT_APP_API_LOCAL_HOST}/api/me`;
export const logout = `${process.env.REACT_APP_API_LOCAL_HOST}/api/logout`;
export const user = `${process.env.REACT_APP_API_LOCAL_HOST}/api/user`;

// main list
export const getMainList = `${process.env.REACT_APP_API_LOCAL_HOST}/api/mainList`;

// list
export const getLists = `${process.env.REACT_APP_API_LOCAL_HOST}/api/lists`;
export const getListById = `${process.env.REACT_APP_API_LOCAL_HOST}/api/listDetails`;
export const createList = `${process.env.REACT_APP_API_LOCAL_HOST}/api/lists`;
export const editList = `${process.env.REACT_APP_API_LOCAL_HOST}/api/lists`;
export const removeList = `${process.env.REACT_APP_API_LOCAL_HOST}/api/lists`;

// task
export const createTask = `${process.env.REACT_APP_API_LOCAL_HOST}/api/tasks`;
export const editTask = `${process.env.REACT_APP_API_LOCAL_HOST}/api/tasks`;
export const getTasks = `${process.env.REACT_APP_API_LOCAL_HOST}/api/taskDetails`;
export const getAllTasks = `${process.env.REACT_APP_API_LOCAL_HOST}/api/tasks`;
export const getTask = `${process.env.REACT_APP_API_LOCAL_HOST}/api/tasks`;
export const changeTaskStatus = `${process.env.REACT_APP_API_LOCAL_HOST}/api/taskStatuses`;
export const removeTask = `${process.env.REACT_APP_API_LOCAL_HOST}/api/tasks`;
export const changeTaskImportance = `${process.env.REACT_APP_API_LOCAL_HOST}/api/taskImportance`;
export const taskInMyDay = `${process.env.REACT_APP_API_LOCAL_HOST}/api/myDay`;

// group
export const createGroup = `${process.env.REACT_APP_API_LOCAL_HOST}/api/groups`;
export const getGroups = `${process.env.REACT_APP_API_LOCAL_HOST}/api/groups`;
export const removeGroup = `${process.env.REACT_APP_API_LOCAL_HOST}/api/groups`;
export const editGroup = `${process.env.REACT_APP_API_LOCAL_HOST}/api/groups`;
export const addListToGroup = `${process.env.REACT_APP_API_LOCAL_HOST}/api/groupsLists`;

// sharing
export const addInvitationTokenToList = `${process.env.REACT_APP_API_LOCAL_HOST}/api/invitationToken`;
export const addUserToMemberOfList = `${process.env.REACT_APP_API_LOCAL_HOST}/api/members`;
export const updateMembersList = `${process.env.REACT_APP_API_LOCAL_HOST}/api/members`;
export const changeInvitation = `${process.env.REACT_APP_API_LOCAL_HOST}/api/invitations`;
export const getListDatatoShare = `${process.env.REACT_APP_API_LOCAL_HOST}/api/listsDatatoShare`;

// importance tasks
export const getImportanceTasks = `${process.env.REACT_APP_API_LOCAL_HOST}/api/importanceTasks`;

// my day tasks
export const getMyDayTasks = `${process.env.REACT_APP_API_LOCAL_HOST}/api/myDayTasks`;

// assinged tasks
export const membersTask = `${process.env.REACT_APP_API_LOCAL_HOST}/api/membersTask`;
export const assignedTasks = `${process.env.REACT_APP_API_LOCAL_HOST}/api/assignedTasks`;
