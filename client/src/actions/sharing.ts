import { http } from '../utils/http';
import * as api from '../services';
import { IList } from '@kkrawczyk/todo-common';

export const removeInvitationAction = async ({ _id }: IList) => await http(`${api.removeInvitation}`, 'PATCH', { _id });

export const removeMemberAction = async ({ _id, member }: IList) =>
	await http(`${api.removeMemberFromList}`, 'PATCH', {
		_id,
		member,
	});

export const getListByIdAction = async ({ _id }: IList) => {
	const response = await http<IList | undefined>(`${api.getListById}/${_id}`, 'GET');
	return response.body;
};

export const addUserToMemberOfListAction = async (invitationToken: string) =>
	await http(api.addUserToMemberOfList, 'PATCH', {
		invitationToken,
	});
