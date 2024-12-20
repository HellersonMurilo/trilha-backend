"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("learning_paths", {
      trailId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userAdmin: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      nameTrail: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },
      quantModules: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      dateCreation: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("learning_paths");
  },
};
