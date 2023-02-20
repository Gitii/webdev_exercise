import initDatabaseClient from './models/initDatabaseClient';
import { createServer } from './server';
import 'reflect-metadata';

async function init() {
  const dataSource = await initDatabaseClient();
  const server = createServer(dataSource);
  await server.start();

  console.log('Server running on %s', server.info.uri);
}

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init().catch((e) => {
  console.error(e);
  process.exit(1);
});
