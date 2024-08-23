const user = require("../models/user");

const authController = {
  signIn: async (req, res) => {
    try {
      const { email, senha } = req.body;

      return res.status(200).json({
        msg: "Usuario Autenticado com sucesso!",
      });
    } catch (error) {
      res.status(500).json({
        msg: "Ocorreu um erro ao realizar o login",
      });
    }
  },

  signUp: async (req, res) => {
    try {
      const { nome, sobrenome, email, senha, nivelPerfil } = req.body;

      const novoUsuario = await user.create({
        nome,
        sobrenome,
        email,
        senha,
        nivelPerfil,
      });

      return res.status(202).json({
        msg: "Usuario  criado com sucesso!",
        usuario: novoUsuario,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Ocorreu um erro critico ao criar o usuario",
        err: error,
      });
    }
  },
};

module.exports = authController;
