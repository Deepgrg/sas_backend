import { databaseConfiguration } from '@configs/database.config';
import { defineConfig } from '@mikro-orm/core';
import * as dotenv from 'dotenv';

// eslint-disable-next-line @typescript-eslint/no-var-requires
dotenv.config({
  path: `./src/environments/.${process.env.NODE_ENV}.env`,
});
const MikroOrmDataSource = defineConfig(databaseConfiguration());

export default MikroOrmDataSource;
