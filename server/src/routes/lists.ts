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
	removeInvitation,
	removeList,
	removeMemberFromList,
} from '../controllers/lists';

const lists = express.Router();

lists.post('/createList', validateBody<CreateEditListType>(createEditListSchema), createList);

lists.get('/getLists/:invitationToken', getLists);

lists.get('/getList/:_id', validateParams(listIdSchema), getList);

lists.delete('/removeList', validateBody<ListIdType>(listIdRequiredSchema), removeList);

lists.get('/getMainList', getMainList);

lists.patch('/addInvitationTokenToList', validateBody<AddInvitationTokenToListType>(addInvitationTokenToListSchema), addInvitationTokenToList);

lists.get('/getListDatatoShare/:invitationToken', getListDatatoShare);

lists.patch('/addUserToMemberOfList', addUserToMemberOfList);

lists.patch('/removeMemberFromList', validateBody<RemoveMemberFromListType>(removeMemberFromListSchema), removeMemberFromList);

lists.patch('/removeInvitation', validateBody<ListIdType>(listIdRequiredSchema), removeInvitation);

export default lists;
