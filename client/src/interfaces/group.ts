import { IGroup } from '@kkrawczyk/common/types';

export interface IGroupsResponse {
	groups: IGroup[];
}

export interface IDeleteGroupResponse {
	groups: {
		deletedCount: number;
	};
}
