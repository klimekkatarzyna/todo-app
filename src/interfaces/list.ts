import { ReactElement } from "react";
import { ContextualMenuOpion } from "../enums";
import { HttpResponse } from "../utils/http";

export interface IListItem {
    isMainList?: boolean;
    title: string;
    taskNumber: number;
    icon: ReactElement;
    themeColor: string;
    _id?: string;
    createdAt?: string;
    url?: string;
}

export enum IListItemType {
    MY_DAY = 'MY_DAY',
    IMPORTANT = 'IMPORTANT',
    PLANED = 'PLANED',
    ASSIGNED = 'ASSIGNED',
    TASKS = 'TASKS'
}

export interface IContextualMenuList {
    icon: ReactElement;
    name: string;
    type: ContextualMenuOpion;
}

export interface IListResponse extends HttpResponse {
    body: {
        lists: IListItem[];
    };
}

export interface IMainListResponse extends HttpResponse {
    body: {
        mainLists: IListItem[];
    };
}

export interface IGetSingleListResponse extends HttpResponse {
    body: {
        [key: number]: IListItem;
    };
}

export interface IDeleteListResponse extends HttpResponse {
    body: {
        lists: {
            deletedCount: number;
        }
    }
}

