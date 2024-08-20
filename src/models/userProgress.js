// models/UsersProgress.js
module.exports = (sequelize, DataTypes) => {
    const UsersProgress = sequelize.define('UsersProgress', {
      prog_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'userid',
        },
      },
      licao_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Lessons',
          key: 'licao_id',
        },
      },
      status: {
        type: DataTypes.INTEGER,
      },
    }, {
      tableName: 'UsersProgress',
      timestamps: false,
    });
  
    UsersProgress.associate = function(models) {
      UsersProgress.belongsTo(models.User, {
        foreignKey: 'user_id',
      });
      UsersProgress.belongsTo(models.Lesson, {
        foreignKey: 'licao_id',
      });
    };
  
    return UsersProgress;
  };
  