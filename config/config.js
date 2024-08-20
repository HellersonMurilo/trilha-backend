require("dotenv").config(); // Carrega as variáveis de ambiente

module.exports = {
  development: {
    dialect: process.env.DB_DIALECT || "mysql",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    database: process.env.DB_NAME || "seu_banco_de_dados",
    username: process.env.DB_USER || "seu_usuario",
    password: process.env.DB_PASSWORD || "sua_senha",
  },
};
