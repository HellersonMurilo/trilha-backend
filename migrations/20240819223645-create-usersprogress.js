'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users_progress', {
      prog_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users', // Nome da tabela referenciada em minúsculas
          key: 'userId',  // Chave primária da tabela referenciada
        },
        onUpdate: 'CASCADE', // Ação em caso de atualização
        onDelete: 'CASCADE', // Ação em caso de exclusão
      },
      licao_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'lessons', // Nome da tabela referenciada em minúsculas
          key: 'licao_id',  // Chave primária da tabela referenciada
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      status: {
        type: Sequelize.INTEGER,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users_progress');
  }
};
