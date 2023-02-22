import { Server } from '@hapi/hapi';
import { DataSource } from 'typeorm';
import Joi from 'joi';
import Skill from '../../models/Skill';

export default function (server: Server, ds: DataSource) {
  server.route({
    method: 'POST',
    path: '/skills',
    options: {
      validate: {
        payload: Joi.object({
          name: Joi.string().required().max(80),
        }),
      },
    },
    handler: async (request, h) => {
      const { name } = request.payload as { name: string };

      await ds.manager.insert(Skill, {
        name,
      });

      return h.response().code(201);
    },
  });
}
