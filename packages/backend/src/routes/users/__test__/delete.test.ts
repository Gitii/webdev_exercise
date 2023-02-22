import createServer from '../../../server';
import initDatabaseClient from '../../../models/initDatabaseClient';
import { Server } from '@hapi/hapi';
import { DataSource } from 'typeorm';
import User from '../../../models/User';

describe('/users/delete', () => {
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

  it('should delete all users', async () => {
    await ds.manager.insert(User, { name: 'foobar' });

    const res = await server.inject({
      method: 'delete',
      url: '/users',
    });

    expect(res.statusCode).toBe(201);

    expect(await ds.manager.count(User)).toBe(0);
  });
});
