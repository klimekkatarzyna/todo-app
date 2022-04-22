import { createEditGroupSchema, CreateEditGroupType } from '@kkrawczyk/todo-common';
import express from 'express';
import { createGroup, editGroup, getGroups, removeGroup } from '../controllers/groups';
import { validateBody } from '../utils/validation';

const groups = express.Router();

groups.post('/groups', validateBody<CreateEditGroupType>(createEditGroupSchema), createGroup);

groups.get('/groups', getGroups);

groups.delete('/groups', removeGroup);

groups.patch('/groups', validateBody<CreateEditGroupType>(createEditGroupSchema), editGroup);

export default groups;
