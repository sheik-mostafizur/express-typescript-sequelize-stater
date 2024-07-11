import sequelize from '@/configs/db.configs';
import { Model, DataTypes } from 'sequelize';

class Todo extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public completed!: boolean;
  public user_id!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Define associations here
  static associate(models: any) {
    // associations can be defined here
    Todo.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
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
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Todo',
    tableName: 'Todos',
  },
);

export default Todo;
