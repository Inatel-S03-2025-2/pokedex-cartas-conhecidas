import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { apiRoutes } from './routes';
import { ApiResponse } from './utils/ApiResponse';
import { checkMissingEnvVars } from './utils/checkMissingEnvVars';
import { swaggerSpec, swaggerHealthCheck } from './config/swagger';

dotenv.config();
if(checkMissingEnvVars()) {
  throw new Error('Missing required environment variables. Please check the .env file.');
}

const app = express();
app.use(express.json());
app.use(cors());

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Pokédex API Documentation'
}));
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
app.get('/health', swaggerHealthCheck);

app.use('/', apiRoutes);

// Error handling
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  ApiResponse.internalError(res);
});

// 404 handler
app.use('*', (req, res) => {
  ApiResponse.notFound(res, 'Endpoint não encontrado');
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
  console.log(`API Documentation: http://localhost:${process.env.PORT}/api-docs`);
  console.log(`Health Check: http://localhost:${process.env.PORT}/health`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});


export default app;