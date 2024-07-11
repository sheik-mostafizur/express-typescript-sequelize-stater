import { Dialect } from 'sequelize';

interface DbConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: Dialect;
  use_env_variable?: string;
}

interface DbConfigs {
  [key: string]: DbConfig;
}

const config: DbConfigs = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'password',
    database: process.env.DB_NAME || 'database_development',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql',
  },
  test: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'password',
    database: process.env.DB_NAME || 'database_test',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'password',
    database: process.env.DB_NAME || 'database_production',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql',
    use_env_variable: 'DATABASE_URL',
  },
};

export default config;
