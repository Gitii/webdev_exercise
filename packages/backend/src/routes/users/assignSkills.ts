import { Server } from '@hapi/hapi';
import User from '../../models/User';
import { DataSource, In } from 'typeorm';
import Joi from 'joi';
import Boom from '@hapi/boom';
import Skill from '../../models/Skill';

export default function (server: Server, ds: DataSource) {
  server.route({
    method: 'POST',
    path: '/users/{userId}/assignSkills',
    options: {
      validate: {
        payload: Joi.object({
          skillIds: Joi.array().items(Joi.number().integer()).required(),
        }),
      },
    },
    handler: async (request, h) => {
      const { skillIds } = request.payload as { skillIds: number[] };
      const { userId } = request.params as { userId: string };

      const user = await ds.manager.findOne(User, {
        where: {
          id: Number(userId),
        },
      });

      if (!user) {
        return Boom.notFound('User not found');
      }

      const skills = await ds.manager.findBy(Skill, { id: In(skillIds) });

      if (skills.length != skillIds.length) {
        return Boom.notFound('Not all skills found');
      }

      user.skills = skills;
      console.log(await ds.manager.save(user), user, skillIds);

      return h.response({ message: 'Skills assigned' }).code(201);
    },
  });
}
