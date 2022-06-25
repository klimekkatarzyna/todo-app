import { http } from '../utils/http';
import * as api from '../services';
import { IGroup } from '@kkrawczyk/todo-common';

export const createGroup = async ({ title }: IGroup) => await http<IGroup>(api.createGroup, 'POST', { title: title || 'Grupa bez nazwy' });

export const editGroup = async ({ _id, title }: IGroup) => await http<IGroup>(api.editGroup, 'PATCH', { _id, title });

export const getGroups = async () => {
	const resopnse = await http<IGroup[]>(api.getGroups, 'GET');
	return resopnse.body;
};

export const deleteGroup = async ({ _id }: IGroup) => await http<IGroup>(api.removeGroup, 'DELETE', { _id });

export const addListToGroupAction = async ({ _id, listId }: IGroup) => await http<IGroup>(api.addListToGroup, 'POST', { _id, listId });

export const unGroupeListsAction = async ({ _id, lists }: IGroup) => await http<IGroup>(api.unGroupLists, 'POST', { _id, lists });
