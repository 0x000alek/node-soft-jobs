import cors from 'cors';
import express from 'express';

import { config } from './config/project.config.js';

import { logger } from './src/utils/logger.utils.js';
import logMiddleware from './middleware/log.middleware.js';

import projectRoutes from './routes/project.routes.js';

const { protocol, host, port } = config.server;
const serverUrl = `${protocol}://${host}:${port}`;

const app = express();

app.use(express.json());
app.use(cors());

app.use(logMiddleware.logger());

app.use(projectRoutes);

app.listen(port, () => {
  logger.info(`Server on fire 🔥 ${serverUrl}`);
});
