import { Router } from 'express';
import { addEvent } from '../controllers/eventController';

export const eventRouter = Router();

eventRouter.post('/', addEvent as any);
