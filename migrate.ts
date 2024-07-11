import { Sequelize } from 'sequelize';
import { Umzug, SequelizeStorage } from 'umzug';
import * as path from 'path';
import { dbConfigs } from './src/configs/db.configs';

const env = process.env.NODE_ENV || 'development';
const dbConfig = dbConfigs[env as keyof typeof dbConfigs];

const sequelize = dbConfig.use_env_variable
  ? new Sequelize(process.env[dbConfig.use_env_variable]!, dbConfig)
  : new Sequelize(
      dbConfig.database,
      dbConfig.username,
      dbConfig.password,
      dbConfig,
    );

const importMigration = async (migrationPath: string) => {
  const migration = await import(migrationPath);
  return migration.default;
};

const umzug = new Umzug({
  migrations: {
    glob: path.join(__dirname, 'src/database/migrations/*.ts'),
    resolve: ({ name, path: migrationPath, context }) => {
      if (!migrationPath) {
        throw new Error(`Migration path for ${name} is undefined`);
      }

      return {
        name,
        up: async () => (await importMigration(migrationPath)).up(context),
        down: async () => (await importMigration(migrationPath)).down(context),
      };
    },
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

(async () => {
  try {
    await umzug.up();
    console.log('Migrations completed');
  } catch (error) {
    console.error(error);
  } finally {
    await sequelize.close();
  }
})();
