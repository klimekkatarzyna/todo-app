import { ReactElement } from 'react';

export interface IListItem {
    type: IListItemType;
    name: string;
    tasksNumber: number | undefined;
    icon: ReactElement;
    color: string;
}

export enum IListItemType {
    MY_DAY = 'MY_DAY',
    IMPORTANT = 'IMPORTANT',
    PLANED = 'PLANED',
    ASSIGNED = 'ASSIGNED',
    TASKS = 'TASKS',
}