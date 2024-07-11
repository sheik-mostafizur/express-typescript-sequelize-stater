import { QueryInterface, DataTypes } from 'sequelize';
/** @type {import('sequelize-cli').Migration} */

export default {
  async up(queryInterface: QueryInterface) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Users', 'gender', {
      type: DataTypes.STRING,
      allowNull: true, // Set to false if gender is required
    });
  },

  async down(queryInterface: QueryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Users', 'gender');
  },
};
