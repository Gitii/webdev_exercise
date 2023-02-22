import createServer from '../../../server';
import initDatabaseClient from '../../../models/initDatabaseClient';
import { Server } from '@hapi/hapi';
import { DataSource } from 'typeorm';
import Skill from '../../../models/Skill';

describe('/skills/delete', () => {
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

  it('should return 200 when deleted successfully', async () => {
    await ds.manager.insert(Skill, { id: 1, name: 'foobar' });

    const res = await server.inject({
      method: 'delete',
      url: '/skills/1',
    });

    expect(res.statusCode).toBe(204);
    expect(await ds.manager.count(Skill)).toBe(0);
  });

  it('should fail when skill doesnt exist', async () => {
    await ds.manager.insert(Skill, { id: 1, name: 'foobar' });

    const res = await server.inject({
      method: 'delete',
      url: '/skills/2',
    });

    expect(res.statusCode).toBe(404);
    expect(await ds.manager.count(Skill)).toBe(1);
  });
});
