import { Server } from '@hapi/hapi';
import { DataSource } from 'typeorm';
import User from '../../models/User';

export default function (server: Server, ds: DataSource) {
  server.route({
    method: 'DELETE',
    path: '/users',
    handler: async (_request, h) => {
      await ds.manager.clear(User);

      return h.response().code(201);
    },
  });
}
