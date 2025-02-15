import { Router } from 'express';
import { createItem, updateItem, getItemEvents, getLastEvent } from '../controllers/itemController';
import {
	handleValidationErrors,
	validateCreateItem,
	validateUpdateItem,
} from './validators/itemValidator';

export const itemRouter = Router();

itemRouter.post('/', ...validateCreateItem, handleValidationErrors as any, createItem);
itemRouter.put('/:id', validateUpdateItem, handleValidationErrors as any, updateItem as any);
itemRouter.get('/:id/events', getItemEvents as any);
itemRouter.get('/:itemId/last-event', getLastEvent as any);
