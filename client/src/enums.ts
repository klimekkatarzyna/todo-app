export enum InputVersion {
	primary = 'primary',
	secondary = 'secondary',
}

export enum ContextMenuOpion {
	add_to_myday = 'add_to_myday',
	remove_from_myday = 'remove_from_myday',
	mark_as_important = 'mark_as_important',
	remove_importance = 'remove_importance',
	mark_as_complete = 'mark_as_complete',
	mark_as_incomplete = 'mark_as_incomplete',
	date_today = 'date_today',
	date_tomorrow = 'date_tomorrow',
	move_task = 'move_task',
	copy_task = 'copy_task',
	remove_task = 'remove_task',
	sharing_options = 'sharing_options',
	move_list_to = 'move_list_to',
	duplicate_list = 'duplicate_list',
	print_list = 'print_list',
	remove_list = 'remove_list',
	remove_group = 'remove_group',
	edit_group_name = 'edit_group_name',
	leave_list = 'leave_list',
}

export enum ROUTE {
	register = '/register',
	login = '/login',
	home = '/',
	myDay = '/my-day',
	listsDetails = '/lists-details/:listId',
	tasks = '/tasks',
	tasksDetails = '/tasks/:listId/:taskId',
	planned = '/planned',
	important = '/important',
	assigned = '/assigned-to-me',
	inbox = '/inbox',
	jointToList = '/joint-to-list',
	search = '/search',
	sharing = '/sharing',
}

export enum SideMenu {
	myDay = 'my-day',
	tasks = 'tasks',
	planned = 'planned',
	important = 'important',
	assigned = 'assigned-to-me',
	inbox = 'inbox',
	jointToList = 'joint-to-list',
	search = 'search',
}

export type AppColorType = 'grey' | 'blue' | 'red' | 'green';

export enum SortType {
	draggedItem = 0,
	createdAt = 'createdAt',
	alphabetically = 2,
	deadline = 3,
	importance = 4,
	addedToDayly = 5,
}

export enum SortTaskType {
	createdAt = 'createdAt',
	title = 'title',
	importance = 'importance',
	deadline = 'deadline',
}

export enum QueryKey {
	checkSession = 'checkSession',
	getListById = 'getListById',
	getListDatatoShare = 'getListDatatoShare',
	getImportanceTasks = 'getImportanceTasks',
	tasksOfCurrentList = 'tasksOfCurrentList',
	getTask = 'getTask',
	lists = 'lists',
	getMainList = 'getMainList',
	groups = 'groups',
	getMyDayTasks = 'getMyDayTasks',
	getUser = 'getUser',
	getAssignedTasks = 'getAssignedTasks',
	tasksList = 'tasksList',
}
