import { Event } from '../models/Event';
import { Item } from '../models/Item';
import { EventRepository } from '../repositories/eventRepository';
import { ItemRepository } from '../repositories/itemRepository';

export class ItemService {
	private itemRepository: ItemRepository;
	private eventRepository: EventRepository;

	constructor() {
		this.itemRepository = new ItemRepository();
		this.eventRepository = new EventRepository();
	}

	async createItem(name: string, color: string, price: number): Promise<Item> {
		return await this.itemRepository.createItem(name, color, price);
	}

	async updateItem(id: number, name: string, color: string, price: number): Promise<Item | null> {
		return await this.itemRepository.updateItem(id, name, color, price);
	}

	async getItemEvents(id: number): Promise<Item | null> {
		return await this.itemRepository.getItemEvents(id);
	}

	async getLastEvent(itemId: number): Promise<Event | null> {
		return await this.eventRepository.getLastEvent(itemId);
	}
}
