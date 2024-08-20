// migrations/XXXXXXXXXXXXXX-create-learning-paths.js
"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Learning_Paths", {
      trilha_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nome_t: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      descri: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },
      datacriacao: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Learning_Paths");
  },
};
