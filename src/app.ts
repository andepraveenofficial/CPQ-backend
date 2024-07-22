import express, { Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import swaggerOutput from '../swagger_output.json';
import v1Routes from './api/v1';

// Load environment variables
dotenv.config({
  path: path.join(__dirname, '../.env'),
});

const app = express();

/* -----> Middlewares <----- */
app.use(express.json()); // Handle JSON data
app.use(cors()); // CORS

/* -----> Routes <----- */

// 00 Test
app.get('/', (req: Request, res: Response) => {
  console.log('Hello World');
  res.send('Hello World');
});

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));

// API v1 routes
app.use('/api/v1', v1Routes);

export default app;
