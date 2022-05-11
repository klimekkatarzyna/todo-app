import { createEditGroupSchema, CreateEditGroupType } from '@kkrawczyk/todo-common';
import express from 'express';
import { createGroup, editGroup, getGroups, removeGroup } from '../controllers/groups';
import { authorization } from '../utils/auth';
import { validateBody } from '../utils/validation';

const groups = express.Router();

groups.post('/groups', authorization, validateBody<CreateEditGroupType>(createEditGroupSchema), createGroup);

groups.get('/groups', authorization, getGroups);

groups.delete('/groups', authorization, removeGroup);

groups.patch('/groups', authorization, validateBody<CreateEditGroupType>(createEditGroupSchema), editGroup);

export default groups;
