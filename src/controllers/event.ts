import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Event } from '../models/Event';
import { Item } from '../models/Item';

const eventRepository = AppDataSource.getRepository(Event);
const itemRepository = AppDataSource.getRepository(Item);

// Añadir un evento
export const addEvent = async (req: Request, res: Response): Promise<Response> => {
	try {
		const { itemId, description, location } = req.body;
		const item = await itemRepository.findOneBy({ id: itemId });

		if (!item) {
			return res.status(404).json({ message: 'Item not found' });
		}

		const newEvent = new Event();
		newEvent.description = description;
		newEvent.location = location;
		newEvent.timestamp = new Date();
		newEvent.item = item;

		await eventRepository.save(newEvent);
		return res.status(201).json(newEvent); // Asegúrate de que siempre se devuelve una respuesta
	} catch (error) {
		return res.status(500).json({ message: 'Error adding event', error });
	}
};

// Obtener el último evento de un item
export const getLastEvent = async (req: Request, res: Response): Promise<Response> => {
	try {
		const { itemId } = req.params;
		const events = await eventRepository.find({
			where: { item: { id: parseInt(itemId) } },
			order: { timestamp: 'DESC' },
			take: 1,
		});

		if (events.length === 0) {
			return res.status(404).json({ message: 'No events found for this item' });
		}

		return res.json(events[0]); // Retornar siempre una respuesta
	} catch (error) {
		return res.status(500).json({ message: 'Error fetching last event', error });
	}
};
