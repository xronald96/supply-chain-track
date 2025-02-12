import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Item } from '../models/Item';
import { Event } from '../models/Event';

const itemRepository = AppDataSource.getRepository(Item);
const eventRepository = AppDataSource.getRepository(Event);

export const createItem = async (req: Request, res: Response) => {
	try {
		const { name, color, price } = req.body;
		const newItem = new Item();
		newItem.name = name;
		newItem.color = color;
		newItem.price = price;

		await itemRepository.save(newItem);
		res.status(201).json(newItem);
	} catch (error) {
		res.status(500).json({ message: 'Error creating item', error });
	}
};

export const updateItem = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { name, color, price } = req.body;

		const item = await itemRepository.findOneBy({ id: parseInt(id) });
		if (!item) {
			return res.status(404).json({ message: 'Item not found' });
		}

		item.name = name;
		item.color = color;
		item.price = price;

		await itemRepository.save(item);
		res.json(item);
	} catch (error) {
		res.status(500).json({ message: 'Error updating item', error });
	}
};

export const getItemEvents = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const item = await itemRepository.findOne({
			where: { id: parseInt(id) },
			relations: ['events'],
		});

		if (!item) {
			return res.status(404).json({ message: 'Item not found' });
		}

		res.json(item.events);
	} catch (error) {
		res.status(500).json({ message: 'Error fetching events', error });
	}
};

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

		return res.json(events[0]);
	} catch (error) {
		return res.status(500).json({ message: 'Error fetching last event', error });
	}
};
