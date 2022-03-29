import { http } from '../utils/http';
import * as api from '../services';
import { IDeleteGroupResponse, IGroupsResponse } from '../interfaces/group';

interface IGroup {
	groupId: string;
	title: string;
}

export const createGroup = async (title: string) => await http<IGroup>(api.createGroup, 'POST', { title: title || 'Grupa bez nazwy' });

export const editGroup = async ({ groupId, title }: IGroup) => await http(api.editGroup, 'PATCH', { groupId, title });

export const getGroups = async () => await http<IGroupsResponse>(api.getGroups, 'GET');

export const deleteGroup = async (groupId: string) => await http<IDeleteGroupResponse>(api.removeGroup, 'DELETE', { groupId });
