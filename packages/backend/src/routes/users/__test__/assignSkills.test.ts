import createServer from '../../../server';
import initDatabaseClient from '../../../models/initDatabaseClient';
import { Server } from '@hapi/hapi';
import { DataSource } from 'typeorm';
import User from '../../../models/User';
import Skill from '../../../models/Skill';

async function addSkills(ds: DataSource, userId: number, skills: number[]) {
  const user = (await ds.manager.findOne(User, { where: { id: userId } }))!;

  user.skills = [
    ...user.skills,
    ...skills.map((id) => ({
      id,
      name: '',
    })),
  ];

  await ds.manager.save(user);
}

describe('/users/{userId}/assignSkills', () => {
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

  it('should assign new skill to user', async () => {
    await ds.manager.insert(User, { id: 1, name: 'foo' });
    await ds.manager.insert(User, { id: 2, name: 'bar' });
    await ds.manager.insert(Skill, { id: 1, name: 'javascript' });
    await ds.manager.insert(Skill, { id: 2, name: 'python' });

    const res = await server.inject({
      method: 'post',
      url: '/users/1/assignSkills',
      payload: JSON.stringify({ skillIds: [1] }),
    });

    expect(res.statusCode).toBe(201);

    expect(await ds.manager.findOne(User, { where: { id: 1 } })).toEqual({
      id: 1,
      name: 'foo',
      skills: [
        {
          id: 1,
          name: 'javascript',
        },
      ],
    });
    expect(await ds.manager.findOne(User, { where: { id: 2 } })).toEqual({
      id: 2,
      name: 'bar',
      skills: [],
    });
  });

  it('should assign no skills to user', async () => {
    await ds.manager.insert(Skill, [
      { id: 1, name: 'javascript' },
      { id: 2, name: 'python' },
    ]);
    await ds.manager.insert(User, [
      {
        id: 1,
        name: 'foo',
        skills: [],
      },
      {
        id: 2,
        name: 'bar',
        skills: [],
      },
    ]);

    await addSkills(ds, 1, [1]);
    await addSkills(ds, 2, [1, 2]);

    const res = await server.inject({
      method: 'post',
      url: '/users/1/assignSkills',
      payload: JSON.stringify({ skillIds: [] }),
    });

    expect(res.statusCode).toBe(201);

    expect(await ds.manager.findOne(User, { where: { id: 1 } })).toEqual({
      id: 1,
      name: 'foo',
      skills: [],
    });
    expect(await ds.manager.findOne(User, { where: { id: 2 } })).toEqual({
      id: 2,
      name: 'bar',
      skills: await ds.manager.find(Skill),
    });
  });

  it('should fail when user doesnt exist', async () => {
    const res = await server.inject({
      method: 'post',
      url: '/users/1/assignSkills',
      payload: JSON.stringify({ skillIds: [] }),
    });

    expect(res.statusCode).toBe(404);
    expect(JSON.parse(res.payload)).toEqual({
      statusCode: 404,
      error: 'Not Found',
      message: 'User not found',
    });
  });

  it('should fail when any skill doesnt exist', async () => {
    await ds.manager.insert(User, [
      {
        id: 1,
        name: 'foo',
        skills: [],
      },
    ]);

    const res = await server.inject({
      method: 'post',
      url: '/users/1/assignSkills',
      payload: JSON.stringify({ skillIds: [1] }),
    });

    expect(res.statusCode).toBe(404);
    expect(JSON.parse(res.payload)).toEqual({
      statusCode: 404,
      error: 'Not Found',
      message: 'Not all skills found',
    });
  });
});
