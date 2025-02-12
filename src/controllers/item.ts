import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Item } from '../models/Item';

const itemRepository = AppDataSource.getRepository(Item);

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
