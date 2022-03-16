import express, { Request, Response } from 'express';
import Task from '../models/task';
import { List } from '../models/list';
import { taskSocket } from '../utils/socketsEvents';
import { ITask } from '@kkrawczyk/common/types';

const tasks = express.Router();

tasks.post('/createTask', async (req: Request, res: Response) => {
	Task.find({ id: req.body._id }, (err, docs) => {
		const task = new Task({
			title: req.body.title,
			parentFolderId: req.body.parentFolderId,
			importance: req.body.importance,
			themeColor: req.body.themeColor,
			createdAt: Date.now(),
			taskStatus: req.body.taskStatus,
			sortType: req.body.sortType,
		});

		taskSocket('add-task', req.body.parentFolderId, task);

		task
			.save()
			.then(() => {
				res.json({
					body: {
						id: task._id,
						title: task.title,
						parentFolderId: task.parentFolderId,
						importance: task.importance,
						themeColor: task.themeColor,
						createdAt: task.createdAt,
						taskStatus: task.taskStatus,
						sortType: task.sortType,
					},
					message: `created task successfully`,
					status: 200,
				});
			})
			.catch((err: unknown) => {
				res.status(500).json({
					success: false,
					errorMessage: `something went wrong`,
					err,
					status: 500,
				});
			});
	});
});

tasks.get('/getTasks/:listId', async (req: Request, res: Response) => {
	Task.find({ parentFolderId: req.params.listId }, (err, tasks) => {
		try {
			res.json({
				body: {
					tasks,
				},
				status: 200,
			});

			List.findOneAndUpdate({ _id: req.params.listId }, { $set: { taskNumber: tasks.length } }, (err: unknown, list: any) => {});
		} catch (error: unknown) {
			res.status(500).json({
				success: false,
				errorMessage: `something went wrong`,
				err,
				status: 500,
			});
		}
	});
});

tasks.patch('/editTask', async (req: Request, res: Response) => {
	Task.updateOne({ _id: req.body.taskId }, { $set: { title: req.body.taskName } }, (err: unknown, docs: unknown) => {
		const updatedTaskData = {
			_id: req.body.taskId,
			title: req.body.taskName,
			parentFolderId: req.body.parentId,
		};

		taskSocket('edit-task', req.body.parentId, updatedTaskData);

		try {
			res.json({
				message: `title changed successfully to ${req.body.taskName}`,
				status: 200,
			});
		} catch (err) {
			console.log(err);
			res.status(500).json({
				success: false,
				errorMessage: `something went wrong`,
				err,
				status: 500,
			});
		}
	});
});

tasks.patch('/changeTaskStatus/:taskId', async (req: Request, res: Response) => {
	Task.updateOne({ _id: req.params.taskId }, { $set: { taskStatus: req.body.taskStatus } }, (err: unknown, docs: unknown) => {
		try {
			res.json({
				message: `status changed successfully to ${req.body.taskStatus}`,
				status: 200,
			});
		} catch (err) {
			console.log(err);
			res.status(500).json({
				success: false,
				errorMessage: `something went wrong`,
				err,
				status: 500,
			});
		}
	});
});

tasks.delete('/removeTask', async (req: Request, res: Response) => {
	const task = await Task.findById({ _id: req.body?.taskId || '' });

	Task.deleteOne({ _id: req.body?.taskId || '' }, (err: unknown, docs: unknown) => {
		taskSocket('remove-task', req.body.parentFolderId, task);

		try {
			res.json({
				body: {
					tasks: docs,
				},
				status: 200,
			});
		} catch (error) {
			res.status(500).json({
				success: false,
				errorMessage: `something went wrong`,
				err,
				status: 500,
			});
		}
	});
});

tasks.get('/getTask/:id', async (req: Request, res: Response) => {
	Task.find({ _id: req.params.id }, (err: unknown, docs: unknown) => {
		try {
			res.json({
				body: docs,
				status: 200,
			});
		} catch (error) {
			res.status(500).json({
				success: false,
				errorMessage: `something went wrong`,
				err,
				status: 500,
			});
		}
	});
});

tasks.patch('/changeTaskImportance/:listId/:taskId', async (req: Request, res: Response) => {
	Task.updateOne(
		{ _id: req.params.taskId, parentFolderId: req.params.listId },
		{ $set: { importance: req.body.importance } },
		(err: unknown, docs: unknown) => {
			try {
				res.json({
					message: `importance successfully changed to ${req.body.importance}`,
					status: 200,
				});
			} catch (err) {
				console.log(err);
				res.status(500).json({
					success: false,
					errorMessage: `something went wrong`,
					err,
					status: 500,
				});
			}
		}
	);
});

tasks.patch('/addTaskToMyDay/:taskId', async (req: Request, res: Response) => {
	Task.updateOne({ _id: req.params.taskId }, { $set: { isMyDay: req.body.isMyDay } }, (err: unknown, docs: unknown) => {
		try {
			res.json({
				message: `task added to my day`,
				status: 200,
			});
		} catch (err) {
			console.log(err);
			res.status(500).json({
				success: false,
				errorMessage: `something went wrong`,
				err,
				status: 500,
			});
		}
	});
});

tasks.get('/getImportanceTasks', async (req: Request, res: Response) => {
	Task.find({ importance: 'High' }, (err, docs) => {
		try {
			res.json({
				body: {
					tasks: docs,
				},
				status: 200,
			});
		} catch (error: unknown) {
			res.status(500).json({
				success: false,
				errorMessage: `something went wrong`,
				err,
				status: 500,
			});
		}
	});
});

export default tasks;
