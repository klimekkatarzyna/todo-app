import { createEditGroupSchema, CreateEditGroupType } from '@kkrawczyk/todo-common';
import express from 'express';
import { addListToGroup, createGroup, editGroup, getGroups, removeGroup, unGroupLists } from '../controllers/groups';
import { authorization } from '../utils/auth';
import { validateBody } from '../utils/validation';

const groups = express.Router();

groups.post('/groups', authorization, validateBody<CreateEditGroupType>(createEditGroupSchema), createGroup);

groups.get('/groups', authorization, getGroups);

groups.delete('/groups', authorization, removeGroup);

groups.patch('/groups', authorization, validateBody<CreateEditGroupType>(createEditGroupSchema), editGroup);

groups.post('/groupsLists', authorization, addListToGroup);

groups.post('/unGroupLists', authorization, unGroupLists);

export default groups;
