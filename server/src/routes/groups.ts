import { createEditGroupSchema, CreateEditGroupType } from '@kkrawczyk/todo-common';
import express from 'express';
import { createGroup, editGroup, getGroups, removeGroup } from '../controllers/groups';
import { validateBody } from '../utils/validation';

const groups = express.Router();

groups.post('/createGroup', validateBody<CreateEditGroupType>(createEditGroupSchema), createGroup);

groups.get('/getGroups', getGroups);

groups.delete('/removeGroup', removeGroup);

groups.patch('/editGroup', validateBody<CreateEditGroupType>(createEditGroupSchema), editGroup);

export default groups;
