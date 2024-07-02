import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import v1Routes from './api/v1';

// Load environment variables
dotenv.config({
  path: path.join(__dirname, '../.env'),
});

const app = express();

/* -----> Middlewares <----- */
app.use(express.json()); // Handle JSON data

/* -----> Routes <----- */
// 00 Test
app.get('/', (req: Request, res: Response) => {
  console.log('Hello World');
  res.send('Hello World');
});

// API v1 routes
app.use('/api/v1', v1Routes);

export default app;
