// migrations/XXXXXXXXXXXXXX-create-users.js
"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      userId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nome: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      sobrenome: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },
      nivelPerfil: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      senha: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dataregis: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      recoveryCode: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      recoveryCodeExpiration: {
        type: Sequelize.DATE,
        allowNull: true,
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
