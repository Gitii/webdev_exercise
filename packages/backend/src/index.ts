import initDatabaseClient from './models/initDatabaseClient';
import createServer from './server';
import 'reflect-metadata';

async function init() {
  const dataSource = await initDatabaseClient();
  const server = createServer(dataSource);
  await server.start();

  console.log('Server running on %s', server.info.uri);
}

/* istanbul ignore next */
function onError(error: unknown) {
  console.log(error);
  process.exit(1);
}

process.on('unhandledRejection', onError);

init().catch(onError);
