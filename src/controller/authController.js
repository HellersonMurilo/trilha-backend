const user = require("../models/user");

const jwtBlacklist = new Set();

const authController = {

  signIn: async (req, res) => {
    try {

      return res.status(200).json({
        msg: "Usuario Autenticado com sucesso!",
        token: req.token,
        nameUser: req.user.name
      });

    } catch (error) {
      res.status(500).json({
        msg: "Ocorreu um erro ao realizar o login",
      });
    }
  },

  signUp: async (req, res) => {
    try {
      const { name, lastName, email, password } = req.body;

      const newUser = await user.create({
        name,
        lastName,
        email,
        password
      });

      return res.status(201).json({
        msg: "Usuario criado com sucesso!",
        usuario: { name, lastName },
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Ocorreu um erro critico ao criar o usuario",
        err: error,
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

module.exports = { authController, jwtBlacklist };
