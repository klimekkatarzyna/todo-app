import { Request, Response } from 'express';
import Task from '../models/task';
import { taskSocket } from '../utils/socketsEvents';
import { Importance, WebSocketEvent } from '@kkrawczyk/todo-common';
import { getSessionUserId } from '../utils/auth';

export const createTask = async (req: Request, res: Response) => {
	await Task.find({ id: req.body._id });
	const task = new Task({
		title: req.body.title,
		parentFolderId: req.body.parentFolderId,
		importance: req.body.importance,
		themeColor: req.body.themeColor,
		createdAt: Date.now(),
		taskStatus: req.body.taskStatus,
		sortType: req.body.sortType,
		assigned: req.body.assigned,
		createdBy: req.body.createdBy,
		members: req.body.members,
	});

	taskSocket(WebSocketEvent.addTask, req.body.parentFolderId, task);

	try {
		await task.save();
		res.status(200).json({
			data: {
				_id: task._id,
				title: task.title,
				parentFolderId: task.parentFolderId,
				importance: task.importance,
				themeColor: task.themeColor,
				createdAt: task.createdAt,
				taskStatus: task.taskStatus,
				sortType: task.sortType,
				assigned: task.assigned,
				createdBy: task.createdBy,
				members: task.members,
			},
		});
	} catch (err) {
		res.status(500).json({
			err,
		});
	}
};

export const getTasks = async (req: Request, res: Response) => {
	const tasks = await Task.find({ parentFolderId: req.params.parentFolderId }).sort(req.query.sortType as string);

	try {
		res.status(200).json({
			data: tasks,
		});
	} catch (err) {
		res.status(500).json({
			err,
		});
	}
};

export const getAllTasks = async (req: Request, res: Response) => {
	const tasks = await Task.find().sort({ title: 1 });

	try {
		res.status(200).json({
			data: tasks,
		});
	} catch (err) {
		res.status(500).json({
			err,
		});
	}
};

export const editTask = async (req: Request, res: Response) => {
	const task = await Task.updateOne({ _id: req.body._id }, { $set: { title: req.body.title } });
	const updatedTaskData = {
		_id: req.body._id,
		title: req.body.title,
		parentFolderId: req.body.parentFolderId,
	};

	taskSocket(WebSocketEvent.editTask, req.body.parentFolderId, updatedTaskData);

	try {
		res.status(200).json({
			data: {
				_id: req.params._id,
				title: req.body.title,
			},
		});
		if (!task) return res.status(404).json({ message: 'Task not found' });
	} catch (err) {
		res.status(500).json({
			err,
		});
	}
};

export const changeTaskStatus = async (req: Request, res: Response) => {
	const task = await Task.updateOne({ _id: req.params._id }, { $set: { taskStatus: req.body.taskStatus } });
	const updatedTaskData = {
		_id: req.params._id,
		taskStatus: req.body.taskStatus,
		parentFolderId: req.body.parentFolderId,
	};

	taskSocket(WebSocketEvent.taskStatusChange, req.body.parentFolderId, updatedTaskData);

	try {
		res.status(200).json({
			data: {
				_id: req.params._id,
				taskStatus: req.body.taskStatus,
				parentFolderId: req.body.parentFolderId,
			},
			message: `status changed successfully to ${req.body.taskStatus}`,
		});
		if (!task) return res.status(404).json({ message: 'Task not found' });
	} catch (err) {
		res.status(500).json({
			err,
		});
	}
};

export const removeTask = async (req: Request, res: Response) => {
	const task = await Task.findById({ _id: req.body?._id || '' });

	const data = await Task.deleteOne({ _id: req.body?._id || '' });
	taskSocket(WebSocketEvent.removeTask, req.body.parentFolderId, task);

	try {
		res.status(200).json({
			data: {
				_id: req.body?._id,
				parentFolderId: req.body.parentFolderId,
				tasks: data,
			},
		});
		if (!task) return res.status(404).json({ message: 'Task not found' });
	} catch (err) {
		res.status(500).json({
			err,
		});
	}
};

export const getTask = async (req: Request, res: Response) => {
	try {
		const task = await Task.find({ _id: req.params._id });
		res.status(200).json({
			data: task[0],
		});
	} catch (err) {
		res.status(500).json({
			err,
		});
	}
};

export const changeTaskImportance = async (req: Request, res: Response) => {
	const task = await Task.updateOne(
		{ _id: req.params._id, parentFolderId: req.params.parentFolderId },
		{ $set: { importance: req.body.importance } }
	);
	try {
		res.status(200).json({
			data: {
				_id: req.params._id,
				importance: req.body.importance,
				parentFolderId: req.params.parentFolderId,
			},
			message: `importance has been successfully changed to ${req.body.importance}`,
		});
		if (!task) return res.status(404).json({ message: 'Task not found' });
	} catch (err) {
		res.status(500).json({
			err,
		});
	}
};

export const taskInMyDay = async (req: Request, res: Response) => {
	const task = await Task.updateOne({ _id: req.params._id }, { $set: { isMyDay: req.body.isMyDay } });

	try {
		res.status(200).json({
			data: {
				_id: req.params._id,
				isMyDay: req.body.isMyDay,
				parentFolderId: req.body.parentFolderId,
			},
			message: `task has been changed`,
		});
		if (!task) return res.status(404).json({ message: 'Task not found' });
	} catch (err) {
		res.status(500).json({
			err,
		});
	}
};

export const getImportanceTasks = async (req: Request, res: Response) => {
	try {
		const userId = getSessionUserId(req);
		const tasks = await Task.find({ importance: Importance.high, members: { $in: userId } }).sort({ title: 1 });
		res.status(200).json({
			data: tasks,
		});
	} catch (error) {
		res.status(500).json({
			error,
		});
	}
};

export const getMyDayTasks = async (req: Request, res: Response) => {
	try {
		const userId = getSessionUserId(req);
		const tasks = await Task.find({ isMyDay: true, members: { $in: userId } }).sort({ title: 1 });
		res.status(200).json({
			data: tasks,
		});
	} catch (error) {
		res.status(500).json({
			error,
		});
	}
};

export const assignUserToTask = async (req: Request, res: Response) => {
	try {
		const task = await Task.findOneAndUpdate(
			{ _id: req.body._id },
			{
				$set: {
					assigned: req.body.assigned,
				},
			}
		);
		if (!task) {
			res.status(404).json({ message: 'Task not found' });
		}
		res.status(200).json({
			data: {
				_id: req.body._id,
				assigned: req.body.assigned,
			},
			message: 'user assigned to task',
		});
	} catch (err) {
		res.status(500).json({
			err,
		});
	}
};

export const removeUserFromTask = async (req: Request, res: Response) => {
	try {
		const task = await Task.findOneAndUpdate(
			{ _id: req.body._id },
			{
				$set: {
					assigned: null,
				},
			}
		);
		if (!task) {
			res.status(404).json({ message: 'Task not found' });
		}
		res.status(200).json({
			data: {
				_id: req.body._id,
			},
			message: 'removed assigment',
		});
	} catch (err) {
		res.status(500).json({
			err,
		});
	}
};

export const removeUsersFromTasks = async (req: Request, res: Response) => {
	try {
		const tasks = await Task.updateMany(
			{ parentFolderId: req.body.parentFolderId },
			{
				$set: {
					assigned: null,
				},
			}
		);

		if (!tasks) {
			res.status(404).json({ message: 'Tasks not found' });
		}
		res.status(200).json({
			data: {
				parentFolderId: req.body.parentFolderId,
			},
			message: 'removed assigments',
		});
	} catch (err) {
		res.status(500).json({
			err,
		});
	}
};

export const getAssignedTasks = async (req: Request, res: Response) => {
	try {
		const userId = getSessionUserId(req);
		const tasks = await Task.find({ assigned: req.params.assigned, members: { $in: userId } }).sort({ title: 1 });
		res.status(200).json({ data: tasks });
	} catch (err) {
		res.status(500).json({
			err,
		});
	}
};
