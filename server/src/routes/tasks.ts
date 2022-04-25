import express from 'express';
import { listIdForTasksSchema, taskIdSchema, CreateEditTaskType, createEditTaskSchema } from '@kkrawczyk/todo-common';
import { validateParams, validateBody } from '../utils/validation';
import {
	addTaskToMyDay,
	changeTaskImportance,
	changeTaskStatus,
	createTask,
	editTask,
	getImportanceTasks,
	getTask,
	getTasks,
	removeTask,
} from '../controllers/tasks';
import { authorization } from '../utils/auth';

const tasks = express.Router();

tasks.post('/tasks', authorization, validateBody<CreateEditTaskType>(createEditTaskSchema), createTask);

tasks.put('/tasks', authorization, validateBody<CreateEditTaskType>(createEditTaskSchema), editTask);

tasks.delete('/tasks', authorization, removeTask);

tasks.get('/taskDetails/:parentFolderId', authorization, validateParams(listIdForTasksSchema), getTasks);

tasks.patch('/taskStatuses/:_id', authorization, changeTaskStatus);

tasks.get('/tasks/:_id', authorization, validateParams(taskIdSchema), getTask);

tasks.patch('/taskImportance/:parentFolderId/:_id', authorization, changeTaskImportance);

tasks.post('/myDay/:_id', authorization, addTaskToMyDay);

tasks.get('/importanceTasks', authorization, getImportanceTasks);

export default tasks;
