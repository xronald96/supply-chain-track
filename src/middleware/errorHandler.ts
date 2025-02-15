import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
	console.error('error hbalde', err.message);
	res.status(500).json({ error: 'Internal Server Error' });
};
