import swaggerJSDoc from 'swagger-jsdoc';

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Supply Chain API',
			version: '1.0.0',
			description: 'API for tracking supply chain items',
		},
		servers: [{ url: 'http://localhost:3000' }],
	},
	apis: ['src/routes/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);
