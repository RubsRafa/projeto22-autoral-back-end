import 'reflect-metadata';
import 'express-async-errors';
import express, { json } from 'express';
import cors from 'cors';

const app = express();
app
  .use(cors())
  .use(json())
  .get('/health', (_req, res) => res.send('OK!'))

export default app;