const { Sequelize } = require("sequelize");
require("dotenv").config(); // Carrega as variáveis de ambiente

const config = require("../../config/config");
const sequelize = new Sequelize(config.development);

module.exports = sequelize;
