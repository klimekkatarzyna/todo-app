import { IList } from '@kkrawczyk/todo-common';
import { http } from '../utils/http';
import * as api from '../services';

export const createListAction = async ({ title }: IList) => await http<IList>(api.createList, 'POST', { title });

export const editListAction = async ({ _id, title }: IList) => await http(`${api.editList}`, 'PUT', { _id, title });

export const getListsAction = async () => {
	const response = await http<IList[]>(`${api.getLists}`, 'GET');
	return response.body;
};

export const getListByIdAction = async ({ _id }: IList) => {
	const response = await http<IList>(`${api.getListById}/${_id}`, 'GET');
	return response.body;
};

export const deleteListAction = async ({ _id }: IList) => await http(api.removeList, 'DELETE', { _id });

export const addInvitationTokenToListAction = async ({ _id, invitationToken, owner }: IList) =>
	await http(api.addInvitationTokenToList, 'POST', { _id, invitationToken, owner });
