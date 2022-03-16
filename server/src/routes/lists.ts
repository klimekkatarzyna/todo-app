import express, { Request, Response } from 'express';
import { List } from '../models/list';
import MainList from '../models/mainList';
import { getSessionUserId } from '../utils/auth';

const lists = express.Router();

lists.post('/createList', async (req: Request, res: Response) => {
	const userId = getSessionUserId(req);

	const list = new List({
		title: req.body.title,
		themeColor: 'blue',
		createdAt: Date.now(),
		taskNumber: req.body.taskNumber,
		userId: userId,
		invitationToken: '',
		owner: '',
		members: [],
	});

	list
		.save()
		.then(() => {
			res.json({
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
				message: `created list successfully`,
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

lists.get('/getLists/:invitationToken', async (req: Request, res: Response) => {
	const userId = getSessionUserId(req);
	if (!userId) return;
	const ownLists = await List.find({ userId });
	const membersLists = await List.find({ $and: [{ members: userId }] });

	try {
		res.json({
			body: {
				lists: [...new Set([...ownLists, ...membersLists])],
			},
			status: 200,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			errorMessage: `something went wrong`,
			status: 500,
		});
	}
});

lists.get('/getList/:id', async (req: Request, res: Response) => {
	List.find({ _id: req.params.id }, (err, docs: any) => {
		const members = [...new Set(docs[0]?.members)];
		try {
			res.json({
				body: {
					_id: docs[0]?._id,
					title: docs[0]?.title,
					taskNumber: docs[0]?.taskNumber,
					themeColor: docs[0]?.themeColor,
					createdAt: docs[0]?.createdAt,
					userId: docs[0]?.userId,
					invitationToken: docs[0]?.invitationToken,
					owner: docs[0]?.owner,
					members,
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

lists.delete('/removeList', async (req: Request, res: Response) => {
	//   console.log("---------");
	List.deleteOne({ _id: req.body.listId }, (err: unknown, docs: unknown) => {
		try {
			res.json({
				body: {
					lists: docs,
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

lists.get('/getMainList', async (req: Request, res: Response) => {
	MainList.find((err, docs) => {
		try {
			res.json({
				body: {
					mainLists: docs,
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

lists.patch('/addInvitationTokenToList', async (req: Request, res: Response) => {
	List.updateMany(
		{ _id: req.body.listId },
		{
			$set: {
				invitationToken: req.body.invitationToken,
				owner: req.body.owner,
			},
		},
		(err: unknown, docs: unknown) => {
			try {
				res.json({
					message: `invitationToken added successfully to ${req.body.invitationToken}`,
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

lists.patch('/addUserToMemberOfList', async (req: Request, res: Response) => {
	// fix duplicates in members array
	List.findOneAndUpdate(
		{ invitationToken: req.body.invitationToken },
		{ $push: { members: [...new Set([req.body.member])] } },
		(err: unknown, docs: unknown) => {
			try {
				res.json({
					message: `member added successfully to ${req.body.member}`,
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

lists.patch('/removeMemberFromList', async (req: Request, res: Response) => {
	List.findOneAndUpdate({ _id: req.body.listId }, { $pull: { members: { $in: req.body.member } } }, (err: unknown, docs: unknown) => {
		try {
			res.json({
				message: `member removed successfully to ${req.body.member}`,
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

lists.patch('/removeInvitation', async (req: Request, res: Response) => {
	List.findOneAndUpdate({ _id: req.body.listId }, { $set: { members: [], invitationToken: '' } }, (err: unknown, docs: unknown) => {
		try {
			res.json({
				message: `member removed successfully to ${req.body.member}`,
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

export default lists;
