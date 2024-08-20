// models/LearningPath.js
module.exports = (sequelize, DataTypes) => {
    const LearningPath = sequelize.define('LearningPath', {
      trilha_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nome_t: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      descri: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      datacriacao: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    }, {
      tableName: 'Learning_Paths',
      timestamps: false,
    });
  
    LearningPath.associate = function(models) {
      LearningPath.hasMany(models.Module, {
        foreignKey: 'trilha_id',
      });
    };
  
    return LearningPath;
  };
  