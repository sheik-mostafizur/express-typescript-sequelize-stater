import { Umzug, SequelizeStorage } from 'umzug';
import * as path from 'path';
import { QueryInterface } from 'sequelize';
import sequelize from './src/configs/db.configs';

// Function to import migrations dynamically
const importMigration = async (migrationPath: string) => {
  const migration = await import(migrationPath);
  return migration.default;
};

// Function to import seeders dynamically
const importSeeder = async (seederPath: string) => {
  const seeder = await import(seederPath);
  return seeder.default;
};

// Umzug instance for migrations
const migrationUmzug = new Umzug({
  migrations: {
    glob: path.join(__dirname, 'src/database/migrations/*.ts'),
    resolve: ({
      name,
      path: migrationPath,
      context,
    }: {
      name: string;
      path?: string;
      context: QueryInterface;
    }) => {
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

// Umzug instance for seeders
const seederUmzug = new Umzug({
  migrations: {
    glob: path.join(__dirname, 'src/database/seeders/*.ts'),
    resolve: ({
      name,
      path: seederPath,
      context,
    }: {
      name: string;
      path?: string;
      context: QueryInterface;
    }) => {
      if (!seederPath) {
        throw new Error(`Seeder path for ${name} is undefined`);
      }

      return {
        name,
        up: async () => (await importSeeder(seederPath)).up(context),
        down: async () => (await importSeeder(seederPath)).down(context),
      };
    },
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

// Running migrations and seeders
(async () => {
  try {
    await migrationUmzug.up(); // Run migrations
    await seederUmzug.up(); // Run seeders

    console.log('Migrations and Seeders completed');
  } catch (error) {
    console.error('Error running migrations and seeders:', error);
  } finally {
    await sequelize.close(); // Close Sequelize connection
  }
})();
