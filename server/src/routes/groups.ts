import express, { Request, Response } from 'express';
import { Group } from '../models/group';
import { getSessionUserId } from '../utils/auth';

const groups = express.Router();

groups.post('/createGroup', async (req: Request, res: Response) => {
	const userId = getSessionUserId(req);

	const group = new Group({
		title: req.body.title,
		themeColor: 'blue',
		createdAt: Date.now(),
		userId: userId,
	});

	group
		.save()
		.then(() => {
			res.json({
				body: {
					id: group._id,
					title: group.title,
					themeColor: group.themeColor,
					createdAt: group.createdAt,
				},
				message: `group created successfully`,
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

groups.get('/getGroups', async (req: Request, res: Response) => {
	const userId = getSessionUserId(req);

	Group.find({ userId }, (err, docs) => {
		try {
			res.json({
				body: {
					groups: docs,
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

groups.delete('/removeGroup', async (req: Request, res: Response) => {
	Group.deleteOne({ _id: req.body.groupId }, (err: unknown, docs: unknown) => {
		try {
			res.json({
				body: {
					groups: docs,
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

groups.patch('/editGroup', async (req: Request, res: Response) => {
	Group.updateOne({ _id: req.body.groupId }, { $set: { title: req.body.title } }, (err: unknown, docs: unknown) => {
		try {
			res.json({
				message: `status changed successfully to ${req.body.title}`,
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

export default groups;
