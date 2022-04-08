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

tasks.post('/createTask', validateBody<CreateEditTaskType>(createEditTaskSchema), createTask);

tasks.get('/getTasks/:parentFolderId', validateParams(listIdForTasksSchema), getTasks);

tasks.patch('/editTask', validateBody<CreateEditTaskType>(createEditTaskSchema), editTask);

tasks.patch('/changeTaskStatus/:_id', changeTaskStatus);

tasks.delete('/removeTask', removeTask);

tasks.get('/getTask/:_id', validateParams(taskIdSchema), getTask);

tasks.patch('/changeTaskImportance/:parentFolderId/:_id', changeTaskImportance);

tasks.patch('/addTaskToMyDay/:_id', addTaskToMyDay);

tasks.get('/getImportanceTasks', getImportanceTasks);

export default tasks;
