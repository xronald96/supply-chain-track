import { ItemRepository } from '../itemRepository';
import { Item } from '../../models/Item';
import { Event } from '../../models/Event';
import { AppDataSource } from '../../config/database';

jest.mock('../../config/database', () => ({
	AppDataSource: {
		getRepository: jest.fn(),
	},
}));

describe('ItemRepository', () => {
	let itemRepository: ItemRepository;
	let mockRepository: jest.Mocked<any>;

	beforeEach(() => {
		mockRepository = {
			save: jest.fn(),
			findOne: jest.fn(),
			findOneBy: jest.fn(),
		};

		(AppDataSource.getRepository as jest.Mock).mockReturnValue(mockRepository);

		itemRepository = new ItemRepository();
	});

	describe('createItem', () => {
		it('should create and return a new item', async () => {
			const mockItem = new Item();
			mockItem.id = 1;
			mockItem.name = 'Test Item';
			mockItem.color = 'Red';
			mockItem.price = 100;

			mockRepository.save.mockResolvedValue(mockItem);

			const result = await itemRepository.createItem('Test Item', 'Red', 100);

			expect(mockRepository.save).toHaveBeenCalledWith(
				expect.objectContaining({
					name: 'Test Item',
					color: 'Red',
					price: 100,
				}),
			);

			expect(result).toBe(mockItem);
		});
	});

	describe('updateItem', () => {
		it('should update an existing item and return it', async () => {
			const mockItem = new Item();
			mockItem.id = 1;
			mockItem.name = 'Old Name';
			mockItem.color = 'Blue';
			mockItem.price = 50;

			mockRepository.findOneBy.mockResolvedValue(mockItem);
			mockRepository.save.mockResolvedValue(mockItem);

			const result = await itemRepository.updateItem(1, 'New Name', 'Green', 75);

			expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
			expect(mockRepository.save).toHaveBeenCalledWith(
				expect.objectContaining({
					name: 'New Name',
					color: 'Green',
					price: 75,
				}),
			);

			expect(result).toBe(mockItem);
		});

		it('should return null if the item does not exist', async () => {
			mockRepository.findOneBy.mockResolvedValue(null);

			const result = await itemRepository.updateItem(99, 'New Name', 'Green', 75);

			expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 99 });
			expect(result).toBeNull();
		});
	});

	describe('getItemById', () => {
		it('should return an item if found', async () => {
			const mockItem = new Item();
			mockItem.id = 1;
			mockItem.name = 'Existing Item';

			mockRepository.findOne.mockResolvedValue(mockItem);

			const result = await itemRepository.getItemById(1);

			expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
			expect(result).toBe(mockItem);
		});

		it('should return null if no item exists', async () => {
			mockRepository.findOne.mockResolvedValue(null);

			const result = await itemRepository.getItemById(2);

			expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 2 } });
			expect(result).toBeNull();
		});
	});

	describe('getItemEvents', () => {
		it('should return an item with its events', async () => {
			const mockEvent = new Event();
			mockEvent.id = 1;
			mockEvent.description = 'Event 1';

			const mockItem = new Item();
			mockItem.id = 1;
			mockItem.name = 'Item with Events';
			mockItem.events = [mockEvent];

			mockRepository.findOne.mockResolvedValue(mockItem);

			const result = await itemRepository.getItemEvents(1);

			expect(mockRepository.findOne).toHaveBeenCalledWith({
				where: { id: 1 },
				relations: ['events'],
			});

			expect(result).toBe(mockItem);
			expect(result?.events).toHaveLength(1);
		});

		it('should return null if the item does not exist', async () => {
			mockRepository.findOne.mockResolvedValue(null);

			const result = await itemRepository.getItemEvents(99);

			expect(mockRepository.findOne).toHaveBeenCalledWith({
				where: { id: 99 },
				relations: ['events'],
			});

			expect(result).toBeNull();
		});
	});
});
