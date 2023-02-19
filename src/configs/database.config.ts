import { Utils } from '@mikro-orm/core';
import { TSMigrationGenerator } from '@mikro-orm/migrations';
import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';

export const databaseConfiguration = (): MikroOrmModuleSyncOptions => {
  return {
    type: 'postgresql',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    dbName: process.env.DATABASE_NAME,
    entities: ['./src/core/**/*.entity.js'],
    entitiesTs: ['./src/core/**/*.entity.ts'],
    // subscribers: [new MikroEntitySubscriber()],
    autoLoadEntities: true,
    highlighter: new SqlHighlighter(),
    registerRequestContext: true,
    debug: process.env.NODE_ENV === 'local' || 'dev' ? true : false,
    migrations: {
      tableName: 'migrations',
      path: Utils.detectTsNode()
        ? './src/database/migrations/'
        : './dist/database/migrations/',
      glob: '!(*.d).{js,ts}',
      transactional: true,
      emit: 'ts',
      snapshot: false,
      generator: TSMigrationGenerator, // migration generator, e.g. to allow custom formatting
    },
    // seeder: {},
    // subscribers: {},
  };
};
