import express, { NextFunction, Request, Response } from 'express';
import { User } from '../models/user';
import { signJwt, setTokenCookie, passwordHash, deleteTokenCookie, getSessionUserId, authorization } from '../utils/auth';
import { registerValidationSchema, RegisterValidationType, loginValidationSchema, LoginValidationType } from '@kkrawczyk/todo-common';
import { validateBody } from '../utils/validation';

const router = express.Router();

router.post('/register', validateBody<RegisterValidationType>(registerValidationSchema), async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await User.findOne({ email: req.body.email });

		if (user) return res.status(403).send('User already exist');

		if (!Object.keys(user || []).length) {
			const user = new User({
				username: req.body.username,
				email: req.body.email,
				password: passwordHash(req.body.password),
				id: req.body._id,
				createdAt: Date.now(),
			});
			const token = signJwt(user?._id.toString());
			setTokenCookie(res, token);

			if (!token) return res.status(403).send('Unauthorized');

			user.save();
			res.json({
				body: {
					username: user.username,
					email: user.email,
					id: user._id,
					createdAt: user.createdAt,
				},
				message: `registered user with email ${req.body.email}`,
				status: 200,
			});
		}
	} catch (err: unknown) {
		res.status(500).json({
			success: false,
			errorMessage: `registration failed`,
		});
	}
});

router.post('/login', validateBody<LoginValidationType>(loginValidationSchema), async (req: Request, res: Response) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		const token = signJwt(user?._id.toString() || '');

		//Check if password entered is correct
		// const validPassword = await bcrypt.compare(req.body.password, user.password);
		// if (!validPassword) return res.status(400).send("Password is incorrect");

		setTokenCookie(res, token);

		if (!token) return res.status(403).send('Unauthorized');

		res.json({
			body: {
				_id: user?._id || '',
				username: user?.username || '',
				email: user?.email || '',
				password: passwordHash(req.body.password),
				createdAt: user?.createdAt || '',
			},
			message: `login user with email ${req.body.email}`,
			isSuccess: true,
		});
	} catch (err) {
		res.status(500).json({
			isSuccess: false,
			errorMessage: `invalid credentials`,
			err,
		});
	}
});

router.get('/me', authorization, async (req: Request, res: Response) => {
	try {
		const userId = getSessionUserId(req);
		const user = await User.findById(userId);

		if (!user) return;

		res.status(200).json({
			message: 'Successful log in',
			body: {
				user,
			},
			isSuccess: true,
		});
	} catch (err) {
		res.status(403).json({
			isSuccess: false,
			errorMessage: 'unsuccesful log in',
		});
	}
});

router.post('/logout', async (req: Request, res: Response) => {
	try {
		deleteTokenCookie(req, res);
		res.status(200).json({ message: 'User logout' });
	} catch {
		res.status(500).json({
			message: 'something went wrong',
		});
	}
});

export default router;
