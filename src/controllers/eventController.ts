import { Request, Response } from 'express';
import { EventService } from '../services/eventService';

const eventService = new EventService();

export const addEvent = async (req: Request, res: Response): Promise<Response> => {
	try {
		const { itemId, description, location, custodian } = req.body;

		const newEvent = await eventService.addEvent(description, location, custodian, itemId);

		return res.status(201).json(newEvent);
	} catch (error) {
		return res.status(500).json({ message: 'Error adding event', error });
	}
};
