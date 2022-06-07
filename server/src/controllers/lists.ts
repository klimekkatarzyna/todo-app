import { Request, Response } from 'express';
import { Group } from '../models/group';
import { List } from '../models/list';
import MainList from '../models/mainList';
import { getSessionUserId } from '../utils/auth';

export const getMainList = async (req: Request, res: Response) => {
	try {
		const mainList = await MainList.find();
		res.status(200).json({
			body: {
				mainLists: mainList,
			},
		});
	} catch (error) {
		res.status(500).json({
			error,
		});
	}
};

export const createList = async (req: Request, res: Response) => {
	const userId = getSessionUserId(req);
	const newList = new List({
		title: req.body.title,
		themeColor: 'blue',
		createdAt: Date.now(),
		userId: userId,
		invitationToken: '',
		owner: '',
		members: [],
	});

	try {
		const list = await newList.save();
		res.status(200).json({
			body: {
				id: list._id,
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
		res.status(200).json({ body: req.body.title });
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

		if (!lists) {
			res.status(404).json('There are no lists created yet!');
		}
		res.status(200).json({
			body: lists,
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

		if (!list) {
			res.status(404).json({ message: 'List not found' });
		}

		res.status(200).json({
			body: {
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

		if (!list) {
			res.status(404).json({ message: 'List not found' });
		}

		res.status(200).json({ message: 'list has been deleted' });
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

		res.json({ body: { isMemberAddedToList, listData } });
	} catch (err) {
		res.status(500).json({
			err,
		});
	}
};

export const addUserToMemberOfList = async (req: Request, res: Response) => {
	// fix duplicates in members array
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

		res.status(200).json({ message: 'member has been deleted' });
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
