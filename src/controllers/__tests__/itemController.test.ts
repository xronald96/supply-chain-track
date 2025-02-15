import request from 'supertest';
import { ItemService } from '../../services/itemService';
import { Item } from '../../models/Item';
import app from '../..';

// Mock the ItemService class and its methods
jest.mock('../../services/itemService', () => {
	return {
		ItemService: jest.fn().mockImplementation(() => ({
			createItem: jest.fn(),
			updateItem: jest.fn(),
			getItemEvents: jest.fn(),
			getLastEvent: jest.fn(),
		})),
	};
});

describe('Item Controller', () => {
	let itemServiceMock: jest.Mocked<ItemService>;

	beforeEach(() => {
		// Create a new instance of the mocked ItemService
		itemServiceMock = new ItemService() as jest.Mocked<ItemService>;
	});

	afterEach(() => {
		// Clear all mocks after each test
		jest.clearAllMocks();
	});

	afterAll(() => {
		// Clean up any resources after all tests
		jest.restoreAllMocks();
	});

	test('POST /items should create an item', async () => {
		const mockItem: Item = { id: 10, name: 'Test Item', color: 'Blue', price: 100, events: [] };
		itemServiceMock.createItem.mockResolvedValue(mockItem);

		const response = await request(app).post('/items').send({
			name: 'Test Item',
			color: 'Blue',
			price: 100,
		});

		expect(response.status).toBe(201);
		expect(response.body).toEqual(mockItem);
	});

	test('PUT /items/:id should update an item', async () => {
		const mockUpdatedItem: Item = {
			id: 1,
			name: 'Updated Item',
			color: 'Red',
			price: 150,
			events: [],
		};
		itemServiceMock.updateItem.mockResolvedValue(mockUpdatedItem);

		const response = await request(app).put('/items/1').send({
			name: 'Updated Item',
			color: 'Red',
			price: 150,
		});

		expect(response.status).toBe(200);
		expect(response.body).toEqual(mockUpdatedItem);
	});

	// Uncomment and fix these tests if needed
	/*
	test('GET /items/:id/events should return item events', async () => {
		const mockEvents: Event[] = [{ event: 'created', timestamp: new Date('2024-02-13') }];
		itemServiceMock.getItemEvents.mockResolvedValue({
			events: mockEvents,
		});

		const response = await request(app).get('/items/1/events');

		expect(response.status).toBe(200);
		expect(response.body).toEqual(mockEvents);
	});

	test('GET /items/:id/last-event should return last event', async () => {
		const mockLastEvent = { event: 'updated', timestamp: '2024-02-14' };
		itemServiceMock.getLastEvent.mockResolvedValue(mockLastEvent);

		const response = await request(app).get('/items/1/last-event');

		expect(response.status).toBe(200);
		expect(response.body).toEqual(mockLastEvent);
	});
	*/
});
