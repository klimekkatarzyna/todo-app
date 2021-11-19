import { AppColorType, Importance } from "../enums";
import { HttpResponse } from "../utils/http";

export interface ITasksResponse extends HttpResponse {
    body: {
        tasks: ITask[];
    }
}

export interface IDeleteTaskResponse extends HttpResponse {
    body: {
        tasks: {
            deletedCount: number;
        }
    }
}

export interface IGetTaskResponse extends HttpResponse {
    body: {
        [key: number]: ITask;
    }
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
}

export enum ITaskStatus {
    inComplete = 'inComplete',
    complete = 'complete'
}

export interface IChangeTaskStatusToCompleteProps {
    taskId: string;
    taskStatus: ITaskStatus;
}

export interface IChangeTaskImportanceProps {
    taskId: string;
    importance: Importance;
}

export interface ICreateTaskProps {
    title: string | undefined;
    parentFolderId: string;
    importance?: Importance;
    themeColor?: AppColorType;
}