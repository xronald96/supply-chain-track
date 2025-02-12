import { AppDataSource } from '../config/database';
import { Event } from '../models/Event';

export class EventRepository {
	private repository = AppDataSource.getRepository(Event);

	async save(event: Event): Promise<Event> {
		return await this.repository.save(event);
	}

	async getLastEvent(itemId: number): Promise<Event | null> {
		const events = await this.repository.find({
			where: { item: { id: itemId } },
			order: { timestamp: 'DESC' },
			take: 1,
		});

		return events.length > 0 ? events[0] : null;
	}
}
