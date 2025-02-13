import { DataSource } from 'typeorm';
import { EventRepository } from '../eventRepository';
import { Event } from '../../models/Event';
import { Item } from '../../models/Item';

jest.mock('../../config/database', () => ({
	AppDataSource: {
		getRepository: jest.fn(),
	},
}));

describe('EventRepository', () => {
	let eventRepository: EventRepository;
	let mockRepository: any;

	beforeEach(() => {
		mockRepository = {
			save: jest.fn(),
			find: jest.fn(),
		};
		(require('../../config/database').AppDataSource.getRepository as jest.Mock).mockReturnValue(
			mockRepository,
		);

		eventRepository = new EventRepository();
	});

	describe('save', () => {
		it('should save an event successfully', async () => {
			const mockEvent = new Event();
			mockEvent.id = 1;
			mockEvent.description = 'Test event';
			mockEvent.location = 'Test location';
			mockEvent.custodian = 'Test custodian';
			mockEvent.timestamp = new Date();
			mockEvent.item = new Item();
			mockEvent.item.id = 1;

			mockRepository.save.mockResolvedValue(mockEvent);

			const result = await eventRepository.save(mockEvent);

			expect(mockRepository.save).toHaveBeenCalledWith(mockEvent);
			expect(result).toBe(mockEvent);
		});
	});

	describe('getLastEvent', () => {
		it('should return the most recent event if it exists', async () => {
			const mockEvent = new Event();
			mockEvent.id = 1;
			mockEvent.description = 'Latest event';
			mockEvent.timestamp = new Date();
			mockEvent.item = new Item();
			mockEvent.item.id = 1;

			mockRepository.find.mockResolvedValue([mockEvent]);

			const result = await eventRepository.getLastEvent(1);

			expect(mockRepository.find).toHaveBeenCalledWith({
				where: { item: { id: 1 } },
				order: { timestamp: 'DESC' },
				take: 1,
			});

			expect(result).toBe(mockEvent);
		});

		it('should return null if no events exist', async () => {
			mockRepository.find.mockResolvedValue([]);

			const result = await eventRepository.getLastEvent(1);

			expect(mockRepository.find).toHaveBeenCalledWith({
				where: { item: { id: 1 } },
				order: { timestamp: 'DESC' },
				take: 1,
			});

			expect(result).toBeNull();
		});
	});
});
