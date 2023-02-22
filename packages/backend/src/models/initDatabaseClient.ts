import { DataSource } from 'typeorm';
import Skill from './Skill';
import User from './User';

export default async function initDatabaseClient() {
  const dataSource = new DataSource({
    type: 'sqlite',
    database: ':memory:',
    entities: [User, Skill],
    synchronize: true,
    dropSchema: true,
  });

  return await dataSource.initialize();
}
