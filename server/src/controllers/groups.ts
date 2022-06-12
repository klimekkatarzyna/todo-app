import { Request, Response } from 'express';
import { Group } from '../models/group';
import { getSessionUserId } from '../utils/auth';

export const createGroup = async (req: Request, res: Response) => {
	const userId = getSessionUserId(req);

	const newGroup = new Group({
		title: req.body.title,
		themeColor: 'blue',
		createdAt: Date.now(),
		userId: userId,
		lists: [],
	});

	try {
		const group = await newGroup.save();
		res.status(200).json({
			body: {
				_id: group._id,
				title: group.title,
				themeColor: group.themeColor,
				createdAt: group.createdAt,
				lists: group.lists,
			},
			message: `group created successfully`,
		});
	} catch (err) {
		res.status(500).json({
			err,
		});
	}
};

export const getGroups = async (req: Request, res: Response) => {
	const userId = getSessionUserId(req);

	const groups = await Group.find({ userId });
	if (!groups) {
		res.status(404).json({ message: 'Groups not found' });
	}
	try {
		res.status(200).json({
			body: groups,
		});
	} catch (err) {
		res.status(500).json({
			err,
		});
	}
};

export const removeGroup = async (req: Request, res: Response) => {
	const group = await Group.deleteOne({ _id: req.body._id });
	if (!group) {
		res.status(404).json({ message: 'Group not found' });
	}
	try {
		res.status(200).json({
			body: { _id: req.body._id },
		});
	} catch (err) {
		res.status(500).json({
			err,
		});
	}
};

export const editGroup = async (req: Request, res: Response) => {
	const group = await Group.updateOne({ _id: req.body._id }, { $set: { title: req.body.title } });

	if (!group) {
		res.status(404).json({ message: 'Group not found' });
	}

	try {
		res.status(200).json({
			body: { _id: req.body._id },
			message: `status changed successfully to ${req.body.title}`,
		});
	} catch (err) {
		res.status(500).json({
			err,
		});
	}
};

export const addListToGroup = async (req: Request, res: Response) => {
	try {
		const userId = getSessionUserId(req);
		const isListAlreadyAddedToGroup = await Group.findOne({ userId, lists: req.body.listId });

		const group = await Group.findOneAndUpdate({ _id: req.body._id }, { $push: { lists: req.body.listId } });
		await Group.findOneAndUpdate({ userId, _id: isListAlreadyAddedToGroup?._id }, { $pull: { lists: req.body.listId } });
		if (!group) {
			res.status(404).json({ message: 'group not found' });
		}

		res.status(200).json({
			message: 'list has been added to the group',
		});
	} catch (err) {
		res.status(500).json({
			err,
		});
	}
};

export const unGroupLists = async (req: Request, res: Response) => {
	try {
		const userId = getSessionUserId(req);

		const group = await Group.findOneAndUpdate({ userId, _id: req.body._id }, { $set: { lists: [] } });

		if (!group) {
			res.status(404).json({ message: 'group not found' });
		}

		res.status(200).json({ message: 'ungrouped lists' });
	} catch (err) {
		res.status(500).json({
			err,
		});
	}
};
