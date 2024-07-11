import express, { Application } from 'express';
import { json } from 'body-parser';
import v0Routes from '@/api/v0/routes';

const app: Application = express();

app.use(json());

app.use('/api/v0', v0Routes);
export default app;
