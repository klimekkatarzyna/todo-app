// declare const CONFIG: Config;

export interface Config {
	api: string;
}
// TODO: create evniroments configs
// port the as as in app.use.cors

export const register = `${process.env.REACT_APP_API_LOCAL_HOST}/api/register`;
export const login = `${process.env.REACT_APP_API_LOCAL_HOST}/api/login`;
export const me = `${process.env.REACT_APP_API_LOCAL_HOST}/api/me`;
export const logout = `${process.env.REACT_APP_API_LOCAL_HOST}/api/logout`;

// main list
export const getMainList = `${process.env.REACT_APP_API_LOCAL_HOST}/api/getMainList`;

// list
export const getLists = `${process.env.REACT_APP_API_LOCAL_HOST}/api/getLists`;
export const getListById = `${process.env.REACT_APP_API_LOCAL_HOST}/api/getList`;
export const createList = `${process.env.REACT_APP_API_LOCAL_HOST}/api/createList`;
export const editList = `${process.env.REACT_APP_API_LOCAL_HOST}/api/editList`;
export const removeList = `${process.env.REACT_APP_API_LOCAL_HOST}/api/removeList`;

// task
export const createTask = `${process.env.REACT_APP_API_LOCAL_HOST}/api/createTask`;
export const editTask = `${process.env.REACT_APP_API_LOCAL_HOST}/api/editTask`;
export const getTasks = `${process.env.REACT_APP_API_LOCAL_HOST}/api/getTasks`;
export const getTask = `${process.env.REACT_APP_API_LOCAL_HOST}/api/getTask`;
export const changeTaskStatus = `${process.env.REACT_APP_API_LOCAL_HOST}/api/changeTaskStatus`;
export const removeTask = `${process.env.REACT_APP_API_LOCAL_HOST}/api/removeTask`;
export const changeTaskImportance = `${process.env.REACT_APP_API_LOCAL_HOST}/api/changeTaskImportance`;
export const addTaskToImportantList = `${process.env.REACT_APP_API_LOCAL_HOST}/api/addTaskToImportantList`;
export const addTaskToMyDay = `${process.env.REACT_APP_API_LOCAL_HOST}/api/addTaskToMyDay`;

// group
export const createGroup = `${process.env.REACT_APP_API_LOCAL_HOST}/api/createGroup`;
export const getGroups = `${process.env.REACT_APP_API_LOCAL_HOST}/api/getGroups`;
export const removeGroup = `${process.env.REACT_APP_API_LOCAL_HOST}/api/removeGroup`;
export const editGroup = `${process.env.REACT_APP_API_LOCAL_HOST}/api/editGroup`;

// sharing
export const addInvitationTokenToList = `${process.env.REACT_APP_API_LOCAL_HOST}/api/addInvitationTokenToList`;
export const addUserToMemberOfList = `${process.env.REACT_APP_API_LOCAL_HOST}/api/addUserToMemberOfList`;
export const removeMemberFromList = `${process.env.REACT_APP_API_LOCAL_HOST}/api/removeMemberFromList`;
export const removeInvitation = `${process.env.REACT_APP_API_LOCAL_HOST}/api/removeInvitation`;

// importance tasks
export const getImportanceTasks = `${process.env.REACT_APP_API_LOCAL_HOST}/api/getImportanceTasks`;
