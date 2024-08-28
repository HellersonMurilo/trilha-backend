const { User } = require("../models/user");

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
  createTrail: async (req, res) => {
    try {
      return res.json({ msg: "ta criada" });
    } catch (error) {
      return res.status(500).json({
        msg: "Ocorreu um erro ao criar a trilha",
      });
    }
  },
};

module.exports = userController;
