import { NextFunction, Request, Response } from 'express';
import { User } from '../models/user';
import { signJwt, setTokenCookie, passwordHash, deleteTokenCookie, getSessionUserId } from '../utils/auth';
import bcrypt from 'bcryptjs';

export const register = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await User.findOne({ email: req.body.email });

		if (user) return res.status(403).json({ error: 'User already exist' });

		if (!Object.keys(user || []).length) {
			const user = new User({
				username: req.body.username,
				email: req.body.email,
				password: passwordHash(req.body.password),
				_id: req.body._id,
				createdAt: Date.now(),
			});
			const token = signJwt(user?._id?.toString());
			setTokenCookie(res, token);

			if (!token) return res.status(403).send('Unauthorized');

			user.save();
			res.json({
				body: {
					username: user.username,
					email: user.email,
					_id: user._id,
					createdAt: user.createdAt,
				},
				message: `registered user with email ${req.body.email}`,
				status: 200,
				isSuccess: true,
			});
		}
	} catch (err: unknown) {
		res.status(500).json({
			success: false,
			errorMessage: `registration failed`,
		});
	}
};

export const login = async (req: Request, res: Response) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (!user) return res.status(401).json({ error: 'Wrong credentials' });

		const token = signJwt(user?._id?.toString());
		setTokenCookie(res, token);

		const validPassword = await bcrypt.compare(req.body.password, user.password);
		if (!validPassword) return res.status(401).json({ error: 'Wrong credentials' });

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
};

export const checkSession = async (req: Request, res: Response) => {
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
};

export const logout = async (req: Request, res: Response) => {
	try {
		deleteTokenCookie(req, res);
		res.status(200).json({ message: 'User logout' });
	} catch {
		res.status(500).json({
			message: 'something went wrong',
		});
	}
};

export const getUser = async (req: Request, res: Response) => {
	const user = await User.find({ _id: req.params._id });
	try {
		res.status(200).json({
			body: user[0],
		});
		if (!user) return res.status(404).json({ message: 'User not found' });
	} catch (error) {
		res.status(500).json({
			error,
		});
	}
};
