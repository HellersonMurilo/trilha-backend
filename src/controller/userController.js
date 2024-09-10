const bcrypt = require("bcrypt");
const LearningPath = require("../models/learningPath");
const User = require("../models/user");

const userController = {
  create: async (req, res) => {
    try {
      const { nome, sobrenome, email, senha, nivelPerfil } = req.body;

      const novoUsuario = await User.create(req.body);

      return res.status(202).json({
        msg: `usuario criado com sucesso`,
        user: novoUsuario,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: "Ocorreu um erro ao criar um usuario",
      });
    }
  },

  listenUser: async (req, res) => {
    try {
      return res.status(200).json({
        users: [],
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Ocorreu um erro ao listar os usuarios",
      });
    }
  },

  // Alterar senha após validar código de recuperação
  updatePassword: async (req, res) => {
    try {
      const { newPassword } = req.body;
      const userInfo = req.body;

      // Criptografar a nova senha
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Atualizar a senha no banco de dados
      await User.update(
        {
          senha: hashedPassword,
          recoveryCode: null,
          recoveryCodeExpiration: null,
        }, // Limpar o código de recuperação
        { where: { email: userInfo.email } }
      );

      return res.status(200).json({ message: "Senha alterada com sucesso." });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erro ao atualizar a senha.", erro: error });
    }
  },
};

module.exports = userController;
