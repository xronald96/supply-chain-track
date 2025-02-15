import { NextFunction, Request, Response } from 'express';
import { ItemService } from '../services/itemService';

const itemService = new ItemService();

export const createItem = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { name, color, price } = req.body;
		const newItem = await itemService.createItem(name, color, price);
		res.status(201).json(newItem);
	} catch (error) {
		next(error);
	}
};

export const updateItem = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;
		const { name, color, price } = req.body;

		const updatedItem = await itemService.updateItem(parseInt(id), name, color, price);

		if (!updatedItem) {
			return res.status(404).json({ message: 'Item not found' });
		}

		res.json(updatedItem);
	} catch (error) {
		next(error);
	}
};

export const getItemEvents = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;
		const item = await itemService.getItemEvents(parseInt(id));

		if (!item) {
			return res.status(404).json({ message: 'Item not found' });
		}

		res.json(item.events);
	} catch (error) {
		next(error);
	}
};

export const getLastEvent = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { itemId } = req.params;
		const lastEvent = await itemService.getLastEvent(parseInt(itemId));

		if (!lastEvent) {
			return res.status(404).json({ message: 'No events found for this item' });
		}

		res.json(lastEvent);
	} catch (error) {
		next(error);
	}
};
