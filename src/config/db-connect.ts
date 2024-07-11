import { Sequelize } from 'sequelize';
import { config } from 'dotenv';
config(); // Load environment variables from .env file

interface DBConfig {
  dialect: string;
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  storage?: string; // For SQLite
}

const dbConfig: DBConfig = {
  dialect: process.env.DB_CONNECTION || 'mysql', // Default to MySQL if not specified
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  database: process.env.DB_NAME || 'express_db',
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  storage: process.env.DB_STORAGE, // Optional for SQLite
};

const databaseUrl =
  dbConfig.dialect === 'sqlite'
    ? dbConfig.storage
    : `${dbConfig.dialect}://${dbConfig.username}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`;

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

export { dbConfig, databaseUrl, port };

const sequelize = new Sequelize(databaseUrl || '', {
  dialect: dbConfig.dialect as 'mysql' | 'postgres' | 'sqlite' | 'mariadb',
  storage: dbConfig.storage, // Only used for SQLite
});

export default sequelize;
