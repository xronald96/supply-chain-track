// controllers/ItemController.ts
import { Request, Response } from 'express';
import { ItemService } from '../services/itemService';

const itemService = new ItemService();

// Crear un item
export const createItem = async (req: Request, res: Response) => {
	try {
		const { name, color, price } = req.body;
		const newItem = await itemService.createItem(name, color, price);
		res.status(201).json(newItem);
	} catch (error) {
		res.status(500).json({ message: 'Error creating item', error });
	}
};

// Actualizar un item
export const updateItem = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { name, color, price } = req.body;

		const updatedItem = await itemService.updateItem(parseInt(id), name, color, price);

		if (!updatedItem) {
			return res.status(404).json({ message: 'Item not found' });
		}

		res.json(updatedItem);
	} catch (error) {
		res.status(500).json({ message: 'Error updating item', error });
	}
};

// Obtener los eventos de un item
export const getItemEvents = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const item = await itemService.getItemEvents(parseInt(id));

		if (!item) {
			return res.status(404).json({ message: 'Item not found' });
		}

		res.json(item.events);
	} catch (error) {
		res.status(500).json({ message: 'Error fetching events', error });
	}
};

// Obtener el último evento de un item
export const getLastEvent = async (req: Request, res: Response) => {
	try {
		const { itemId } = req.params;
		const lastEvent = await itemService.getLastEvent(parseInt(itemId));

		if (!lastEvent) {
			return res.status(404).json({ message: 'No events found for this item' });
		}

		res.json(lastEvent);
	} catch (error) {
		res.status(500).json({ message: 'Error fetching last event', error });
	}
};
