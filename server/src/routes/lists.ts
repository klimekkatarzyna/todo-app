import express, { Request, Response } from 'express';
import { List } from '../models/list';
import MainList from '../models/mainList';
import { getSessionUserId } from '../utils/auth';
import { validateBody, validateParams } from '../utils/validation';
import {
	addInvitationTokenToListSchema,
	AddInvitationTokenToListType,
	createEditListSchema,
	CreateEditListType,
	listIdRequiredSchema,
	listIdSchema,
	ListIdType,
	removeMemberFromListSchema,
	RemoveMemberFromListType,
} from '@kkrawczyk/todo-common';

const lists = express.Router();

lists.post('/createList', validateBody<CreateEditListType>(createEditListSchema), async (req: Request, res: Response) => {
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
});

lists.get('/getLists/:invitationToken', async (req: Request, res: Response) => {
	const userId = getSessionUserId(req);
	if (!userId) return;

	try {
		const ownLists = await List.find({ userId });
		const membersLists = await List.find({ $and: [{ members: userId }] });
		res.status(200).json({
			body: [...new Set([...ownLists, ...membersLists])],
		});
	} catch (error) {
		res.status(500).json({
			error,
		});
	}
});

lists.get('/getList/:_id', validateParams(listIdSchema), async (req: Request, res: Response) => {
	try {
		const list = await List.find({ _id: req.params._id });
		const members = [...new Set(list[0]?.members)];

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
});

lists.delete('/removeList', validateBody<ListIdType>(listIdRequiredSchema), async (req: Request, res: Response) => {
	try {
		await List.deleteOne({ _id: req.body._id });

		res.status(200).json({ message: 'list has been deleted' });
	} catch (error) {
		res.status(500).json({ error });
	}
});

lists.get('/getMainList', async (req: Request, res: Response) => {
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
});

lists.patch(
	'/addInvitationTokenToList',
	validateBody<AddInvitationTokenToListType>(addInvitationTokenToListSchema),
	async (req: Request, res: Response) => {
		try {
			await List.updateMany(
				{ _id: req.body._id },
				{
					$set: {
						invitationToken: req.body.invitationToken,
						owner: req.body.owner,
					},
				}
			);
			res.status(200).json({ message: 'token has been added' });
		} catch (err) {
			res.status(500).json({
				err,
			});
		}
	}
);

lists.patch('/addUserToMemberOfList', async (req: Request, res: Response) => {
	// fix duplicates in members array
	const userId = getSessionUserId(req);
	try {
		await List.findOneAndUpdate({ invitationToken: req.body.invitationToken }, { $push: { members: userId } });
		res.status(200).json({ message: 'user has been added to the list' });
	} catch (err) {
		res.status(500).json({
			err,
		});
	}
});

lists.patch('/removeMemberFromList', validateBody<RemoveMemberFromListType>(removeMemberFromListSchema), async (req: Request, res: Response) => {
	try {
		await List.findOneAndUpdate({ _id: req.body._id }, { $pull: { members: { $in: req.body.member } } });
		res.status(200).json({ message: 'member has been deleted' });
	} catch (err) {
		res.status(500).json({
			err,
		});
	}
});

lists.patch('/removeInvitation', validateBody<ListIdType>(listIdRequiredSchema), async (req: Request, res: Response) => {
	try {
		await List.findOneAndUpdate({ _id: req.body._id }, { $set: { members: [], invitationToken: '' } });
		res.status(200).json({ message: 'invitation has been deleted' });
	} catch (err) {
		res.status(500).json({
			err,
		});
	}
});

export default lists;
