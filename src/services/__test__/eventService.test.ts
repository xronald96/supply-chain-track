import { EventService } from '../eventService';
import { EventRepository } from '../../repositories/eventRepository';
import { ItemRepository } from '../../repositories/itemRepository';
import { Event } from '../../models/Event';
import { Item } from '../../models/Item';

jest.mock('../../repositories/eventRepository');
jest.mock('../../repositories/itemRepository');

describe('EventService', () => {
	let eventService: EventService;
	let mockEventRepository: jest.Mocked<EventRepository>;
	let mockItemRepository: jest.Mocked<ItemRepository>;

	beforeEach(() => {
		mockEventRepository = new EventRepository() as jest.Mocked<EventRepository>;
		mockItemRepository = new ItemRepository() as jest.Mocked<ItemRepository>;

		eventService = new EventService();
		(eventService as any).eventRepository = mockEventRepository;
		(eventService as any).itemRepository = mockItemRepository;
	});

	describe('addEvent', () => {
		it('should add and return a new event when item exists', async () => {
			const mockItem = new Item();
			mockItem.id = 1;
			mockItem.name = 'Test Item';

			const mockEvent = new Event();
			mockEvent.id = 1;
			mockEvent.description = 'Event Description';
			mockEvent.location = 'Warehouse';
			mockEvent.custodian = 'John Doe';
			mockEvent.item = mockItem;
			mockEvent.timestamp = new Date();

			mockItemRepository.getItemById.mockResolvedValue(mockItem);
			mockEventRepository.save.mockResolvedValue(mockEvent);

			const result = await eventService.addEvent(
				'Event Description',
				'Warehouse',
				'John Doe',
				1,
			);

			expect(mockItemRepository.getItemById).toHaveBeenCalledWith(1);
			expect(mockEventRepository.save).toHaveBeenCalledWith(
				expect.objectContaining({
					description: 'Event Description',
					location: 'Warehouse',
					custodian: 'John Doe',
					item: mockItem,
				}),
			);

			expect(result).toBe(mockEvent);
		});

		it('should throw an error if the item does not exist', async () => {
			mockItemRepository.getItemById.mockResolvedValue(null);

			await expect(
				eventService.addEvent('Event Description', 'Warehouse', 'John Doe', 99),
			).rejects.toThrow('Item with id 99 not found');

			expect(mockItemRepository.getItemById).toHaveBeenCalledWith(99);
			expect(mockEventRepository.save).not.toHaveBeenCalled();
		});
	});
});
