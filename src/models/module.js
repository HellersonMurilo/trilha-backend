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
      trailId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Learning_Paths",
          key: "trailId",
        },
      },
      name_m: {
        type: DataTypes.STRING(255),
        allowNull: false,
        allowNull: false,
      },
      description_m: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      quantLessons: {
        type: DataTypes.INTEGER,
      },
      dateCreated: {
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
      foreignKey: "trailId",
    });
    Module.hasMany(models.Lesson, {
      foreignKey: "module_id",
    });
  };

  return Module;
};
