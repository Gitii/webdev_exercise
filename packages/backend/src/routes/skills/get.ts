import { Server } from '@hapi/hapi';
import { DataSource } from 'typeorm';
import Skill from '../../models/Skill';

export default function (server: Server, ds: DataSource) {
  server.route({
    method: 'GET',
    path: '/skills',
    handler: async (_request, h) => {
      return h.response(await ds.manager.find(Skill)).code(200);
    },
  });
}
