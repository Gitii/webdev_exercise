import { Server } from '@hapi/hapi';
import User from '../../models/User';
import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';
import { range } from 'lodash';

export default function (server: Server, ds: DataSource) {
  server.route({
    method: 'POST',
    path: '/users',
    handler: async (_request, h) => {
      await ds.manager.insert(
        User,
        range(10).map(() => ({
          name: faker.name.fullName(),
        })),
      );

      return h.response().code(201);
    },
  });
}
