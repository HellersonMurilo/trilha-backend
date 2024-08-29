// migrations/XXXXXXXXXXXXXX-create-modules.js
"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Modules", {
      module_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      trailId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Learning_Paths",
          key: "trailId",
        },
      },
      nome_m: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      descricao_m: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },
      ordera: {
        type: Sequelize.INTEGER,
      },
      datacriacao: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Modules");
  },
};
