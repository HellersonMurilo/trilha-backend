// migrations/XXXXXXXXXXXXXX-create-users-progress.js
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UsersProgress', {
      prog_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'userid',
        },
      },
      licao_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Lessons',
          key: 'licao_id',
        },
      },
      status: {
        type: Sequelize.INTEGER,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UsersProgress');
  }
};
// migrations/XXXXXXXXXXXXXX-create-users-progress.js
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UsersProgress', {
      prog_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'userid',
        },
      },
      licao_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Lessons',
          key: 'licao_id',
        },
      },
      status: {
        type: Sequelize.INTEGER,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UsersProgress');
  }
};
