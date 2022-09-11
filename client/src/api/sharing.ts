import { http } from '../utils/http';
import * as api from '../services';
import { IList } from '@kkrawczyk/todo-common';

export interface IShareLitDetails {
	listData: IList;
	isMemberAddedToList: boolean;
}

export const removeInvitationAction = async ({ _id }: IList) => await http(`${api.changeInvitation}`, 'PATCH', { _id });

export const updateMembersList = async ({ _id, member }: IList) =>
	await http<IList>(`${api.updateMembersList}`, 'PATCH', {
		_id,
		member,
	});

export const getListByIdAction = async ({ _id }: IList) => {
	const response = await http<IList | undefined>(`${api.getListById}/${_id}`, 'GET');
	return response.data;
};

export const getListDatatoShareAction = async ({ invitationToken }: IList) => {
	const response = await http<IShareLitDetails | undefined>(`${api.getListDatatoShare}/${invitationToken}`, 'GET');
	return response.data;
};

export const addUserToMemberOfListAction = async (invitationToken: string) =>
	await http(api.addUserToMemberOfList, 'POST', {
		invitationToken,
	});
