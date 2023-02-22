jest.mock('../models/initDatabaseClient');
jest.mock('../server');

import startServer from '../server';
import initDatabaseClient from '../models/initDatabaseClient';
import { DataSource } from 'typeorm';
import { Server } from '@hapi/hapi';

const mockedStartServer = startServer as jest.MockedFunction<
  typeof startServer
>;
const mockedInitDatabaseClient = initDatabaseClient as jest.MockedFunction<
  typeof initDatabaseClient
>;

describe('Main Entrypoint', () => {
  it('start server', async () => {
    const client = {} as unknown as DataSource;
    const server = {
      start: jest.fn(),
      info: { uri: 'foobar' },
    } as unknown as Server;

    mockedInitDatabaseClient.mockResolvedValue(client);
    mockedStartServer.mockReturnValue(server);

    await import('../index');

    expect(mockedStartServer).toHaveBeenCalledWith(client);
    expect(mockedInitDatabaseClient).toHaveBeenCalled();
  });
});
