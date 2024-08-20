// models/Lesson.js
module.exports = (sequelize, DataTypes) => {
    const Lesson = sequelize.define('Lesson', {
      licao_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      module_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Modules',
          key: 'module_id',
        },
      },
      nome_l: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      ordem: {
        type: DataTypes.INTEGER,
      },
    }, {
      tableName: 'Lessons',
      timestamps: false,
    });
  
    Lesson.associate = function(models) {
      Lesson.belongsTo(models.Module, {
        foreignKey: 'module_id',
      });
    };
  
    return Lesson;
  };
  