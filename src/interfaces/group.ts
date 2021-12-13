import { AppColorType } from '../enums';
import { HttpResponse } from '../utils/http';

export interface IGroup {
	title: string;
	themeColor: AppColorType;
	_id: string;
	createdAt?: string;
	userId: string;
}

export interface IGroupsResponse {
	groups: IGroup[];
}

export interface IDeleteGroupResponse {
	groups: {
		deletedCount: number;
	};
}
