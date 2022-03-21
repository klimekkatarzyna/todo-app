import { AppColorType } from '../enums';
import { ITask, Importance } from '@kkrawczyk/common/src/types';

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

export type ITaskType = 'createdAt' | 'importance' | 'parentFolderId' | 'groupName' | 'title' | 'themeColor' | '_id' | 'taskStatus' | 'deadline';

export enum ITaskStatus {
	inComplete = 'inComplete',
	complete = 'complete',
}

export interface IChangeTaskStatusToCompleteProps {
	taskId: string | undefined;
	taskStatus: ITaskStatus;
}

export interface IChangeTaskImportanceProps {
	listId: string;
	taskId: string | undefined;
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
	taskId: string | undefined;
	taskName: string;
	parentId: string;
}
