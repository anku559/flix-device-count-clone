import { join } from 'path';

import Express, { Application, Request, Response } from 'express';

import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import routeFunction from './routes/index.routes';

const app: Application = Express();

// PUBLIC PATH
app.use(Express.static(join(__dirname, 'public')));
app.use(Express.static(join(__dirname, 'uploads')));

// TEMPLATE ENGINE
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');

// MIDDLEWARE
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(compression());
app.use(cors());
app.use(helmet());

// ROUTES
routeFunction(app);

// INVALID ROUTES
app.get('*', (req: Request, res: Response) => {
  res.status(404).json({
    code: 404,
    info: 'Not Found.',
    status: true,
    message: 'The resource you looking for needs an valid end point.',
  });
});

export default app;
