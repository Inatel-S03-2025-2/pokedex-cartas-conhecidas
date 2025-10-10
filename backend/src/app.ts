import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import prisma from './config/prisma/client';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Defina aqui as rotas - a ser implementado
// app.use('/api/players', playerRouter);
// app.use('/api/cards', cardRouter);

// Default route
app.get('/', (req, res) => {
  res.send('Pokémon Card Tracker API');
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send({ error: err.message || 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  try {
    // Test database connection
    await prisma.$connect();
    console.log('🔌 Connected to database');
    console.log(`🚀 Server running on port ${PORT}`);
  } catch (error) {
    console.error('❌ Failed to connect to database:', error);
    process.exit(1);
  }
});

// Handle graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  console.log('💤 Database connection closed');
  process.exit(0);
});

export default app;