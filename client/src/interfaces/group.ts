import { IGroup } from '@kkrawczyk/todo-common';

export interface IGroupsResponse {
	groups: IGroup[];
}

export interface IDeleteGroupResponse {
	groups: {
		deletedCount: number;
	};
}
