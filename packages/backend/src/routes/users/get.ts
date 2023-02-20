import { Server } from '@hapi/hapi';
import { DataSource } from 'typeorm';
import User from '../../models/User';

export default function (server: Server, ds: DataSource) {
  server.route({
    method: 'GET',
    path: '/users',
    handler: async (_request, h) => {
      try {
        return h.response(await ds.manager.find(User)).code(200);
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
  });
}
