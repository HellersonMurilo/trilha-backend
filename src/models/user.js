const sequelize = require("../database/database");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "user",
  {
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateregis: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    recoveryCode: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    recoveryCodeExpiration: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

User.associate = function (models) {
  User.hasMany(models.UsersProgress, {
    foreignKey: "user_id",
  });
};

module.exports = User;
