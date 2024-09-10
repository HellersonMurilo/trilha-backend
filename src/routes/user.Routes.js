const { Router } = require("express");
const userController = require("../controller/userController");

const { isAdmin } = require("../middlewares/authMiddleware");
const {
  generateCode,
  validateToken,
  validateResetCode,
} = require("../middlewares/userMiddleware");

const userRoutes = Router();

//USER
userRoutes.post("/", (req, res) => {
  userController.create(req, res);
});

userRoutes.get("/listusers", (req, res) => {
  userController.listenUser(req, res);
});

//TROCAR SENHAS
// Rota para gerar o código de recuperação de senha
userRoutes.post("/generateCode", generateCode, (req, res) => {
  return res.status(200).json({
    message: "Código de recuperação enviado com sucesso.",
  });
});

// Rota para alterar a senha usando o código de recuperação
userRoutes.post("/updatePassword", validateResetCode, (req, res) => {
  userController.updatePassword(req, res);
});

//ADMIN
userRoutes.post("/admin/createTrail", isAdmin, (req, res) => {
  res.send("opa");
});

module.exports = userRoutes;
