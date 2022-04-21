import express from 'express';
import { validateBody, validateParams } from '../utils/validation';
import {
	addInvitationTokenToListSchema,
	AddInvitationTokenToListType,
	createEditListSchema,
	CreateEditListType,
	listIdRequiredSchema,
	listIdSchema,
	ListIdType,
	removeMemberFromListSchema,
	RemoveMemberFromListType,
} from '@kkrawczyk/todo-common';
import {
	addInvitationTokenToList,
	addUserToMemberOfList,
	createList,
	getList,
	getListDatatoShare,
	getLists,
	getMainList,
	changeInvitation,
	removeList,
	updateMembersList,
} from '../controllers/lists';

const lists = express.Router();

lists.post('/lists', validateBody<CreateEditListType>(createEditListSchema), createList);

lists.get('/lists/:invitationToken', getLists);

lists.get('/getList/:_id', validateParams(listIdSchema), getList); // TODO: fix me!

lists.delete('/lists', validateBody<ListIdType>(listIdRequiredSchema), removeList);

lists.get('/mainList', getMainList);

lists.post('/invitationToken', validateBody<AddInvitationTokenToListType>(addInvitationTokenToListSchema), addInvitationTokenToList);

lists.get('/listsDatatoShare/:invitationToken', getListDatatoShare);

lists.post('/members', addUserToMemberOfList);

lists.patch('/members', validateBody<RemoveMemberFromListType>(removeMemberFromListSchema), updateMembersList);

lists.patch('/invitations', validateBody<ListIdType>(listIdRequiredSchema), changeInvitation);

export default lists;
