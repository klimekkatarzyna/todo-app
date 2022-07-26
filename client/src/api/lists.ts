import { IList } from '@kkrawczyk/todo-common';
import { http } from '../utils/http';
import * as api from '../services';

export const createListAction = async ({ title }: IList) => await http<IList>(api.createList, 'POST', { title });

export const editListAction = async ({ _id, title }: IList) => await http<IList>(`${api.editList}`, 'PUT', { _id, title });

export const getListsAction = async () => {
	const response = await http<IList[]>(`${api.getLists}`, 'GET');
	return response.data;
};

export const getListByIdAction = async ({ _id }: IList) => {
	const response = await http<IList>(`${api.getListById}/${_id}`, 'GET');
	return response.data;
};

export const deleteListAction = async ({ _id }: IList) => await http<IList>(api.removeList, 'DELETE', { _id });

export const addInvitationTokenToListAction = async ({ _id, invitationToken, owner }: IList) =>
	await http<IList>(api.addInvitationTokenToList, 'POST', { _id, invitationToken, owner });

export const editListThemeAction = async ({ _id, themeColor, userId }: IList) =>
	await http<IList>(api.listTheme, 'POST', { _id, themeColor, userId });
