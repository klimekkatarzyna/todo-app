// declare const CONFIG: Config;

export interface Config {
	api: string;
}

export const register = `${process.env.REACT_APP_LOCAL_BACKEND}/api/register`;
export const login = `${process.env.REACT_APP_LOCAL_BACKEND}/api/login`;
export const me = `${process.env.REACT_APP_LOCAL_BACKEND}/api/me`;
export const logout = `${process.env.REACT_APP_LOCAL_BACKEND}/api/logout`;
export const user = `${process.env.REACT_APP_LOCAL_BACKEND}/api/user`;

// list
export const getLists = `${process.env.REACT_APP_LOCAL_BACKEND}/api/lists`;
export const getListById = `${process.env.REACT_APP_LOCAL_BACKEND}/api/listDetails`;
export const createList = `${process.env.REACT_APP_LOCAL_BACKEND}/api/lists`;
export const editList = `${process.env.REACT_APP_LOCAL_BACKEND}/api/lists`;
export const removeList = `${process.env.REACT_APP_LOCAL_BACKEND}/api/lists`;
export const listTheme = `${process.env.REACT_APP_LOCAL_BACKEND}/api/listTheme`;

// task
export const createTask = `${process.env.REACT_APP_LOCAL_BACKEND}/api/tasks`;
export const editTask = `${process.env.REACT_APP_LOCAL_BACKEND}/api/tasks`;
export const getTasks = `${process.env.REACT_APP_LOCAL_BACKEND}/api/taskDetails`;
export const getAllTasks = `${process.env.REACT_APP_LOCAL_BACKEND}/api/tasks`;
export const getTask = `${process.env.REACT_APP_LOCAL_BACKEND}/api/tasks`;
export const changeTaskStatus = `${process.env.REACT_APP_LOCAL_BACKEND}/api/taskStatuses`;
export const removeTask = `${process.env.REACT_APP_LOCAL_BACKEND}/api/tasks`;
export const changeTaskImportance = `${process.env.REACT_APP_LOCAL_BACKEND}/api/taskImportance`;
export const taskInMyDay = `${process.env.REACT_APP_LOCAL_BACKEND}/api/myDay`;

// group
export const createGroup = `${process.env.REACT_APP_LOCAL_BACKEND}/api/groups`;
export const getGroups = `${process.env.REACT_APP_LOCAL_BACKEND}/api/groups`;
export const removeGroup = `${process.env.REACT_APP_LOCAL_BACKEND}/api/groups`;
export const editGroup = `${process.env.REACT_APP_LOCAL_BACKEND}/api/groups`;
export const addListToGroup = `${process.env.REACT_APP_LOCAL_BACKEND}/api/groupsLists`;
export const unGroupLists = `${process.env.REACT_APP_LOCAL_BACKEND}/api/unGroupLists`;

// sharing
export const addInvitationTokenToList = `${process.env.REACT_APP_LOCAL_BACKEND}/api/invitationToken`;
export const addUserToMemberOfList = `${process.env.REACT_APP_LOCAL_BACKEND}/api/members`;
export const updateMembersList = `${process.env.REACT_APP_LOCAL_BACKEND}/api/members`;
export const changeInvitation = `${process.env.REACT_APP_LOCAL_BACKEND}/api/invitations`;
export const getListDatatoShare = `${process.env.REACT_APP_LOCAL_BACKEND}/api/listsDatatoShare`;

// importance tasks
export const getImportanceTasks = `${process.env.REACT_APP_LOCAL_BACKEND}/api/importanceTasks`;

// my day tasks
export const getMyDayTasks = `${process.env.REACT_APP_LOCAL_BACKEND}/api/myDayTasks`;

// assinged tasks
export const membersTask = `${process.env.REACT_APP_LOCAL_BACKEND}/api/membersTask`;
export const assignedTasks = `${process.env.REACT_APP_LOCAL_BACKEND}/api/assignedTasks`;
export const removeMembersFromTasks = `${process.env.REACT_APP_LOCAL_BACKEND}/api/membersTasks`;
