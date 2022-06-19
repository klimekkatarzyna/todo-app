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
	editList,
	listTheme,
} from '../controllers/lists';
import { authorization } from '../utils/auth';

const lists = express.Router();

lists.post('/lists', authorization, validateBody<CreateEditListType>(createEditListSchema), createList);

lists.put('/lists', authorization, validateBody<CreateEditListType>(createEditListSchema), editList);

lists.get('/lists', authorization, getLists);

lists.get('/listDetails/:_id', authorization, validateParams(listIdSchema), getList);

lists.delete('/lists', authorization, validateBody<ListIdType>(listIdRequiredSchema), removeList);

lists.get('/mainList', authorization, getMainList);

lists.post('/invitationToken', authorization, validateBody<AddInvitationTokenToListType>(addInvitationTokenToListSchema), addInvitationTokenToList);

lists.get('/listsDatatoShare/:invitationToken', authorization, getListDatatoShare);

lists.post('/members', authorization, addUserToMemberOfList);

lists.patch('/members', authorization, validateBody<RemoveMemberFromListType>(removeMemberFromListSchema), updateMembersList);

lists.patch('/invitations', authorization, validateBody<ListIdType>(listIdRequiredSchema), changeInvitation);

lists.post('/listTheme', authorization, listTheme);

export default lists;
