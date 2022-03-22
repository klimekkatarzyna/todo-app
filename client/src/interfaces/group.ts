import { IGroup } from 'todo-common';

export interface IGroupsResponse {
	groups: IGroup[];
}

export interface IDeleteGroupResponse {
	groups: {
		deletedCount: number;
	};
}
