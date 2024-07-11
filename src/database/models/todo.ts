import sequelize from '@/configs/db.configs';
import { Model, DataTypes } from 'sequelize';
interface TodoAttributes {
  id?: number;
  title: string;
  completed: boolean;
}

class Todo extends Model<TodoAttributes> implements TodoAttributes {
  public id!: number;
  public title!: string;
  public completed!: boolean;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
    // define association here
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Todo',
  },
);

export default Todo;
