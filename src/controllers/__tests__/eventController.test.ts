import request from 'supertest';
import app from '../..';
import { AppDataSource } from '../../config/database';

// Crear un mock manual del servicio
const mockAddEvent = jest.fn();

jest.mock('../../services/eventService', () => {
	return {
		EventService: jest.fn().mockImplementation(() => ({
			addEvent: jest.fn(),
		})),
	};
});

describe('POST /events', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});
	afterEach(() => {
		AppDataSource.destroy();
	});

	it('should add a new event and return 201', async () => {
		const mockEvent = {
			id: '123',
			description: 'Test event',
			location: 'Test location',
			custodian: 'John Doe',
			itemId: '456',
		};

		mockAddEvent.mockResolvedValue(mockEvent);

		const response = await request(app)
			.post('/events')
			.send({
				description: 'Test event',
				location: 'Test location',
				custodian: 'John Doe',
				itemId: '456',
			})
			.expect(201);

		expect(mockAddEvent).toHaveBeenCalledWith('Test event', 'Test location', 'John Doe', '456');
		expect(response.body).toEqual(mockEvent);
	});

	it('should return 500 if service throws an error', async () => {
		mockAddEvent.mockRejectedValue(new Error('Service failure'));

		const response = await request(app)
			.post('/events')
			.send({
				description: 'Test event',
				location: 'Test location',
				custodian: 'John Doe',
				itemId: '456',
			})
			.expect(500);

		expect(response.body).toHaveProperty('message', 'Error adding event');
	});
});
