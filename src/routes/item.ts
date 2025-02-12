import { Router } from 'express';
import { createItem, updateItem, getItemEvents } from '../controllers/item';

export const itemRouter = Router();

itemRouter.post('/', createItem);
itemRouter.put('/:id', updateItem as any);
itemRouter.get('/:id/events', getItemEvents as any);
