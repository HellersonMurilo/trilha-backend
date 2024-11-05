require("dotenv").config(); // Carrega as variáveis de ambiente

/* module.exports = {
  development: {
    dialect: process.env.DB_DIALECT || "postgres", // Corrigido de "postgress" para "postgres"
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432, // Porta padrão do PostgreSQL
    database: process.env.DB_NAME || "seu_banco_de_dados",
    username: process.env.DB_USER || "seu_usuario",
    password: process.env.DB_PASSWORD || "sua_senha",
  },
};   */
 // CONEXAO SSL
module.exports = {
  development: {
    dialect: process.env.DB_DIALECT || "postgres",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || "seu_banco_de_dados",
    username: process.env.DB_USER || "seu_usuario",
    password: process.env.DB_PASSWORD || "sua_senha",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Isso permite conexões SSL sem verificar o certificado do servidor
      },
    },
  },
}; 