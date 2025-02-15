import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: Error, req: Request, res: Response) => {
	res.status(500).json({ error: 'Internal Server Error' });
};
