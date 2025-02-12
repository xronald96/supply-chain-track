import { Router } from 'express';
import { addEvent } from '../controllers/event';

export const eventRouter = Router();

eventRouter.post('/', addEvent as any);
