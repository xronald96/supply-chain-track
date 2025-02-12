import { Router } from 'express';
import { addEvent, getLastEvent } from '../controllers/event';

export const eventRouter = Router();

eventRouter.post('/', addEvent as any);
eventRouter.get('/:itemId/last-event', getLastEvent as any);
