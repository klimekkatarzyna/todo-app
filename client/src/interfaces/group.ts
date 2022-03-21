import { IGroup } from '@kkrawczyk/common/src/types';

export interface IGroupsResponse {
	groups: IGroup[];
}

export interface IDeleteGroupResponse {
	groups: {
		deletedCount: number;
	};
}
