import createServer from '../../../server';
import initDatabaseClient from '../../../models/initDatabaseClient';
import { Server } from '@hapi/hapi';
import { DataSource } from 'typeorm';
import User from '../../../models/User';

describe('/users/get', () => {
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

  it('should return 200 & users', async () => {
    await ds.manager.insert(User, { name: 'foobar' });

    const res = await server.inject({
      method: 'get',
      url: '/users',
    });

    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.payload)).toEqual([
      {
        id: expect.any(Number),
        name: 'foobar',
        skills: [],
      },
    ]);
  });
});
