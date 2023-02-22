import createServer from '../../../server';
import initDatabaseClient from '../../../models/initDatabaseClient';
import { Server } from '@hapi/hapi';
import { DataSource } from 'typeorm';
import Skill from '../../../models/Skill';

describe('/skills/get', () => {
  let server: Server;
  let ds: DataSource;

  beforeEach(async () => {
    ds = await initDatabaseClient();
    server = createServer(ds);
  });

  afterEach(async () => {
    await server.stop();
    await ds.destroy();
  });

  it('should return 200 & skills', async () => {
    await ds.manager.insert(Skill, { name: 'foobar' });

    const res = await server.inject({
      method: 'get',
      url: '/skills',
    });

    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.payload)).toEqual([
      {
        id: expect.any(Number),
        name: 'foobar',
      },
    ]);
  });
});
