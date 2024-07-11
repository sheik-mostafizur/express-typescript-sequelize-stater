import { Umzug, SequelizeStorage } from 'umzug';
import * as path from 'path';
import sequelize from './src/configs/db.configs';

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
