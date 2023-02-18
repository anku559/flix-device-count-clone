import { Application } from 'express';
import planRoutes from './plan.routes';
import userRoutes from './user.routes';
import devicesRoutes from './device.routes';

export default (app: Application) => {
  app.use('/api/plan', planRoutes);

  app.use('/api/user', userRoutes);

  app.use('/api/device', devicesRoutes);
};
