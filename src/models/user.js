const sequelize = require("../database/database");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "User",
  {
    userid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    sobrenome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nivelPerfil: {
      type: DataTypes.TINYINT,
    },
    dataregis: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "Users",
    timestamps: false,
  }
);

User.associate = function (models) {
  User.hasMany(models.UsersProgress, {
    foreignKey: "user_id",
  });
};

module.exports = User;
