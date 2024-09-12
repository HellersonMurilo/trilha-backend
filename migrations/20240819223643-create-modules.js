"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("modules", {
      module_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      trailId: {
        type: Sequelize.INTEGER,
        references: {
          model: "learning_paths", // Nome da tabela referenciada em minúsculas
          key: "trailId", // Chave primária da tabela referenciada
        },
        onUpdate: "CASCADE", // Ação em caso de atualização
        onDelete: "CASCADE", // Ação em caso de exclusão
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
    await queryInterface.dropTable("modules");
  },
};
