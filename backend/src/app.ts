import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { apiRoutes } from './routes';
import { ApiResponse } from './utils/ApiResponse';

dotenv.config();

// Validate required environment variables
const requiredEnvVars = ['PORT', 'JWT_SECRET', 'NODE_ENV', 'DATABASE_URL'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error(`Missing required environment variables: ${missingVars.join(', ')}`);
  console.error('Please add them to your .env file or environment configuration.');
  process.exit(1);
}

const app = express();
app.use(express.json());
app.use(cors());
app.use('/', apiRoutes);

// Error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  ApiResponse.internalError(res);
});

// 404 handler
app.use('*', (req, res) => {
  ApiResponse.notFound(res, 'Endpoint não encontrado');
});

app.listen(process.env.PORT, () => {
  console.log(`Running on http://localhost:${process.env.PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});


export default app;