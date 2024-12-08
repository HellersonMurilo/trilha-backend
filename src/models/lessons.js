const sequelize = require("../database/database");
const { DataTypes } = require("sequelize");

const Lesson = sequelize.define(
  "lessons",
  {
    licao_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    module_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "modules",
        key: "module_id",
      },
    },
    title_lesson: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    text_lesson: {
      type: DataTypes.STRING(2500),
      allowNull: false,
    },
  },
  {
    tableName: "lessons",
    timestamps: false,
  }
);

// Associação com outros modelos
Lesson.associate = function (models) {
  Lesson.belongsTo(models.Module, {
    foreignKey: "module_id",
  });
};

module.exports = Lesson;
