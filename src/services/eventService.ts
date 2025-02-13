import { Event } from '../models/Event';
import { EventRepository } from '../repositories/eventRepository';
import { ItemRepository } from '../repositories/itemRepository';

export class EventService {
	private eventRepository: EventRepository;
	private itemRepository: ItemRepository;

	constructor() {
		this.eventRepository = new EventRepository();
		this.itemRepository = new ItemRepository();
	}

	async addEvent(
		description: string,
		location: string,
		custodian: string,
		itemId: number,
	): Promise<Event> {
		const newEvent = new Event();
		newEvent.description = description;
		newEvent.location = location;
		newEvent.custodian = custodian;
		newEvent.timestamp = new Date();

		const item = await this.itemRepository.getItemById(itemId);

		if (!item) {
			throw new Error(`Item with id ${itemId} not found`);
		}

		newEvent.item = item;

		return await this.eventRepository.save(newEvent);
	}
}
