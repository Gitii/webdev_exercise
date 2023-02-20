import Hapi from '@hapi/hapi';
import { DataSource } from 'typeorm';
import setupCreateRoute from './routes/users/create';
import setupDeleteRoute from './routes/users/delete';
import setupGetRoute from './routes/users/get';

export function createServer(ds: DataSource) {
  const server = Hapi.server({
    port: 3005,
    host: 'localhost',
    routes: {
      cors: true,
    },
    debug: { request: ['*'], log: '*' },
  });

  setupCreateRoute(server, ds);
  setupGetRoute(server, ds);
  setupDeleteRoute(server, ds);

  return server;
}
