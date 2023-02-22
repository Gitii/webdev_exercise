import Hapi from '@hapi/hapi';
import { DataSource } from 'typeorm';
import setupUserCreateRoute from './routes/users/create';
import setupUserDeleteRoute from './routes/users/delete';
import setupUserGetRoute from './routes/users/get';
import setupAssignSkillsRoute from './routes/users/assignSkills';
import setupSkillCreateRoute from './routes/skills/create';
import setupSkillDeleteRoute from './routes/skills/delete';
import setupSkillGetRoute from './routes/skills/get';

export default function createServer(ds: DataSource) {
  const server = Hapi.server({
    port: 3005,
    host: 'localhost',
    routes: {
      cors: true,
    },
    debug: { request: ['*'], log: '*' },
  });

  [
    setupUserCreateRoute,
    setupUserDeleteRoute,
    setupUserGetRoute,
    setupSkillCreateRoute,
    setupSkillGetRoute,
    setupSkillDeleteRoute,
    setupAssignSkillsRoute,
  ].forEach((setup) => {
    setup(server, ds);
  });

  return server;
}
