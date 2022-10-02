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
	print_list = 'print_list',
	remove_list = 'remove_list',
	remove_group = 'remove_group',
	edit_group_name = 'edit_group_name',
	leave_list = 'leave_list',
	ungroup_lists = 'ungroup_lists',
}

export enum ROUTE {
	register = '/register',
	login = '/login',
	home = '/',
	myDay = '/my-day',
	myDayTaskDetails = '/my-day/:listId/:taskId',
	listsDetails = '/lists-details/:listId',
	tasks = '/tasks',
	tasksDetails = '/tasks/:listId/:taskId',
	planned = '/planned',
	important = '/important',
	importantTaskDetails = '/important/:listId/:taskId',
	assigned = '/assigned-to-me',
	assignedTaskDetails = '/assigned-to-me/:listId/:taskId',
	inbox = '/inbox',
	jointToList = '/joint-to-list',
	search = '/search',
	searchTaskDetails = '/search/:listId/:taskId',
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

export enum QueryKey {
	checkSession = 'checkSession',
	getListById = 'getListById',
	getListDatatoShare = 'getListDatatoShare',
	getImportanceTasks = 'getImportanceTasks',
	tasksOfCurrentList = 'tasksOfCurrentList',
	getTask = 'getTask',
	lists = 'lists',
	groups = 'groups',
	getGroup = 'getGroup',
	getMyDayTasks = 'getMyDayTasks',
	getUser = 'getUser',
	getAssignedTasks = 'getAssignedTasks',
	tasksList = 'tasksList',
}

export enum ModalType {
	confirm = 'confirm',
	sharing = 'sharing',
	assigment = 'assigment',
}
