import { http } from '../utils/http';
import * as api from '../services';
import { IGroup } from '@kkrawczyk/todo-common';

export const createGroup = async ({ title }: IGroup) => await http(api.createGroup, 'POST', { title: title || 'Grupa bez nazwy' });

export const editGroup = async ({ _id, title }: IGroup) => await http(api.editGroup, 'PATCH', { _id, title });

export const getGroups = async () => {
	const resopnse = await http<IGroup[]>(api.getGroups, 'GET');
	return resopnse.body;
};

export const deleteGroup = async ({ _id }: IGroup) => await http(api.removeGroup, 'DELETE', { _id });

export const addListToGroupAction = async ({ _id, listId }: IGroup) => await http(api.addListToGroup, 'POST', { _id, listId });
