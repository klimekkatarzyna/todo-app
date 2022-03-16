import { ReactElement } from 'react';
import { AppColorType, ContextualMenuOpion } from '../enums';

export interface IListItem {
	isMainList?: boolean;
	title: string;
	taskNumber: number;
	icon: ReactElement;
	themeColor: AppColorType;
	_id?: string;
	createdAt?: string;
	url?: string;
	invitationToken?: string;
	owner?: string;
	members?: string[];
}

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
	lists: IListItem[];
}

export interface IMainListResponse {
	mainLists: IListItem[];
}

export interface IGetSingleListResponse {
	[key: number]: IListItem;
}

export interface IDeleteListResponse {
	lists: {
		deletedCount: number;
	};
}