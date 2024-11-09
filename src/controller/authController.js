const user = require("../models/user");

const jwtBlacklist = new Set();

const authController = {
  signIn: async (req, res) => {
    try {
      const { email, password } = req.body;

      // A autenticação do usuário deve ocorrer antes de gerar o token.
      if (!email || !password) {
        return res.status(400).json({
          msg: "E-mail e senha são obrigatórios.",
        });
      }

      // Verifique se as credenciais são válidas antes de gerar o token
      // Exemplo de validação fictícia de credenciais
      const authenticatedUser = await user.findOne({ where: { email, password } });
      if (!authenticatedUser) {
        return res.status(401).json({
          msg: "Credenciais inválidas.",
        });
      }

      return res.status(200).json({
        msg: "Usuário autenticado com sucesso!",
        token: req.token,
        nameUser: req.user.name,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Ocorreu um erro ao realizar o login.",
        err: error.message,
      });
    }
  },

  signUp: async (req, res) => {
    try {
      const { name, lastName, email, password } = req.body;

      // Validação básica de dados
      if (!name || !lastName || !email || !password) {
        return res.status(400).json({
          msg: "Todos os campos são obrigatórios.",
        });
      }

      const newUser = await user.create({
        name,
        lastName,
        email,
        password,
      });

      return res.status(201).json({
        msg: "Usuário criado com sucesso!",
        usuario: { name, lastName },
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Ocorreu um erro crítico ao criar o usuário.",
        err: error.message,
      });
    }
  },

  logout: async (req, res) => {
    try {
      const token = req.headers['authorization']?.split(' ')[1]; // Obtém o token do cabeçalho

      if (!token) {
        return res.status(400).json({ msg: "Token não encontrado." });
      }

      // Verifica se o token já foi invalidado
      if (jwtBlacklist.has(token)) {
        return res.status(400).json({ msg: "Token já foi invalidado." });
      }

      // Adiciona o token à blacklist para invalidá-lo
      jwtBlacklist.add(token);

      return res.status(200).json({ msg: "Logout realizado com sucesso." });
    } catch (error) {
      return res.status(500).json({
        msg: "Erro ao realizar o logout.",
        err: error.message,
      });
    }
  },
};

module.exports = {
  authController,
  jwtBlacklist,
};
