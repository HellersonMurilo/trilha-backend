// models/Module.js
module.exports = (sequelize, DataTypes) => {
  const Module = sequelize.define(
    "Module",
    {
      module_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      trilha_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Learning_Paths",
          key: "trilha_id",
        },
      },
      nome_m: {
        type: DataTypes.STRING(255),
        allowNull: false,
        allowNull: false,
      },
      descricao_m: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      ordera: {
        type: DataTypes.INTEGER,
      },
      datacriacao: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      }
    },
    {
      tableName: "Modules",
      timestamps: false,
    }
  );

  Module.associate = function (models) {
    Module.belongsTo(models.LearningPath, {
      foreignKey: "trilha_id",
    });
    Module.hasMany(models.Lesson, {
      foreignKey: "module_id",
    });
  };

  return Module;
};
