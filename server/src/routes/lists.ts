import express, { Request, Response } from 'express';
import { List } from '../models/list';
import MainList from '../models/mainList';
import { getSessionUserId } from '../utils/auth';
import { validateBody, validateParams } from '@kkrawczyk/common/validation';
import {
	addInvitationTokenToListSchema,
	AddInvitationTokenToListType,
	addUserToListSchema,
	AddUserToListType,
	createListSchema,
	CreateListType,
	listIdRequiredSchema,
	listIdSchema,
	ListIdType,
	removeMemberFromListSchema,
	RemoveMemberFromListType,
} from '@kkrawczyk/common/schema/list';

const lists = express.Router();

lists.post('/createList', validateBody<CreateListType>(createListSchema), async (req: Request, res: Response) => {
	const userId = getSessionUserId(req);
	const newList = new List({
		title: req.body.title,
		themeColor: 'blue',
		createdAt: Date.now(),
		taskNumber: req.body.taskNumber,
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
				taskNumber: list.taskNumber,
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
			body: {
				lists: [...new Set([...ownLists, ...membersLists])],
			},
		});
	} catch (error) {
		res.status(500).json({
			error,
		});
	}
});

lists.get('/getList/:id', validateParams(listIdSchema), async (req: Request, res: Response) => {
	try {
		const list = await List.find({ _id: req.params.id });
		const members = [...new Set(list[0]?.members)];

		res.status(200).json({
			body: {
				_id: list[0]?._id,
				title: list[0]?.title,
				taskNumber: list[0]?.taskNumber,
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
		await List.deleteOne({ _id: req.body.listId });

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
				{ _id: req.body.listId },
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

lists.patch('/addUserToMemberOfList', validateBody<AddUserToListType>(addUserToListSchema), async (req: Request, res: Response) => {
	// fix duplicates in members array
	try {
		await List.findOneAndUpdate({ invitationToken: req.body.invitationToken }, { $push: { members: [...new Set([req.body.member])] } });
		res.status(200).json({ message: 'user has been added to the list' });
	} catch (err) {
		res.status(500).json({
			err,
		});
	}
});

lists.patch('/removeMemberFromList', validateBody<RemoveMemberFromListType>(removeMemberFromListSchema), async (req: Request, res: Response) => {
	try {
		await List.findOneAndUpdate({ _id: req.body.listId }, { $pull: { members: { $in: req.body.member } } });
		res.status(200).json({ message: 'member has been deleted' });
	} catch (err) {
		res.status(500).json({
			err,
		});
	}
});

lists.patch('/removeInvitation', validateBody<ListIdType>(listIdRequiredSchema), async (req: Request, res: Response) => {
	try {
		await List.findOneAndUpdate({ _id: req.body.listId }, { $set: { members: [], invitationToken: '' } });
		res.status(200).json({ message: 'invitation has been deleted' });
	} catch (err) {
		res.status(500).json({
			err,
		});
	}
});

export default lists;
