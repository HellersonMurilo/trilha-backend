const sequelize = require("../database/database");
const { DataTypes } = require("sequelize");

const LearningPath = sequelize.define(
  "learning_paths",
  {
    trailId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userAdmin: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    nameTrail: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    quantModules: {
      type: DataTypes.INTEGER,
      allowNull: false, 
    },
    dateCreation: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "learning_paths",
    timestamps: false,
  }
);

LearningPath.associate = function (models) {
  LearningPath.belongsToMany(models.userLearningPath, {
    foreignKey: "trailId",
  });
};

module.exports = LearningPath;
