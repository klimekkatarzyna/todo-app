import { http } from '../utils/http';
import * as api from '../services';
import { IDeleteGroupResponse, IGroupsResponse } from '../interfaces/group';
import { IGroup } from '@kkrawczyk/todo-common';

export const createGroup = async (title: string) => await http<IGroup>(api.createGroup, 'POST', { title: title || 'Grupa bez nazwy' });

export const editGroup = async ({ _id, title }: IGroup) => await http(api.editGroup, 'PATCH', { _id, title });

export const getGroups = async () => await http<IGroupsResponse>(api.getGroups, 'GET');

export const deleteGroup = async (groupId: string) => await http<IDeleteGroupResponse>(api.removeGroup, 'DELETE', { groupId });
