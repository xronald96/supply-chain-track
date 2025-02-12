import { Router } from 'express';
import { createItem, updateItem, getItemEvents, getLastEvent } from '../controllers/itemController';

export const itemRouter = Router();

itemRouter.post('/', createItem);
itemRouter.put('/:id', updateItem as any);
itemRouter.get('/:id/events', getItemEvents as any);
itemRouter.get('/:itemId/last-event', getLastEvent as any);
