import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.addColumn('Todos', 'user_id', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // name of the target table
        key: 'id', // key in the target table that we're referencing
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.removeColumn('Todos', 'user_id');
  },
};
