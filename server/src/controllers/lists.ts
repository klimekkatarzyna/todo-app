import { AppColor } from '@kkrawczyk/todo-common';
import { Request, Response } from 'express';
import { Group } from '../models/group';
import Task from '../models/task';
import { List } from '../models/list';
import { getSessionUserId } from '../utils/auth';

export const createList = async (req: Request, res: Response) => {
	const userId = getSessionUserId(req);
	const newList = new List({
		title: req.body.title,
		themeColor: AppColor.dark,
		createdAt: Date.now(),
		userId: userId,
		invitationToken: '',
		owner: '',
		members: [],
	});

	try {
		const list = await newList.save();
		res.status(200).json({
			data: {
				_id: list._id,
				title: list.title,
				themeColor: list.themeColor,
				createdAt: list.createdAt,
				invitationToken: list.invitationToken,
				owner: list.owner,
				members: list.members,
			},
		});
	} catch (error) {
		res.status(500).json({
			error,
		});
	}
};

export const editList = async (req: Request, res: Response) => {
	const list = await List.updateOne({ _id: req.body._id }, { $set: { title: req.body.title } });

	try {
		res.status(200).json({ data: { _id: req.body._id, title: req.body.title } });
		if (!list) return res.status(404).json({ message: 'List not found' });
	} catch (err) {
		res.status(500).json({
			err,
		});
	}
};

export const getLists = async (req: Request, res: Response) => {
	const userId = getSessionUserId(req);
	if (!userId) return;

	try {
		const ownLists = await List.find({ userId });
		const membersLists = await List.find({ $and: [{ members: userId }] });
		const lists = [...new Set([...ownLists, ...membersLists])];

		res.status(200).json({
			data: lists,
		});
	} catch (error) {
		res.status(500).json({
			error,
		});
	}
};

export const getList = async (req: Request, res: Response) => {
	try {
		const list = await List.find({ _id: req.params._id });
		const members = [...new Set(list[0]?.members)];

		res.status(200).json({
			data: {
				_id: list[0]?._id,
				title: list[0]?.title,
				themeColor: list[0]?.themeColor,
				createdAt: list[0]?.createdAt,
				userId: list[0]?.userId,
				invitationToken: list[0]?.invitationToken,
				owner: list[0]?.owner,
				members,
			},
		});
	} catch (error) {
		res.status(500).json({
			error,
		});
	}
};

export const removeList = async (req: Request, res: Response) => {
	try {
		const list = await List.deleteOne({ _id: req.body._id });
		await Task.deleteMany({ parentFolderId: req.body._id });

		if (!list) {
			res.status(404).json({ message: 'List not found' });
		}

		res.status(200).json({
			data: { _id: req.body._id },
			message: 'list has been deleted',
		});
	} catch (error) {
		res.status(500).json({ error });
	}
};

export const removeAllLists = async (req: Request, res: Response) => {
	try {
		const lists = await List.deleteMany();

		if (!lists) {
			res.status(404).json({ message: 'List not found' });
		}

		res.status(200).json({
			message: 'lists has been deleted',
		});
	} catch (error) {
		res.status(500).json({ error });
	}
};

export const addInvitationTokenToList = async (req: Request, res: Response) => {
	try {
		const list = await List.updateMany(
			{ _id: req.body._id },
			{
				$set: {
					invitationToken: req.body.invitationToken,
					owner: req.body.owner,
				},
			}
		);
		if (!list) {
			res.status(404).json({ message: 'List not found' });
		}

		res.status(200).json({ message: 'token has been added' });
	} catch (err) {
		res.status(500).json({
			err,
		});
	}
};

export const getListDatatoShare = async (req: Request, res: Response) => {
	try {
		const listData = await List.findOne({ invitationToken: req.params.invitationToken });
		const userId = getSessionUserId(req);
		const membersList = listData?.members;
		const isMemberAddedToList = membersList?.find(member => member === userId) === userId;

		if (!listData) {
			res.status(404).json({ message: 'List not found' });
		}

		res.json({ data: { isMemberAddedToList, listData } });
	} catch (err) {
		res.status(500).json({
			err,
		});
	}
};

export const addUserToMemberOfList = async (req: Request, res: Response) => {
	const userId = getSessionUserId(req);

	try {
		const list = await List.findOneAndUpdate({ invitationToken: req.body.invitationToken }, { $push: { members: userId } });
		if (!list) {
			res.status(404).json({ message: 'List not found' });
		}

		res.status(200).json({ message: 'user has been added to the list' });
	} catch (err) {
		res.status(500).json({
			err,
		});
	}
};

export const updateMembersList = async (req: Request, res: Response) => {
	try {
		const list = await List.findOneAndUpdate({ _id: req.body._id }, { $pull: { members: { $in: req.body.member } } });
		await Group.findOneAndUpdate({ lists: { $in: req.body._id } }, { $pull: { lists: req.body._id } });

		if (!list) {
			res.status(404).json({ message: 'List not found' });
		}

		res.status(200).json({ data: { _id: req.body._id, member: req.body.member }, message: 'member has been deleted' });
	} catch (err) {
		res.status(500).json({
			err,
		});
	}
};

export const changeInvitation = async (req: Request, res: Response) => {
	try {
		const list = await List.findOneAndUpdate({ _id: req.body._id }, { $set: { members: [], invitationToken: '' } });
		if (!list) {
			res.status(404).json({ message: 'List not found' });
		}

		res.status(200).json({ message: 'invitation has been deleted' });
	} catch (err) {
		res.status(500).json({
			err,
		});
	}
};

export const listTheme = async (req: Request, res: Response) => {
	try {
		const loggedUserId = getSessionUserId(req);
		if (req.body.userId !== loggedUserId) return;

		const list = await List.findOneAndUpdate({ _id: req.body._id }, { $set: { themeColor: req.body.themeColor } });
		await Task.updateMany({ parentFolderId: req.body._id }, { $set: { themeColor: req.body.themeColor } });
		if (!list) {
			res.status(404).json({ message: 'List not found' });
		}

		res.status(200).json({
			data: {
				_id: req.body._id,
				themeColor: req.body.themeColor,
			},
			message: 'list theme has been changed',
		});
	} catch (err) {
		res.status(500).json({
			err,
		});
	}
};
