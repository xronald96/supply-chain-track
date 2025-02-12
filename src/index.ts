import express from 'express';
import { json } from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { itemRouter } from './routes/item';
import { eventRouter } from './routes/event';
import { errorHandler } from './middleware/errorHandler';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { AppDataSource } from './config/database';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const swaggerDocument = YAML.load('./src/docs/swagger.yaml');

app.use(json());
app.use(cors());
app.use(helmet());

AppDataSource.initialize()
	.then(() => console.log('Database connected successfully'))
	.catch((err) => console.error('Database connection error:', err));

app.use('/api/items', itemRouter);
app.use('/api/events', eventRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
