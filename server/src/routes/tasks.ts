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

const tasks = express.Router();

tasks.post('/tasks', validateBody<CreateEditTaskType>(createEditTaskSchema), createTask);

tasks.put('/tasks', validateBody<CreateEditTaskType>(createEditTaskSchema), editTask);

tasks.delete('/tasks', removeTask);

tasks.get('/taskDetails/:parentFolderId', validateParams(listIdForTasksSchema), getTasks);

tasks.patch('/taskStatuses/:_id', changeTaskStatus);

tasks.get('/tasks/:_id', validateParams(taskIdSchema), getTask);

tasks.patch('/taskImportance/:parentFolderId/:_id', changeTaskImportance);

tasks.post('/myDay/:_id', addTaskToMyDay);

tasks.get('/importanceTasks', getImportanceTasks);

export default tasks;
