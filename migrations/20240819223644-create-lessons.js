'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('lessons', {
      licao_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      module_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'modules', // Nome da tabela referenciada em minúsculas
          key: 'module_id', // Chave primária da tabela referenciada
        },
        onUpdate: 'CASCADE', // Ação em caso de atualização
        onDelete: 'CASCADE', // Ação em caso de exclusão
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
    await queryInterface.dropTable('lessons');
  },
};
