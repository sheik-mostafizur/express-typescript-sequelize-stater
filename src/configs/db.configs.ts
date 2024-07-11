import { Dialect, Sequelize } from 'sequelize';
import { config } from 'dotenv';

config(); // Load environment variables from .env file

interface DbConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: Dialect;
  port?: number;
  storage?: string;
  use_env_variable?: string;
}

interface DbConfigs {
  [key: string]: DbConfig;
}

const dbConfigs: DbConfigs = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'express_db_dev',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql',
  },
  test: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'password',
    database: process.env.DB_NAME || 'express_db_test',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'password',
    database: process.env.DB_NAME || 'express_db_production',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql',
    use_env_variable: 'DATABASE_URL',
  },
};

const activeEnv = process.env.NODE_ENV || 'development'; // Default to development environment if not specified
const activeConfig = dbConfigs[activeEnv];

let databaseUrl = '';
if (activeConfig.use_env_variable) {
  databaseUrl = process.env[activeConfig.use_env_variable]!;
} else {
  databaseUrl = `${activeConfig.dialect}://${activeConfig.username}:${activeConfig.password}@${activeConfig.host}/${activeConfig.database}`;
}

const sequelize = new Sequelize(databaseUrl, {
  dialect: activeConfig.dialect as 'mysql' | 'postgres' | 'sqlite' | 'mariadb',
  storage: activeConfig.storage, // Only used for SQLite
});

export { dbConfigs, databaseUrl, sequelize };

export default sequelize;
