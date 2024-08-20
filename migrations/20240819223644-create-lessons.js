// migrations/XXXXXXXXXXXXXX-create-lessons.js
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Lessons', {
      licao_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      module_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Modules',
          key: 'module_id',
        },
      },
      nome_l: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      ordem: {
        type: Sequelize.INTEGER,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Lessons');
  }
};
