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
}

export enum IListItemType {
	MY_DAY = 'MY_DAY',
	IMPORTANT = 'IMPORTANT',
	PLANED = 'PLANED',
	ASSIGNED = 'ASSIGNED',
	TASKS = 'TASKS',
}

export interface IContextualMenu {
	icon: ReactElement;
	name: string;
	type: ContextualMenuOpion;
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
