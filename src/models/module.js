const sequelize = require("../database/database");
const { DataTypes } = require("sequelize");

const Module = sequelize.define(
  "modules",
  {
    module_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    trailId: {
      type: DataTypes.INTEGER,
      references: {
        model: "learning_paths", 
        key: "trailId",
      },
    },
    nameModule: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    descriptionModule: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    quantLessons: {
      type: DataTypes.INTEGER,
    },
    dateCreated: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "modules",
    timestamps: false,
  }
);

// Associação com outros modelos
Module.associate = function (models) {
  Module.belongsTo(models.LearningPath, {
    foreignKey: "trailId",
  });
};

module.exports = Module;
