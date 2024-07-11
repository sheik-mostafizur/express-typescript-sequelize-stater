import * as fs from 'fs';
import * as path from 'path';
import { DataTypes } from 'sequelize';
import sequelize from '@/configs/db.configs';

const basename = path.basename(__filename);
const db: any = {};

// Read models from current directory and load them into Sequelize
fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.ts' && // Ensure it's a TypeScript file
      file.indexOf('.test.ts') === -1 // Exclude test files if any
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file)).default(
      sequelize,
      DataTypes,
    );
    db[model.name] = model;
  });

// Apply associations if defined
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Assign Sequelize instance and class to the db object
db.sequelize = sequelize;

export default db;
