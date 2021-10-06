import { ReactElement } from 'react';
import { ContextualMenuOpion } from './enums';

export interface IListItem {
    type: IListItemType;
    name: string;
    tasksNumber: number | undefined;
    icon: ReactElement;
    color: string;
    url?: string;
}

export enum IListItemType {
    MY_DAY = 'MY_DAY',
    IMPORTANT = 'IMPORTANT',
    PLANED = 'PLANED',
    ASSIGNED = 'ASSIGNED',
    TASKS = 'TASKS',
}

export interface IContextualMenuList {
    icon: ReactElement;
    name: string;
    type: ContextualMenuOpion;
}

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
