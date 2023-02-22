import createServer from '../../../server';
import initDatabaseClient from '../../../models/initDatabaseClient';
import { Server } from '@hapi/hapi';
import { DataSource } from 'typeorm';
import User from '../../../models/User';
import { range } from 'lodash';

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

  it('should create 10 users', async () => {
    const res = await server.inject({
      method: 'post',
      url: '/users',
    });

    expect(res.statusCode).toBe(201);

    expect(await ds.manager.find(User)).toEqual(
      range(10).map(() => ({
        id: expect.any(Number),
        name: expect.any(String),
        skills: [],
      })),
    );
  });
});
