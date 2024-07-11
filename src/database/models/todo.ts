import sequelize from '@/configs/db.configs';
import { Model, DataTypes } from 'sequelize';

class Todo extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public completed!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Define associations here
  static associate(models: any) {
    // associations can be defined here
  }
}

Todo.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    description: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'Todo',
    tableName: 'Todos',
  },
);

export default Todo;
