import { AppColorType, Importance } from '../enums';

export interface ITasksResponse {
	tasks: ITask[];
}

export interface IDeleteTaskResponse {
	tasks: {
		deletedCount: number;
	};
}

export interface IGetTaskResponse {
	[key: number]: ITask;
}

export interface ITask {
	createdAt: string;
	importance: string;
	parentFolderId: string;
	groupName: string;
	title: string;
	themeColor: AppColorType;
	_id: string;
	taskStatus: ITaskStatus;
	deadline?: string;
}

export type ITaskType = 'createdAt' | 'importance' | 'parentFolderId' | 'groupName' | 'title' | 'themeColor' | '_id' | 'taskStatus' | 'deadline';

export enum ITaskStatus {
	inComplete = 'inComplete',
	complete = 'complete',
}

export interface IChangeTaskStatusToCompleteProps {
	taskId: string;
	taskStatus: ITaskStatus;
}

export interface IChangeTaskImportanceProps {
	listId: string;
	taskId: string;
	importance: Importance;
}

export interface ICreateTaskProps {
	title: string | undefined;
	parentFolderId: string;
	importance?: Importance;
	themeColor?: AppColorType;
}

export interface IAddTaskToMyDayProps {
	listId: string;
	taskId: string | undefined;
	isMyDay: boolean;
}

export interface IEditTaskProps {
	taskId: string;
	taskName: string;
	parentId: string;
}
