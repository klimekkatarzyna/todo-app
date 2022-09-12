import { Request, Response, CookieOptions, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dayjs from 'dayjs';
import bcrypt from 'bcryptjs';

interface IJwtData {
	_id: string;
	iat: number;
	exp: number;
}

const SECRET = process.env.SECRET_KEY!;

export const signJwt = (_id: string | undefined) => {
	return jwt.sign({ _id }, SECRET, { expiresIn: '1d' });
};

export const passwordHash = (pwd: string) => bcrypt.hash(pwd, 8);

interface IDaysNumber {
	days: number;
}

const cookieOptions = ({ days }: IDaysNumber): CookieOptions => ({
	secure: process.env.NODE_ENV === 'production',
	httpOnly: true,
	expires: dayjs().add(days, 'days').toDate(),
	sameSite: 'strict',
	domain: process.env.FRONTEND_DOMAIN,
});

export const setTokenCookie = (res: Response, token: string) => {
	if (!token) return;
	res.cookie('access_token', token, cookieOptions({ days: 1 }));
};

export const getSessionUserId = (req: Request) => {
	const token = req.cookies.access_token;
	const verified = jwt.verify(token, SECRET) as IJwtData;
	return verified?._id;
};

export const authorization = (req: Request, res: Response, next: NextFunction) => {
	const token = req.cookies.access_token;
	if (!token) return res.status(401).send({ message: 'Access denied...No token provided...', error: 401, token: undefined });
	try {
		const verified = jwt.verify(token, SECRET) as IJwtData;
		if (!verified?._id) return;
		next();
	} catch {
		return res.sendStatus(403).send('Błąd autoryzacji');
	}
};

export const deleteTokenCookie = (req: Request, res: Response) => {
	res.cookie('access_token', req.cookies.access_token, cookieOptions({ days: -2 }));
};
