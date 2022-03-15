import { IDeleteListResponse, IListItem, IListResponse } from '../interfaces/list';
import { http, HttpResponse } from '../utils/http';
import { getStringAfterCharacter } from '../utils/utilsFunctions';
import * as api from '../services';

interface IAddInvitationTokenToListActionProps {
	listId: string;
	invitationToken: string;
	owner: string;
}

const invitationToken = getStringAfterCharacter(sessionStorage.getItem('invitationTokenUrl') || undefined); // TODO: fix me!!

export const getListsAction = async () => await http<IListResponse>(`${api.getLists}/${invitationToken}`, 'GET');

export const getListByIdAction = async (listId: string) => {
	const response = await http<IListItem>(`${api.getListById}/${listId}`, 'GET');
	return response.body;
};

export const deleteListAction = async (listId: string) => await http<IDeleteListResponse>(api.removeList, 'DELETE', { listId });

export const addInvitationTokenToListAction = async ({
	listId,
	invitationToken,
	owner,
}: IAddInvitationTokenToListActionProps): Promise<HttpResponse<unknown>> =>
	await http(api.addInvitationTokenToList, 'PATCH', { listId, invitationToken, owner });
