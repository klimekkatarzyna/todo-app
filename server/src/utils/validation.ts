import * as yup from 'yup';
import { Request, Response, NextFunction } from 'express';

export const validateParams =
	<T>(schema: yup.SchemaOf<T>) =>
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			await schema.validate(req.params);
			return next();
		} catch (err) {
			return res.status(406).json(err);
		}
	};

export const validateBody =
	<T>(schema: yup.SchemaOf<T>) =>
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			await schema.validate(req.body);
			return next();
		} catch (err) {
			return res.status(406).json(err);
		}
	};
