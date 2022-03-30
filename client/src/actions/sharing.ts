import { http } from '../utils/http';
import * as api from '../services';
import { IList, RemoveMemberFromListType } from '@kkrawczyk/todo-common';

export const removeInvitationAction = async (listId: string | undefined) => await http(`${api.removeInvitation}`, 'PATCH', { listId: listId });

export const removeMemberAction = async ({ listId, member }: RemoveMemberFromListType) =>
	await http(`${api.removeMemberFromList}`, 'PATCH', {
		listId,
		member,
	});

export const getListByIdAction = async (elementId: string | undefined) => await http<IList>(`${api.getListById}/${elementId}`, 'GET');
