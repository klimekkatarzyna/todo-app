import { ReactElement } from 'react';
import { AppColorType, ContextualMenuOpion } from './enums';
import { HttpResponse } from './utils/http';

export interface IListItem {
    type?: IListItemType;
    title: string;
    tasksNumber: number | undefined;
    icon: ReactElement;
    themeColor: string;
    _id?: string;
    createdAt?: string;
}

export enum IListItemType {
    MY_DAY = 'MY_DAY',
    IMPORTANT = 'IMPORTANT',
    PLANED = 'PLANED',
    ASSIGNED = 'ASSIGNED',
    TASKS = 'TASKS',
    TASK = 'TASK'
}

export interface IContextualMenuList {
    icon: ReactElement;
    name: string;
    type: ContextualMenuOpion;
}

// auth
export interface IAuthData {
    auth: boolean;
    body: IUserData;
    message: string;
    status: number;
    token: string;
}

export interface IUserData {
    username: string;
    email: string;
    id: string;
    createdAt: string;
}

export enum IResponseStatus {
    error = "error",
    idle = "idle",
    loading = "loading",
    success = "success"
}

export interface IListResponse {
    body: {
        lists: IListItem[];
    };
    status: number;
}

export interface IUseParams {
    listId: string;
}

export interface ITasksResponse extends HttpResponse {
    body: {
        tasks: ITask[];
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
