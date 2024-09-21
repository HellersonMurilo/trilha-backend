const bcrypt = require("bcrypt");
const LearningPath = require("../models/learningPath");
const User = require("../models/user");

const userController = {
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
          password: hashedPassword,
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
