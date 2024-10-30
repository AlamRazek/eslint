import cors from 'cors';
import express, { Application, Request, Response } from 'express';

import globalErrorHandler from './app/middlewares/glovalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();
// const port = 3000;

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use(globalErrorHandler);

// not found route
// app.use(notFound);

export default app;
