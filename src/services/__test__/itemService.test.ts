import { ItemService } from '../itemService';
import { ItemRepository } from '../../repositories/itemRepository';
import { EventRepository } from '../../repositories/eventRepository';
import { Item } from '../../models/Item';
import { Event } from '../../models/Event';

jest.mock('../../repositories/itemRepository');
jest.mock('../../repositories/eventRepository');

describe('ItemService', () => {
	let itemService: ItemService;
	let mockItemRepository: jest.Mocked<ItemRepository>;
	let mockEventRepository: jest.Mocked<EventRepository>;

	beforeEach(() => {
		mockItemRepository = new ItemRepository() as jest.Mocked<ItemRepository>;
		mockEventRepository = new EventRepository() as jest.Mocked<EventRepository>;

		itemService = new ItemService();
		(itemService as any).itemRepository = mockItemRepository;
		(itemService as any).eventRepository = mockEventRepository;
	});

	describe('createItem', () => {
		it('should create and return a new item', async () => {
			const mockItem = new Item();
			mockItem.id = 1;
			mockItem.name = 'New Item';
			mockItem.color = 'Red';
			mockItem.price = 100;

			mockItemRepository.createItem.mockResolvedValue(mockItem);

			const result = await itemService.createItem('New Item', 'Red', 100);

			expect(mockItemRepository.createItem).toHaveBeenCalledWith('New Item', 'Red', 100);
			expect(result).toBe(mockItem);
		});
	});

	describe('updateItem', () => {
		it('should update an existing item and return it', async () => {
			const mockItem = new Item();
			mockItem.id = 1;
			mockItem.name = 'Updated Item';
			mockItem.color = 'Blue';
			mockItem.price = 200;

			mockItemRepository.updateItem.mockResolvedValue(mockItem);

			const result = await itemService.updateItem(1, 'Updated Item', 'Blue', 200);

			expect(mockItemRepository.updateItem).toHaveBeenCalledWith(
				1,
				'Updated Item',
				'Blue',
				200,
			);
			expect(result).toBe(mockItem);
		});

		it('should return null if item does not exist', async () => {
			mockItemRepository.updateItem.mockResolvedValue(null);

			const result = await itemService.updateItem(99, 'Updated Item', 'Blue', 200);

			expect(mockItemRepository.updateItem).toHaveBeenCalledWith(
				99,
				'Updated Item',
				'Blue',
				200,
			);
			expect(result).toBeNull();
		});
	});

	describe('getItemEvents', () => {
		it('should return an item with its events', async () => {
			const mockEvent = new Event();
			mockEvent.id = 1;
			mockEvent.description = 'Test Event';

			const mockItem = new Item();
			mockItem.id = 1;
			mockItem.name = 'Item with Events';
			mockItem.events = [mockEvent];

			mockItemRepository.getItemEvents.mockResolvedValue(mockItem);

			const result = await itemService.getItemEvents(1);

			expect(mockItemRepository.getItemEvents).toHaveBeenCalledWith(1);
			expect(result).toBe(mockItem);
			expect(result?.events).toHaveLength(1);
		});

		it('should return null if item does not exist', async () => {
			mockItemRepository.getItemEvents.mockResolvedValue(null);

			const result = await itemService.getItemEvents(99);

			expect(mockItemRepository.getItemEvents).toHaveBeenCalledWith(99);
			expect(result).toBeNull();
		});
	});

	describe('getLastEvent', () => {
		it('should return the last event for a given item', async () => {
			const mockEvent = new Event();
			mockEvent.id = 1;
			mockEvent.description = 'Last Event';

			mockEventRepository.getLastEvent.mockResolvedValue(mockEvent);

			const result = await itemService.getLastEvent(1);

			expect(mockEventRepository.getLastEvent).toHaveBeenCalledWith(1);
			expect(result).toBe(mockEvent);
		});

		it('should return null if no events exist for the item', async () => {
			mockEventRepository.getLastEvent.mockResolvedValue(null);

			const result = await itemService.getLastEvent(99);

			expect(mockEventRepository.getLastEvent).toHaveBeenCalledWith(99);
			expect(result).toBeNull();
		});
	});
});
