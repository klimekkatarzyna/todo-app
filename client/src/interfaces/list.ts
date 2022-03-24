import { ReactElement } from 'react';
import { ContextualMenuOpion } from '../enums';
import { IList } from '@kkrawczyk/todo-common';

export interface IMember {
	[key: string]: string;
}

export enum IListItemType {
	MY_DAY = 'MY_DAY',
	IMPORTANT = 'IMPORTANT',
	PLANED = 'PLANED',
	ASSIGNED = 'ASSIGNED',
	TASKS = 'TASKS',
}

export interface IContextualMenu {
	type: ContextualMenuOpion;
	icon: ReactElement;
	name: string;
	target?: ReactElement;
}

export interface IListResponse {
	lists: IList[];
}

export interface IMainListResponse {
	mainLists: IList[];
}

export interface IGetSingleListResponse {
	[key: number]: IList;
}

export interface IDeleteListResponse {
	lists: {
		deletedCount: number;
	};
}
