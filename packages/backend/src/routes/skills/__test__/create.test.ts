import createServer from '../../../server';
import initDatabaseClient from '../../../models/initDatabaseClient';
import { Server } from '@hapi/hapi';
import { DataSource } from 'typeorm';
import Skill from '../../../models/Skill';

describe('/skills/create', () => {
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

  it('should return 200 when inserted successfully', async () => {
    const res = await server.inject({
      method: 'post',
      url: '/skills',
      payload: JSON.stringify({ name: 'foobar' }),
    });

    expect(res.statusCode).toBe(201);
    expect(await ds.manager.find(Skill)).toEqual([
      {
        id: expect.any(Number),
        name: 'foobar',
      },
    ]);
  });

  it('should fail when skill already exists', async () => {
    await ds.manager.insert(Skill, { name: 'foobar' });

    const res = await server.inject({
      method: 'post',
      url: '/skills',
      payload: JSON.stringify({ name: 'foobar' }),
    });

    expect(res.statusCode).toBe(409);
    expect(await ds.manager.count(Skill)).toBe(1);
  });
});
