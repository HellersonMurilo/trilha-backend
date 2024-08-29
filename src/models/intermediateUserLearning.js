const sequelize = require("../database/database");
const { DataTypes } = require("sequelize");

const userLearningPath = sequelize.define(
  "user_learning_paths",
  {
    userLearningId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    trailId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'learning_paths',
        key: 'trailId'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'userId'
      }
    }
  },
  {
    tableName: "user_learning_paths",
    timestamps: false,
  }
);

userLearningPath.associate = function (models) {
  userLearningPath.belongsTo(models.LearningPath, {
    foreignKey: "trailId",
  });
};

module.exports = userLearningPath;
