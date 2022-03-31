import { IDeleteListResponse, IListResponse } from '../interfaces/list';
import { IList } from '@kkrawczyk/todo-common';
import { http, HttpResponse } from '../utils/http';
import { getStringAfterCharacter } from '../utils/utilsFunctions';
import * as api from '../services';

interface IAddInvitationTokenToListActionProps {
	listId: string;
	invitationToken: string;
	owner: string;
}

const invitationToken = getStringAfterCharacter(sessionStorage.getItem('invitationTokenUrl') || undefined); // TODO: fix me!!

export const createListAction = async (title: string | undefined) => await http<IList>(api.createList, 'POST', { title });

export const getListsAction = async () => await http<IListResponse>(`${api.getLists}/${invitationToken}`, 'GET');

export const getListByIdAction = async (listId: string) => await http<IList>(`${api.getListById}/${listId}`, 'GET');

export const deleteListAction = async (listId: string | undefined) => await http<IDeleteListResponse>(api.removeList, 'DELETE', { listId });

export const addInvitationTokenToListAction = async ({
	listId,
	invitationToken,
	owner,
}: IAddInvitationTokenToListActionProps): Promise<HttpResponse<unknown>> =>
	await http(api.addInvitationTokenToList, 'PATCH', { listId, invitationToken, owner });
