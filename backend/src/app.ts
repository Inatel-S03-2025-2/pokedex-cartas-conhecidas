import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { apiRoutes } from './routes';
import { ApiResponse } from './utils/ApiResponse';
import { checkMissingEnvVars } from './utils/checkMissingEnvVars';

dotenv.config();
if(checkMissingEnvVars()) {
  throw new Error('Missing required environment variables. Please check the .env file.');
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