const user = require("../models/user");

const authController = {
  signIn: async (req, res) => {
    try {
      const { email, password } = req.body;

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
        usuario: {name, lastName},
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
