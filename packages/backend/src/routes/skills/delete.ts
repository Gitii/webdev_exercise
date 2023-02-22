import Boom from '@hapi/boom';
import { Server } from '@hapi/hapi';
import Joi from 'joi';
import { DataSource } from 'typeorm';
import Skill from '../../models/Skill';

export default function (server: Server, ds: DataSource) {
  server.route({
    method: 'DELETE',
    path: '/skills/{id}',
    options: {
      validate: {
        params: Joi.object({
          id: Joi.number().integer(),
        }),
      },
    },
    handler: async (request, h) => {
      const skill = await ds.manager.findOne(Skill, {
        where: {
          id: request.params.name as unknown as number,
        },
      });

      if (!skill) {
        return Boom.notFound();
      }

      await ds.manager.remove(skill);

      return h.response().code(204);
    },
  });
}
