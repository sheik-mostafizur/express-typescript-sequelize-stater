import { QueryInterface } from 'sequelize';
import { Sequelize } from 'sequelize/types';

// You can replace this with actual user IDs from your database
const userId = 1; // Assuming you have a user with ID 1

export default {
  up: async (
    queryInterface: QueryInterface,
    Sequelize: Sequelize,
  ): Promise<void> => {
    await queryInterface.bulkInsert('Todos', [
      {
        title: 'First Todo',
        description: 'This is the first todo item',
        completed: false,
        user_id: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Second Todo',
        description: 'This is the second todo item',
        completed: true,
        user_id: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (
    queryInterface: QueryInterface,
    Sequelize: Sequelize,
  ): Promise<void> => {
    await queryInterface.bulkDelete('Todos', {}, {});
  },
};
